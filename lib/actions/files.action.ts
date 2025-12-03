"use server";

import { createAdminClient } from "../appwrite";
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
    const {storage , database} = await createAdminClient();

    try {

    }catch (error){

        handleError(error, "failed to upload file");
    }


};
