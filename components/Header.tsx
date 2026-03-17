import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.action";
import FileUploader from "./FileUploader";
import Search from "./Search";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className=" hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10">
      <div className="flex-1 text-lg font-medium text-white">
        <Search />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-lg font-medium ">
          <FileUploader ownerId={userId} accountId={accountId} />
        </span>
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button
            type="submit"
            className="flex items-center justify-center h-[52px] w-[52px] rounded-full bg-[#151D2F] border border-white/5 text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all hover:bg-white/5 hover:border-white/20 mt-6"
          >
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="drop-shadow-sm brightness-0 invert opacity-70 transition-opacity hover:opacity-100"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
