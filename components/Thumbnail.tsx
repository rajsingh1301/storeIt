import React from "react";
import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";
interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}
const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";
  console.log("URL:", url, "isImage:", isImage);
  return (
    <figure
      className={cn(
        " flex-center size-[50px] min-w-[50px] overflow-hidden rounded-full bg-[#FA7275]/10",
        className
      )}
    >
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && "size-full object-cover object-center "
        )}
      />
    </figure>
  );
};

export default Thumbnail;
