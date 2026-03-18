import React from "react";
import Sort from "@/components/sort";
import { getFiles } from "@/lib/actions/files.action";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { getFileTypesParams } from "@/lib/utils";
import { FolderPlus } from "lucide-react";

const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || " ";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "$createdAt-desc";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 pb-10 pt-4">
      <section className="w-full">
        <h1 className="text-[36px] sm:text-[42px] leading-tight font-semibold text-white capitalize tracking-tight">{type}</h1>
        <div className="flex mt-3 flex-col justify-between sm:flex-row sm:items-center">
          <p className="text-[15px] leading-[24px] font-medium text-slate-400">
            Total : <span className="text-slate-300">0 MB</span>
          </p>
          <div className="mt-5 flex items-center sm:mt-0 sm:gap-4 ">
            <p className="text-[14px] leading-5 font-medium hidden sm:block text-slate-500">
              Sort by:
            </p>
            <Sort defaultValue={sort} />
          </div>

        </div>
      </section>
      {/* render files here  */}
      {files.total > 0 ? (
        <section className="grid w-full gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file as any} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center pt-28 pb-16 opacity-80">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FA7275]/10 border border-[#FA7275]/20 shadow-[inset_0_2px_10px_rgba(250,114,117,0.2),0_10px_30px_rgba(250,114,117,0.15)] mb-6 transition-transform hover:-translate-y-1">
            <FolderPlus className="w-9 h-9 text-[#FA7275]" strokeWidth={1.5} />
          </div>
          <p className="text-[15px] font-medium text-slate-400 text-center tracking-wide">
            No files uploaded here
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
