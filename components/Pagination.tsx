"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-4 mt-8 pb-4">
      <button 
        onClick={() => handleNavigation(page - 1)}
        disabled={page === 1}
        className="flex items-center justify-center w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#0c1222]/80 to-[#1c2331]/80 backdrop-blur-[20px] shadow-[0_0_25px_rgba(0,0,0,0.03)] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-white/10 group"
      >
        <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
      </button>
      
      <div className="flex items-center justify-center px-4 h-10 rounded-[14px] bg-white/5 border border-white/5 backdrop-blur-[10px]">
        <span className="text-white font-semibold text-[15px] tracking-wide">
          Page {page} <span className="text-slate-400 font-normal mx-1">of</span> {totalPages}
        </span>
      </div>
      
      <button 
        onClick={() => handleNavigation(page + 1)}
        disabled={page === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#0c1222]/80 to-[#1c2331]/80 backdrop-blur-[20px] shadow-[0_0_25px_rgba(0,0,0,0.03)] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-white/10 group"
      >
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
      </button>
    </div>
  );
};
