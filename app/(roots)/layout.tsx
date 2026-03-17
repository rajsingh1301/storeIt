import Sidebar from "@/components/Sidebar";
import React from "react";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getUserProfile } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const CurrentUser = await getUserProfile();
  if (!CurrentUser) return redirect("/sign-in");
  return (
    <main className="flex h-screen">
      <Sidebar {...CurrentUser} />
      <section className="flex h-full flex-1 flex-col ">
        <MobileNavigation {...CurrentUser} />
        <Header userId={CurrentUser.$id} accountId={CurrentUser.accountId} />
        <div className="main-content flex-1 overflow-auto p-4 sm:p-6 lg:p-8 rounded-t-3xl sm:rounded-tl-[30px] sm:rounded-tr-none">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default layout;
