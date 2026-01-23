 "use client";
import { renameFile, updateFileUsers } from "@/lib/actions/files.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState, useEffect } from "react";
import { is } from "zod/v4/locales";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { rename } from "fs";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "./ui/ActionModalContent";

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
  users?: string[];
}
const ActionDropDown = ({ file }: { file: FileDocument }) => {
  const [IsModelOpen, setIsModelOpen] = useState(false);
  const [IsDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.fileName);
  const [Isloading, setIsLoading] = useState(false);
  const [newEmails, setNewEmails] = useState<string[]>([]);
  const [descFile, setDescFile] = useState(file);
  const path = usePathname();

  useEffect(() => {
    setDescFile(file);
  }, [file]);

  const closeAllModels = () => {
    setIsModelOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.fileName);
    setNewEmails([]);
  };
  const handleRemoveUser = async (email: string) => {
    const updatedEmails = descFile.users?.filter((e) => e !== email);
    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails!,
      path,
    });
    if (success) setDescFile({ ...descFile, users: updatedEmails });
    closeAllModels();
  };
  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    // Extract extension from fileName for rename action
    const fileExtension =
      file.fileName?.split(".").pop() || file.extension || "";
    // Remove extension from name if user included it
    const nameWithoutExt = name?.replace(/\.[^/.]+$/, "") || "";
    const actions = {
      rename: () =>
        renameFile({
          fileId: file.$id,
          name: nameWithoutExt,
          extension: fileExtension,
          path,
        }),
      share: () =>
        updateFileUsers({
          fileId: file.$id,
          emails: [
            ...(descFile.users || []),
            ...newEmails.filter((email) => email.trim() !== ""),
          ],
          path,
        }),
      delete: () => {
        /* delete logic */
      },
      details: () => {
        /* details logic */
      },
    };
    success = await actions[action.value as keyof typeof actions]();
    if (success) {
      closeAllModels();
    }
    setIsLoading(false);
  };
  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;
    return (
      <DialogContent className="sm:max-w-[450px] gap-8 p-8 bg-white rounded-3xl focus:ring-0 focus:ring-offset-0 focus-visible:border-none outline-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-normal text-gray-700">
            {label}
          </DialogTitle>
        </DialogHeader>

        {value === "rename" && (
          <Input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="h-11 px-4 bg-gray-100 border-0 rounded-xl text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        )}
        {value === "details" && <FileDetails file={file} />}
        {value === "share" && (
          <ShareInput
            file={descFile}
            onInputChange={setNewEmails}
            onRemove={handleRemoveUser}
          />
        )}

        {["rename", "share", "delete"].includes(value) && (
          <div className="flex flex-col gap-3 md:flex-row">
            <Button
              onClick={closeAllModels}
              className="h-[52px] flex-1 rounded-full bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all font-medium shadow-sm hover:shadow-md"
            >
              Cancel
            </Button>
            <Button
              className="primary-btn mx-0 h-[52px] w-full flex-1 rounded-full bg-[#FA7275] hover:bg-[#D95F62] text-white shadow-lg shadow-[#FA7275]/40 transition-all hover:-translate-y-0.5"
              onClick={handleAction}
            >
              <p className="capitalize font-semibold">{label}</p>
              {Isloading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loading"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin opacity-80"
                />
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    );
  };
  return (
    <Dialog open={IsModelOpen} onOpenChange={setIsModelOpen}>
      <DropdownMenu open={IsDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 transition-transform hover:scale-110 active:scale-95">
          <Image
            src="/assets/icons/dots.svg"
            alt="dot"
            width={34}
            height={34}
            className="opacity-60 hover:opacity-100 transition-opacity"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-62 rounded-xl bg-white shadow-xl ring-1 ring-gray-100 border-0 p-3">
          <DropdownMenuLabel className="max-w-full truncate px-4 py-3 text-lg font-semibold text-gray-900">
            {file.fileName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px border-0" />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="cursor-pointer rounded-lg px-4 py-3.5 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FA7275]/10 hover:to-[#FA7275]/5 focus:bg-gradient-to-r focus:from-[#FA7275]/10 focus:to-[#FA7275]/5 group"
              onClick={() => {
                setAction(actionItem);
                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModelOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-[#FA7275]/10 transition-colors">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.value}
                      width={20}
                      height={20}
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-base font-medium text-gray-700 group-hover:text-[#FA7275] transition-colors">
                    {actionItem.label}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-[#FA7275]/10 transition-colors">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.value}
                      width={20}
                      height={20}
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-base font-medium text-gray-700 group-hover:text-[#FA7275] transition-colors">
                    {actionItem.label}
                  </span>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropDown;
