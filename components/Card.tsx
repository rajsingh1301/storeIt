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
      className="group relative flex cursor-pointer flex-col justify-between rounded-[26px] bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 transition-all duration-500 ease-in-out hover:shadow-[0_20px_40px_-5px_rgba(250,114,117,0.15)] hover:ring-[#FA7275]/20 hover:-translate-y-2 overflow-hidden"
    >
      {/* Top section with thumbnail and metadata */}
      <div className="relative flex items-start justify-between gap-4">
        {/* Left: Thumbnail + name */}
        <div className="flex flex-col items-start gap-4">
          <div className="relative flex items-center justify-center rounded-2xl bg-gray-50 p-2 transition-all duration-500 group-hover:bg-[#FA7275]/5 group-hover:shadow-inner">
            <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}
              className="!size-[100px] transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 drop-shadow-sm"
              imageClassName="!size-full object-cover rounded-lg"
            />
             {/* Status Dot */}
            <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#FA7275] ring-4 ring-white shadow-sm" />
          </div>

          <p className="text-base font-bold text-gray-800 line-clamp-1 max-w-[140px] transition-colors duration-300 group-hover:text-[#FA7275]">
            {displayName}
          </p>
        </div>

        {/* Right: Actions + date + size */}
        <div className="flex flex-col items-end gap-3 pt-1">
          <ActionDropDown file={file} />

          <div className="flex flex-col items-end gap-1 select-none">
            <FormatedDateTime
              date={file.uploadDate}
              className="!text-[11px] !font-semibold !text-gray-400 group-hover:!text-[#FA7275]/70 transition-colors"
            />
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              {convertFileSize(file.fileSize || file.size || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section with owner */}
      <div className="relative flex items-center gap-3 pt-5 mt-4 border-t border-gray-100/60 group-hover:border-[#FA7275]/10 transition-colors">
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#FA7275] to-[#ff9bab] flex items-center justify-center text-white text-sm font-bold shadow-md shadow-[#FA7275]/20 ring-2 ring-white">
          {file.owner?.fullName?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-700 truncate max-w-[120px] group-hover:text-gray-900 transition-colors">
            {file.owner?.fullName || "Unknown"}
            </p>
            <p className="text-[10px] text-gray-400 font-medium leading-none">Owner</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
