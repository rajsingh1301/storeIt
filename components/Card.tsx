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
  bucketFileId: string;
  extension: string;
  size?: number;
  fileSize?: number;
  uploadDate: string;
  owner: {
    fullName: string;
  };
}

const Card = ({ file }: { file: FileDocument }) => {
  const displayName = file.fileName || file.name || "Unnamed File";

  return (
    <Link
      href={file.url}
      target="_blank"
      className="group relative flex cursor-pointer flex-col justify-between rounded-[18px] bg-white p-4 sm:p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex justify-between items-start gap-4">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-14 sm:!size-16 drop-shadow-sm"
          imageClassName="!size-full object-cover rounded-lg"
        />
        <div className="flex flex-col items-end gap-2">
           <ActionDropDown file={file} />
           <p className="text-[10px] sm:text-xs font-semibold text-gray-400 capitalize whitespace-nowrap">
             {convertFileSize(file.fileSize || file.size || 0)}
           </p>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col gap-1">
        <p className="text-sm md:text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-brand">
          {displayName}
        </p>
        <FormatedDateTime
          date={file.uploadDate}
          className="!text-[10px] md:!text-xs font-medium text-gray-400"
        />
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-brand/10 flex items-center justify-center text-brand text-[10px] sm:text-xs font-bold">
             {file.owner?.fullName?.charAt(0)?.toUpperCase() || "U"}
           </div>
           <p className="text-xs sm:text-sm font-medium text-gray-600 truncate max-w-[100px] sm:max-w-[120px]">
             {file.owner?.fullName || "Unknown"}
           </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
