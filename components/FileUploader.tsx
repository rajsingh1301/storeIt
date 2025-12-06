"use client";

import React, { use, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import { convertFileToUrl } from "@/lib/utils";
import { MAX_FILE_SIZE } from "@/constants";
import { set } from "zod";
import { toast } from "sonner";
import { uploadFile } from "@/lib/actions/files.action";
import { usePathname } from "next/navigation";
interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  const path = usePathname()
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
        return toast.error(
          <p className="text-[14px] leading-5 font-normal text-white">
            <span className="font-semibold">{file.name}</span> is too large.
            Maximum file size is 50MB.
          </p>,
          {
            style: {
              background: "#ef4444",
              color: "white",
              borderRadius: "10px",
            },
          }
        );
      }
      return uploadFile({file , ownerId , accountId , path}).then( (uploadedFile) =>{
        if(uploadedFile){
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
          toast.success( 
      })
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="cursor-pointer w-fit mx-auto mt-6">
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn(
          "bg-[#FA7275] hover:bg-[#E46F72] transition-all rounded-[42px] h-[52px] w-35 lg:h-[52px] px-10 lg:px-16 flex items-center gap-3 shadow-[0_6px_18px_rgba(250,114,117,0.35)] text-white text-[16px] lg:text-[18px] font-semibold tracking-wide",
          className
        )}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-[480px] flex-col gap-3 rounded-[20px] bg-white p-7 shadow-drop-3">
          <h4 className="h4 text-[#333F4E]"> Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between  gap-3 rounded-xl p-3 shadow-drop-3"
              >
                <div className=" flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className=" text-[14px] leading-[20px] font-semibold mb-2 max-w-[300px]">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      width={70}
                      height={26}
                      alt="loader"
                    />
                  </div>
                </div>
                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
