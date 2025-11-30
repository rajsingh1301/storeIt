import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.action";
import FileUploader from "./FileUploader";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      <div className="text-lg font-medium text-black">
        Search
      </div>

      <div className="flex items-center gap-4">
        <span className="text-lg font-medium "><FileUploader/></span>
        <form action= {async () => {
          'use server';
          await signOutUser();

        }}>
          <Button
            type="submit"
            className="flex items-center justify-center h-[52px] w-[52px] rounded-full bg-red-100 text-white shadow-none transition-all hover:bg-[#fa7275]/80"
            
          >
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
