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
      className="group relative flex cursor-pointer flex-col justify-between rounded-[16px] bg-white/[0.03] backdrop-blur-[24px] p-5 shadow-[0_0_25px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.08)] border border-white/5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,114,117,0.15),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:border-[#FA7275]/50 overflow-hidden"
    >
      {/* Top Row: Thumbnail and Dropdown */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-[50px] shadow-[0_0_10px_rgba(255,255,255,0.2)] border border-white/20 bg-transparent transition-transform duration-300 group-hover:scale-105"
          imageClassName="!size-full object-cover rounded-full"
        />
        <div className="flex flex-col items-end gap-2 relative z-10">
           <ActionDropDown file={file} />
        </div>
      </div>
      
      {/* Middle Row: Filename */}
      <div className="mt-2 flex flex-col gap-1 w-full justify-center flex-1">
        <p className="text-[16px] font-semibold text-white/90 truncate tracking-wide font-mono transition-colors group-hover:text-[#FA7275]">
          {displayName}
        </p>
      </div>

      {/* Bottom Row: Metadata Rail */}
      <div className="mt-5 flex items-center justify-between text-[11.5px] font-mono text-slate-400 tracking-tight w-full truncate relative z-10 px-1">
         <span className="truncate pr-2.5 font-medium">
           {convertFileSize(file.fileSize || file.size || 0)}
         </span>
         
         <div className="w-[1px] h-3 bg-slate-400/30 flex-shrink-0" />
         
         <FormatedDateTime
           date={file.uploadDate}
           className="!text-[11.5px] !font-medium !text-slate-400 px-2.5 truncate font-mono"
         />
         
         <div className="w-[1px] h-3 bg-slate-400/30 flex-shrink-0" />
         
         <span className="truncate pl-2.5 font-medium">
           {file.owner?.fullName || "Unknown"}
         </span>
      </div>
    </Link>
  );
};

export default Card;
