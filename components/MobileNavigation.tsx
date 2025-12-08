"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.action";
import { Button } from "./ui/button";

interface Props {
  $id: string;
  fullName: string;
  accountId: string;
  email: string;
  avatar: string;
}
const MobileNavigation = ({
  $id: ownerId,
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
        <SheetContent className="pt-0 h-screen px-3 bg-white ">
          <SheetTitle>
            <div className="my-3 flex  items-center gap-2 rounded-full p-1 text-[#333F4E] sm:justify-center sm:bg-[#FA7275]/10 lg:justify-start lg:p-3">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="aspect-square w-10 rounded-full object-cover"
              />
              <div className="sm:hidden lg:block">
                <p className=" flex text-[14px] leading-5 font-semibold capitalize  ">
                  {fullName}
                </p>
                <p className=" text-[12px] leading-4 font-normal">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-[#A3B2C7]/20" />
          </SheetTitle>
          <nav className="h5 flex-1 gap-1 text-[#FA7275]">
            <ul className="flex flex-1 flex-col gap-4">
              {navItems.map(({ url, name, icon }) => (
                <li
                  key={name}
                  className={cn(
                    "flex text-[#333F4E] gap-4 w-full justify-start items-center h5 px-6 h-[52px] rounded-full ",
                    pathName === url && "bg-[#FA7275] text-white shadow-drop-2 "
                  )}
                >
                  <Link
                    href={url}
                    className="lg:w-full flex items-center gap-4"
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "w-6 filter invert opacity-25 ",
                        pathName === url && "invert-0 opacity-100"
                      )}
                    />
                    <p>{name}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <Separator className="my-5 bg-[#A3B2C7]/20" />
            <div className="flex flex-col justify-between gap-5 px-4">
              <FileUploader
                ownerId={ownerId}
                accountId={accountId}
                className="w-full mx-auto"
              />
              <Button
                type="button"
                className=" h5 flex h-[52px] w-full items-center justify-center gap-4 rounded-full bg-[#FA7275]/10 px-6 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20 "
                onClick={async () => await signOutUser()}
              >
                <Image
                  src="/assets/icons/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
                Logout
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
