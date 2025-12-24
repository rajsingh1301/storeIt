import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import FormatedDateTime from "@/components/FormatedDateTime";
import { convertFileSize } from "@/lib/utils";
import ActionDropDown from "./ActionDropDown";

interface FileDocument extends Models.Document {
  name?: string;
  fileName?: string;
  url: string;
  type: string;
  extension: string;
  size?: number;
  fileSize?: number;
  uploadDate: string;
  owner: {
    fullName: string;
  };
}
const Card = ({ file }: { file: FileDocument }) => {
  console.log(file.name)
  return (
   
    <Link
      href={file.url}
      target="_blank"
      className="group relative flex cursor-pointer flex-col gap-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-lg shadow-gray-200/50 ring-1 ring-gray-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#FA7275]/20 hover:ring-[#FA7275]/30 hover:-translate-y-1"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FA7275]/5 to-[#FA7275]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex justify-between items-start">
        <div className="relative flex flex-col gap-3">
          <Thumbnail
            type={file.type}
            extension={file.extension}
            url={file.url}
            className="!size-24 ring-2 ring-white shadow-md transition-all duration-300 group-hover:ring-[#FA7275]/30 group-hover:shadow-lg group-hover:scale-105"
            imageClassName="!size-full object-cover"
          />
         
          {/* Glowing dot indicator */}
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#FA7275] ring-2 ring-white animate-pulse" />
          

          {/* File name below image */}
          <p className="text-sm font-semibold text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-[#FA7275] max-w-[96px]">
            {file.fileName}
          </p>
        </div>

        <div className="flex flex-col items-end justify-between gap-3">
          <ActionDropDown  file = {file} />
          <div className="rounded-full bg-[#FA7275]/10 px-3 py-1 ring-1 ring-[#FA7275]/20">
            <FormatedDateTime
              date={file.uploadDate}
              className="!text-xs font-medium text-[#FA7275]"
            />
          </div>
          <div className="rounded-full bg-[#333F4E]/5 px-3 py-1.5 ring-1 ring-[#333F4E]/10">
          
            <p className="text-sm font-semibold text-[#333F4E]">
              {convertFileSize(file.fileSize || file.size || 0)}
            </p>
            
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-[#FA7275] flex items-center justify-center text-white text-xs font-semibold shadow-sm">
            {file.owner?.fullName?.charAt(0)?.toUpperCase() || "U"}
          
      </div>
      </div>
      </div>
    </Link>
  );
};
export default Card;
