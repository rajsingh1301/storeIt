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
      <section className="flex h-full flex-1 flex-col pb-0 relative">
        <MobileNavigation {...CurrentUser} />
        <Header userId={CurrentUser.$id} accountId={CurrentUser.accountId} />
        <div className="main-content flex-1 overflow-auto w-full p-4 sm:p-8 lg:p-12 sm:rounded-tl-[32px] bg-white/[0.02] sm:border-t sm:border-l border-white/5 shadow-[-10px_-10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl flex flex-col min-w-0">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default layout;
