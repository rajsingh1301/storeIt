"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
interface Props{
  ownerId:string;
  fullName:string;
  accountId:string;
  email:string;
  avatar:string;
}
const MobileNavigation = ({
  ownerId,
  fullName,
  accountId,
  email,
  avatar,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <header className="flex h-[60px] justify-between px-5 sm:hidden ">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={124}
        height={54}
        className="h-auto   "
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={31}
            height={31}
          />
        </SheetTrigger>
        <SheetContent className="pt-0 h-screen px-3 bg-white">
          <SheetTitle>
            <div className="my-3 flex items-center gap-2 rounded-full p-1 text-[#333F4E] sm:justify-center sm:bg-[#FA7275]/10 lg:justify-start lg:p-3">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="aspect-square w-10 rounded-full object-cover"
              />
            </div>
          </SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
