"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { InputFile } from "node-appwrite/file";

import { appWriteConfig } from "@/lib/appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { ca } from "zod/v4/locales";
import { get } from "http";

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
    // Convert plain array back to Buffer
    const buffer = Buffer.from(file.buffer);
    const inputFile = InputFile.fromBuffer(buffer, file.name);
    const bucketFile = await storage.createFile(
      appWriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    // Generate a numeric user ID from the string ownerId
    const numericUserId =
      Math.abs(
        ownerId.split("").reduce((acc, char) => {
          return acc * 31 + char.charCodeAt(0);
        }, 0)
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
        fileDocument
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
const getFiles = async ( ) =>{
  const { database } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      throw new Error("User not authenticated");
    }

  }catch (error) {
    handleError(error, "failed to get files");
  }
}