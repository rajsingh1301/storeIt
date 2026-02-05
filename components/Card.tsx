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
  const isImage = file.type === "image";

  return (
    <Link
      href={file.url}
      target="_blank"
      className="group relative flex cursor-pointer flex-col rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 transition-all duration-500 ease-in-out hover:shadow-[0_20px_40px_-5px_rgba(250,114,117,0.15)] hover:ring-[#FA7275]/20 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Top section with thumbnail and metadata */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gray-50 transition-all duration-500 group-hover:bg-[#FA7275]/5 group-hover:shadow-inner shrink-0">
            <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}
              className="!size-full !bg-transparent"
              imageClassName={isImage ? "!size-full object-cover rounded-xl" : "!size-10 object-contain"}
            />
            {/* Status Dot */}
            <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#FA7275] ring-2 ring-white shadow-sm" />
          </div>

          <div className="flex flex-col items-end gap-2">
            <ActionDropDown file={file} />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] bg-gray-50 px-2 py-0.5 rounded-md group-hover:bg-[#FA7275]/10 group-hover:text-[#FA7275] transition-colors">
              {convertFileSize(file.fileSize || file.size || 0)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-base font-bold text-gray-800 line-clamp-1 transition-colors duration-300 group-hover:text-[#FA7275]">
            {displayName}
          </p>
          <FormatedDateTime
            date={file.uploadDate}
            className="!text-[11px] !font-medium !text-gray-400"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
