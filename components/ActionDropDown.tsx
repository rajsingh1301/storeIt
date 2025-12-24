"use client";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";
import {  useState } from "react";
import { is } from "zod/v4/locales";
import Link from "next/link";
import { DialogContent } from "@radix-ui/react-dialog";

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
const ActionDropDown = ({ file }: { file: FileDocument }) => {
    const [IsModelOpen , setIsModelOpen] = useState(false);
    const [IsDropdownOpen, setIsDropdownOpen] = useState(false);
    const [action , setAction] = useState<ActionType | null>(null);
    const renderDialogContent = ()=>{
        return (
            <DialogContent>
                Dialog
            </DialogContent>)
    }
  return (
    <Dialog open = {IsModelOpen} onOpenChange={setIsModelOpen}>
      <DropdownMenu open ={IsDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 transition-transform hover:scale-110 active:scale-95">
            <Image src="/assets/icons/dots.svg" alt="dot" width={34} height={34} className="opacity-60 hover:opacity-100 transition-opacity" />
            </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 rounded-xl bg-white shadow-xl ring-1 ring-gray-100 border-0 p-2">
          <DropdownMenuLabel className="max-w-[200px] truncate px-3 py-2 text-sm font-semibold text-gray-900">
            {file.fileName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px border-0" />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value} 
              className="cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FA7275]/10 hover:to-[#FA7275]/5 focus:bg-gradient-to-r focus:from-[#FA7275]/10 focus:to-[#FA7275]/5 group" 
              onClick={() =>{
                setAction(actionItem)
                if (["rename", "share" , "delete" , "details"].includes(actionItem.value)){
                  setIsModelOpen(true);
                }
              }}>
                {actionItem.value === "download" ? 
                <Link href = {constructDownloadUrl(file.bucketFileId)} download ={file.name} className="flex items-center gap-3" >
                 <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#FA7275]/10 transition-colors">
                   <Image src={actionItem.icon} alt={actionItem.value} width={18} height={18} className="opacity-70 group-hover:opacity-100 transition-opacity" /> 
                 </div>
                 <span className="text-sm font-medium text-gray-700 group-hover:text-[#FA7275] transition-colors">{actionItem.label}</span>
                 </Link> : <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#FA7275]/10 transition-colors">
                      <Image src={actionItem.icon} alt={actionItem.value} width={18} height={18} className="opacity-70 group-hover:opacity-100 transition-opacity" /> 
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#FA7275] transition-colors">{actionItem.label}</span>
                    </div>}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
     { renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropDown;
