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
import Search from "./Search";

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
    <>
      <header className="flex h-[60px] justify-between px-5 sm:hidden items-center bg-[#0B1121] border-b border-white/10 relative z-30">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo-brand.svg"
            alt="logo"
            width={40}
            height={40}
            className="h-auto opacity-90"
          />
          <span className="text-xl font-bold tracking-tight text-white drop-shadow-sm">FileDock</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Image
              src="/assets/icons/menu.svg"
              alt="menu"
              width={31}
              height={31}
              className="filter invert brightness-0 opacity-80"
            />
          </SheetTrigger>
          <SheetContent className="pt-0 h-screen px-3 bg-[#151D2F] border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
            <SheetTitle>
              <div className="my-5 flex items-center gap-3 rounded-2xl p-2 text-white bg-white/5 border border-white/10 sm:justify-center lg:justify-start lg:p-3">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="aspect-square w-11 rounded-full object-cover border-2 border-white/10"
                />
                <div className="sm:hidden lg:block text-left">
                  <p className="flex text-[14px] leading-5 font-semibold capitalize tracking-wide">
                    {fullName}
                  </p>
                  <p className="text-[12px] leading-4 font-normal text-[#94a3b8]">{email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-white/10" />
            </SheetTitle>
            <nav className="h5 flex-1 gap-1">
              <ul className="flex flex-1 flex-col gap-3">
                {navItems.map(({ url, name, icon }) => {
                  const isActive = pathName === url;
                  return (
                  <li
                    key={name}
                    className={cn(
                      "flex text-[#94a3b8] gap-4 w-full justify-start items-center h5 px-6 h-[52px] rounded-2xl transition-all duration-300 relative group",
                      isActive ? "bg-white/5 text-white" : "hover:bg-white/5 hover:text-[#cbd5e1]"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#FA7275] rounded-r-md shadow-[0_0_12px_#FA7275]" />
                    )}
                    <Link
                      href={url}
                      className="w-full flex items-center gap-4"
                    >
                      <Image
                        src={icon}
                        alt={name}
                        width={24}
                        height={24}
                        className={cn(
                          "w-6 transition-all duration-300",
                          isActive 
                            ? "brightness-0 invert sepia-[30%] saturate-[150%] hue-rotate-[10deg] opacity-100" 
                            : "brightness-0 invert sepia-[30%] saturate-[150%] hue-rotate-[10deg] opacity-40 group-hover:opacity-70"
                        )}
                      />
                      <p className="font-medium">{name}</p>
                    </Link>
                  </li>
                )})}
              </ul>

              <Separator className="my-5 bg-white/10" />
              <div className="flex flex-col justify-between gap-5 px-4 mt-8">
                <FileUploader
                  ownerId={ownerId}
                  accountId={accountId}
                  className="w-full mx-auto"
                />
                <Button
                  type="button"
                  className="h5 flex h-[52px] w-full items-center justify-center gap-4 rounded-full bg-white/5 px-6 text-white shadow-none transition-all hover:bg-white/10 border border-white/5 mt-4"
                  onClick={async () => await signOutUser()}
                >
                  <Image
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                    className="filter invert opacity-70"
                  />
                  Logout
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="px-5 py-4 sm:hidden bg-[#0B1121] relative z-20">
        <Search />
      </div>
    </>
  );
};

export default MobileNavigation;
