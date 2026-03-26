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
        {usageSummary.map((summary, index) => {
          const getAccentColor = (title: string) => {
            switch (title) {
              case 'Images': return '#2dd4bf'; // Teal
              case 'Documents': return '#a78bfa'; // Muted Purple
              case 'Media': return '#4ade80'; // Green
              case 'Others': return '#c084fc'; // Lavender
              default: return '#FA7275';
            }
          };

          const accentColor = getAccentColor(summary.title);
          const usagePercentage = Math.max((summary.size / (totalSpace.all || 1)) * 100, 0);

          return (
            <Link
              href={summary.url}
              key={index}
              className="group relative flex flex-col p-6 rounded-[16px] bg-gradient-to-br from-[#0c1222]/80 to-[#1c2331]/80 backdrop-blur-[20px] shadow-[0_0_25px_rgba(0,0,0,0.03)] border border-white/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              style={{ '--hover-color': accentColor } as React.CSSProperties}
            >
              {/* Subtle hover background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: accentColor }}
              />

              {/* Top Data Section */}
              <div className="flex items-center w-full z-10">
                {/* Icon enclosed in a micro-donut gauge */}
                <div className="relative w-[52px] h-[52px] flex items-center justify-center flex-shrink-0">
                  {/* Neumorphic base ring */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="26" cy="26" r="24" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
                    {/* Animated glowing progress ring */}
                    <circle 
                      cx="26" cy="26" r="24" 
                      stroke={accentColor} 
                      strokeWidth="1.5" 
                      fill="none" 
                      strokeDasharray="150.8" /* 2 * PI * 24 */
                      strokeDashoffset={150.8 - (150.8 * usagePercentage) / 100} 
                      strokeLinecap="round" 
                      className="transition-all duration-1000 group-hover:drop-shadow-[0_0_8px_var(--hover-color)]"
                    />
                  </svg>
                  
                  {/* Clean Icon Render via masking */}
                  <div 
                    className="w-6 h-6 z-10 filter drop-shadow-[0_0_6px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_8px_var(--hover-color)] transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: accentColor,
                      maskImage: `url(${summary.icon})`,
                      WebkitMaskImage: `url(${summary.icon})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                </div>
                
                {/* Data Number - Centered Flex */}
                <div className="flex-1 flex justify-center items-center min-w-0 pl-2 sm:pr-[52px]">
                  <h4 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white mono-number drop-shadow-sm tracking-wide z-10 transition-transform duration-300 group-hover:scale-105 truncate">
                    {convertFileSize(summary.size || 0)}
                  </h4>
                </div>
              </div>
              
              {/* Bottom Metadata Section */}
              <div className="flex flex-col mt-8 z-10">
                <h5 className="text-[17px] font-semibold text-slate-200 tracking-wide text-center w-full mb-3">
                  {summary.title}
                </h5>
                
                {/* Footer Rail */}
                <div className="flex items-center justify-center gap-2.5 text-[13px] font-medium w-full border-t border-white/[0.04] pt-3.5 transition-colors duration-300 group-hover:border-white/[0.08]">
                  {summary.latestDate ? (
                    <>
                      <span className="text-slate-400">Updated</span>
                      <span className="w-[1px] h-3 bg-white/10" />
                      <FormatedDateTime date={summary.latestDate} className="!text-[13px] !text-slate-300" />
                    </>
                  ) : (
                    <span className="text-slate-500">No files</span>
                  )}
                </div>
              </div>
              
              {/* Outer Hover Glow Outline attached to group border via CSS shadow is handled natively by tailwind standard drops if we wanted, but we injected a div for the ambient light above! */}
              <div 
                className="absolute inset-0 rounded-[16px] border border-transparent group-hover:border-[var(--hover-color)] opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
              />
            </Link>
          );
        })}
      </section>

      {/* Main Bottom Section - Glassmorphism */}
      <section className="flex flex-col xl:flex-row gap-6 lg:gap-8 flex-1 min-h-0 w-full">
        
        {/* Chart Column */}
        <div className="w-full xl:w-[45%] flex-shrink-0 min-w-0 h-auto sm:h-[480px] xl:h-[500px]">
          <StorageChart {...totalSpace} />
        </div>
        
        {/* Recent Files Column */}
        <div className="flex-1 min-w-0 rounded-[16px] bg-gradient-to-br from-[#0c1222]/80 to-[#1c2331]/80 backdrop-blur-[20px] shadow-[0_0_25px_rgba(0,0,0,0.03)] border border-white/5 p-4 sm:p-6 lg:p-8 flex flex-col h-[400px] sm:h-[480px] xl:h-[500px] overflow-hidden">
           <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
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
                     className="flex items-center justify-between py-4 border-b border-white/[0.06] sm:px-3 hover:bg-white/[0.03] transition-all group first:pt-0 last:border-b-0 w-full"
                   >
                     <div className="flex items-center gap-4 sm:gap-5 truncate min-w-0 flex-1 pr-4">
                       <div className="flex items-center justify-center w-12 h-12 rounded-[14px] bg-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.15)] flex-shrink-0 border border-white/10 group-hover:-translate-y-0.5 transition-transform duration-300">
                         <Thumbnail
                           type={file.type}
                           extension={file.extension}
                           url={file.url}
                           className="!w-7 !h-7 sm:!w-8 sm:!h-8 drop-shadow-md"
                           imageClassName="!size-full object-contain"
                         />
                       </div>
                       <div className="flex flex-col min-w-0">
                         <p className="text-[15px] sm:text-[16px] font-semibold text-white truncate transition-colors group-hover:text-[#FA7275] tracking-tight antialiased">
                           {displayName}
                         </p>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 pl-2">
                        <span className="text-[14px] font-bold text-slate-200 mono-number drop-shadow-sm whitespace-nowrap text-right min-w-[60px]">
                          {convertFileSize(file.fileSize || file.size || 0)}
                        </span>
                        
                        <div className="hidden sm:flex items-center gap-4 sm:gap-6">
                           <span className="w-[1px] h-4 bg-white/10" />
                           <FormatedDateTime
                             date={file.$createdAt}
                             className="!text-[13px] text-slate-400 font-medium whitespace-nowrap text-right min-w-[90px]"
                           />
                        </div>
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
