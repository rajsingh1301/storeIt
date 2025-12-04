"use server";

import { createAdminClient } from "../appwrite";
import { ID, InputFile } from "node-appwrite";
import { appWriteConfig } from "../appwrite/config";
import { constructFileUrl, getFileType, parseStringify } from "../utils";

import { revalidatePath } from "next/cache";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path?: string;
}
export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, database } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucketFile = await storage.createFile(
      appWriteConfig.bucketId,
      ID.unique(),
      inputFile
    );
    const fileDocument = {
    type : getFileType(bucketFile.name).type,
    name : bucketFile.name,
    url : constructFileUrl(bucketFile.$id),
    extension : getFileType(bucketFile.name).extension,
    size : bucketFile.sizeOriginal,
    owner : ownerId,
    accountId : accountId,
    users: [],
    bucketFileId : bucketFile.$id,
    }
    const newFile =   await database.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
    ).catch ((error) => {
      // If creating the document fails, delete the uploaded file to avoid orphaned files
      storage.deleteFile(appWriteConfig.bucketId, bucketFile.$id);
      handleError(error, "failed to create file document");
    });
    revalidatePath(path)
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "failed to upload file");
  }
};
