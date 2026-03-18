import StorageChart from "@/components/StorageChart";
import { getTotalSpaceUsed, getFiles } from "@/lib/actions/files.action";
import { getUsageSummary } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Card";
import Thumbnail from "@/components/Thumbnail";
import { Models } from "node-appwrite";
import FormatedDateTime from "@/components/FormatedDateTime";
import { convertFileSize } from "@/lib/utils";

export default async function Home() {
  const totalSpace = await getTotalSpaceUsed();
  const usageSummary = getUsageSummary(totalSpace);
  const recentFiles = await getFiles({ types: [], limit: 10 });

  return (
    <div className="w-full h-full pb-10 flex flex-col gap-6 lg:gap-10">
      {/* 4 Cards Grid - Neumorphism */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
        {usageSummary.map((summary, index) => (
          <Link
            href={summary.url}
            key={index}
            className="flex flex-col gap-4 rounded-3xl neumorphism p-6 transition-all hover:-translate-y-1 hover:border-white/20 group hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="flex justify-between items-center">
              <div className="flex w-14 h-14 items-center justify-center rounded-2xl bg-white/5 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform border border-white/10">
                <Image
                  src={summary.icon}
                  alt={summary.title}
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain hue-rotate-[320deg] saturate-[250%] brightness-[1.2]"
                />
              </div>
              <h4 className="text-2xl sm:text-[28px] font-bold text-white truncate pl-2 mono-number drop-shadow-sm">
                {convertFileSize(summary.size || 0)}
              </h4>
            </div>
            
            <div className="flex flex-col mt-4">
              <h5 className="text-[17px] font-semibold text-slate-200 mb-2 tracking-tight">
                {summary.title}
              </h5>
              {/* Neumorphic Inset Progress Bar */}
              <div className="w-full h-2 rounded-full overflow-hidden mb-3 mt-1 bg-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-white/5">
                 <div
                    className="h-full bg-gradient-to-r from-[#FA7275] to-[#ffb4b6] rounded-full transition-all shadow-[0_0_10px_rgba(250,114,117,0.5)]"
                    style={{ width: `${Math.max((summary.size / (totalSpace.all || 1)) * 100, 0)}%` }}
                 />
              </div>
              <div className="flex items-center justify-between text-[13px] text-slate-400 font-medium mt-1">
                <span className="truncate pr-2">{summary.latestDate ? "Updated" : "No files"}</span>
                {summary.latestDate && (
                  <FormatedDateTime date={summary.latestDate} className="!text-[13px] !text-slate-400 flex-shrink-0" />
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Main Bottom Section - Glassmorphism */}
      <section className="flex flex-col xl:flex-row gap-6 lg:gap-8 flex-1 min-h-0">
        
        {/* Chart Column */}
        <div className="w-full xl:w-[45%] flex-shrink-0 min-w-0 xl:h-[500px]">
          <StorageChart {...totalSpace} />
        </div>
        
        {/* Recent Files Column */}
        <div className="flex-1 min-w-0 rounded-[20px] bg-white/[0.03] backdrop-blur-[24px] shadow-[0_0_25px_rgba(0,0,0,0.03)] border-none p-6 sm:p-8 flex flex-col h-[500px] xl:h-[500px] overflow-hidden">
           <div className="flex items-center justify-between mb-8 flex-shrink-0">
             <h2 className="text-xl sm:text-[26px] font-bold text-white tracking-tight drop-shadow-sm">Recent Files</h2>
             <Link href="/documents" className="text-[14px] font-semibold text-[#FA7275] hover:text-[#ffb4b6] transition-colors uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full backdrop-blur-md shadow-sm border border-white/10">
                View All
             </Link>
           </div>
           
           {recentFiles?.documents?.length > 0 ? (
             <div className="flex-1 overflow-y-auto remove-scrollbar relative -mx-2 px-2 pb-4">
               <div className="flex flex-col w-full h-fit">
               {recentFiles.documents.map((file: any) => {
                 const displayName = file.fileName || file.name || "Unnamed File";
                 return (
                   <Link
                     href={file.url}
                     target="_blank"
                     key={file.$id}
                     className="flex items-center justify-between py-4 border-b border-white/10 sm:px-3 hover:bg-white/5 transition-all group first:pt-0 last:border-b-0 rounded-2xl w-full"
                   >
                     <div className="flex items-center gap-4 sm:gap-5 truncate min-w-0 flex-1 pr-2">
                       <div className="flex items-center justify-center p-2.5 rounded-2xl bg-white/5 shadow-sm transition-transform group-hover:-translate-y-1 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex-shrink-0 border border-white/10">
                         <Thumbnail
                           type={file.type}
                           extension={file.extension}
                           url={file.url}
                           className="!size-8 sm:!size-11 drop-shadow-md transition-transform"
                           imageClassName="!size-full object-cover rounded-md"
                         />
                       </div>
                       <div className="flex flex-col truncate min-w-0 w-full">
                         <p className="text-[15px] sm:text-[17px] font-semibold text-white truncate transition-colors group-hover:text-[#FA7275] w-full">
                           {displayName}
                         </p>
                         <FormatedDateTime
                           date={file.uploadDate}
                           className="!text-[12px] font-medium !text-slate-400 mt-1 truncate"
                         />
                       </div>
                     </div>
                     <div className="flex flex-col items-end flex-shrink-0">
                       <span className="text-[13px] sm:text-[14px] font-bold text-slate-300 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ml-2 shadow-sm mono-number border border-white/5">
                         {convertFileSize(file.fileSize || file.size || 0)}
                       </span>
                     </div>
                   </Link>
                 );
               })}
               </div>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center p-10 flex-1">
               <Image
                 src="/assets/icons/empty.svg"
                 alt="empty"
                 width={140}
                 height={140}
                 className="opacity-30 filter drop-shadow-lg invert brightness-0"
               />
               <p className="mt-6 text-slate-400 font-medium text-[15px]">No files uploaded yet.</p>
             </div>
           )}
        </div>
      </section>
    </div>
  );
}
