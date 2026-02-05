"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { InputFile } from "node-appwrite/file";
import { appWriteConfig } from "@/lib/appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getUserProfile } from "@/lib/actions/user.action";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, database } = await createAdminClient();

  try {
    // Check current storage usage
    const totalSpace = await getTotalSpaceUsed();
    const currentUsage = totalSpace?.used || 0;
    const MAX_STORAGE = 2 * 1024 * 1024 * 1024; // 2GB in bytes
    const fileSize = (file as any).buffer.length;

    // Check if upload would exceed storage limit
    if (currentUsage + fileSize > MAX_STORAGE) {
      const availableSpace = MAX_STORAGE - currentUsage;
      throw new Error(
        `Not enough storage space. Available: ${(availableSpace / (1024 * 1024)).toFixed(2)}MB, Required: ${(fileSize / (1024 * 1024)).toFixed(2)}MB`,
      );
    }

    // Convert plain array back to Buffer
    const buffer = Buffer.from((file as any).buffer);
    const inputFile = InputFile.fromBuffer(buffer, file.name);
    const bucketFile = await storage.createFile(
      appWriteConfig.bucketId,
      ID.unique(),
      inputFile,
    );

    // Generate a numeric user ID from the string ownerId
    const numericUserId =
      Math.abs(
        ownerId.split("").reduce((acc, char) => {
          return acc * 31 + char.charCodeAt(0);
        }, 0),
      ) % 2147483647; // Keep within 32-bit integer range

    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      fileType: getFileType(bucketFile.name).type,
      fileName: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      fileSize: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId: accountId,
      bucketFileId: bucketFile.$id,
      uploadDate: new Date().toISOString(),
      uploadedByUserId: numericUserId,
      filePath: path,
    };
    const newFile = await database
      .createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument,
      )
      .catch(async (error: unknown) => {
        // If creating the document fails, delete the uploaded file to avoid orphaned files
        await storage.deleteFile(appWriteConfig.bucketId, bucketFile.$id);
        handleError(error, "failed to create file document");
      });
    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "failed to upload file");
  }
};
const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [(currentUser as any).email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("fileName", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");
    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};

export const getFiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  const { database } = await createAdminClient();
  try {
    const currentUser = await getUserProfile();
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const queries = createQueries(currentUser, types, searchText, sort, limit);

    const files = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      queries,
    );

    return parseStringify(files);
  } catch (error) {
    handleError(error, "failed to get files");
  }
};

export const renameFile = async ({
  fileId,
  name,
  path,
  extension,
}: RenameFileProps) => {
  const { database } = await createAdminClient();
  try {
    // Get the current file to extract extension if not provided
    const currentFile = await database.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
    );

    // Extract extension from current fileName if extension is not provided or undefined
    const fileExtension =
      extension || currentFile.fileName.split(".").pop() || "";

    console.log("File Extension:", fileExtension);
    console.log("Provided Extension:", extension);
    console.log("Current FileName:", currentFile.fileName);
    console.log("New Name:", name);

    const newName = `${name}.${fileExtension}`;

    const updatedFile = await database.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      {
        fileName: newName,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "failed to rename file");
  }
};

export const updateFileUsers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { database } = await createAdminClient();

  try {
    const updatedFile = await database.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      {
        users: emails,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "failed to rename file");
  }
};
export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { database, storage } = await createAdminClient();

  try {
    const deleteFile = await database.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
    );
    if (deleteFile) {
      await storage.deleteFile(appWriteConfig.bucketId, bucketFileId);
    }
    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "failed to rename file");
  }
};

export async function getTotalSpaceUsed() {
  try {
    const { database } = await createSessionClient();
    const currentUser = await getUserProfile();
    if (!currentUser) throw new Error("User is not authenticated.");

    const files = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      [Query.equal("owner", [currentUser.$id])],
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */,
    };

    files.documents.forEach((file: Models.Document) => {
      const fileType = (file as any).type as FileType;
      const fileSize = (file as any).fileSize || 0;
      totalSpace[fileType].size += fileSize;
      totalSpace.used += fileSize;

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return parseStringify(totalSpace);
  } catch (error) {
    handleError(error, "Error calculating total space used:, ");
  }
}
