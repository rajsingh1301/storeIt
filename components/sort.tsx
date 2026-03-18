"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { sortTypes } from "@/constants";

const Sort = ({ defaultValue }: { defaultValue: string }) => {
  const path = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={defaultValue}>
      <SelectTrigger className="flex h-[42px] w-full items-center justify-between gap-2 rounded-[12px] border border-white/5 bg-white/[0.03] px-5 text-[14px] font-medium text-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all hover:bg-white/[0.06] hover:border-white/10 focus:ring-0 sm:w-[230px] data-[state=open]:bg-white/[0.08] data-[state=open]:border-[#FA7275]/50">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center text-[#FA7275]">
            <ArrowUpDown className="size-[14px]" strokeWidth={2.5}/>
          </div>
          <SelectValue placeholder={sortTypes[0].label} />
        </div>
      </SelectTrigger>

      <SelectContent
        position="popper"
        sideOffset={10}
        className="min-w-[230px] rounded-[16px] border border-white/10 bg-[#151D2F]/95 p-1.5 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
      >
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.value}
            value={sort.value}
            className="flex cursor-pointer items-center rounded-[10px] px-4 py-3 text-[14px] text-slate-300 transition-all hover:bg-white/[0.05] focus:bg-white/[0.05] focus:text-white data-[state=checked]:bg-[#FA7275]/10 data-[state=checked]:text-[#FA7275] font-medium group"
          >
            <span className="flex-1 tracking-wide">{sort.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;


