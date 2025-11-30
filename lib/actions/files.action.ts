"use server";
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
}: UploadFileProps) => {};
