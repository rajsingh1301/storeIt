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
  const displayName = file.fileName || file.name || "Unnamed File";

  return (
    <Link
      href={file.url}
      target="_blank"
      className="group relative flex cursor-pointer flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100/50 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[#FA7275]/10 hover:ring-[#FA7275]/40 hover:-translate-y-0.5"
    >
      {/* Top section with thumbnail and metadata */}
      <div className="relative flex items-start justify-between gap-4 mb-4">
        {/* Left: Thumbnail + name */}
        <div className="flex flex-col items-start gap-3">
          <div className="relative">
            <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}
              className="!size-[120px] ring-2 ring-gray-100/80 shadow-sm transition-all duration-300 group-hover:ring-[#FA7275]/30 group-hover:shadow-md group-hover:scale-[1.03]"
              imageClassName="!size-full object-cover"
            />
            <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-[#FA7275] ring-2 ring-white shadow-sm" />
          </div>

          <p className="text-sm font-medium text-gray-700 line-clamp-2 max-w-[120px] transition-colors duration-200 group-hover:text-[#FA7275]">
            {displayName}
          </p>
        </div>

        {/* Right: Actions + date + size */}
        <div className="flex flex-col items-end gap-2.5 pt-1">
          <ActionDropDown file={file} />

          <div className="flex flex-col items-end gap-1.5">
            <FormatedDateTime
              date={file.uploadDate}
              className="!text-xs !font-medium !text-[#FA7275]/90"
            />
            <p className="text-sm font-semibold text-gray-900">
              {convertFileSize(file.fileSize || file.size || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section with owner */}
      <div className="relative flex items-center gap-2 pt-3 border-t border-gray-100/80">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#FA7275] to-[#FA7275]/80 flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-[#FA7275]/10">
          {file.owner?.fullName?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <p className="text-xs font-medium text-gray-500 truncate">
          {file.owner?.fullName || "Unknown"}
        </p>
      </div>
    </Link>
  );
};
export default Card;
