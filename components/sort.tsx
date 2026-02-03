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
      <SelectTrigger className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#333F4E] shadow-sm transition-all hover:border-[#cc4820] hover:bg-gray-50 focus:ring-4 focus:ring-[#cc4820]/10 focus:outline-none sm:w-[210px] data-[state=open]:border-[#cc4820] data-[state=open]:ring-4 data-[state=open]:ring-[#cc4820]/10">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#cc4820]/10 text-[#cc4820]">
            <ArrowUpDown className="size-3.5" />
          </div>
          <SelectValue placeholder={sortTypes[0].label} />
        </div>
      </SelectTrigger>

      <SelectContent
        position="popper"
        sideOffset={8}
        className="min-w-[210px] rounded-2xl border border-gray-100 bg-white/95 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] backdrop-blur-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
      >
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.value}
            value={sort.value}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-[#333F4E] transition-all hover:bg-gray-50 focus:bg-[#cc4820]/5 focus:text-[#cc4820] data-[state=checked]:bg-[#cc4820] data-[state=checked]:text-white font-medium group"
          >
            <span className="flex-1">{sort.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;


