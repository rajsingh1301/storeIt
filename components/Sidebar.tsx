"use client";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
 interface Props {
    fullName : string;
    email : string;
    avatar : string;
 }
const Sidebar = ({fullName , email , avatar}: Props) => {
  const pathName = usePathname();
  return (
    <aside className="remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px] bg-[#1a1f2c] border-r border-[#2a303f]">
      <Link href="/">
        <div className="hidden lg:flex items-center gap-2 mb-2">
          <Image
            src="/assets/icons/logo-brand.svg"
            alt="logo"
            width={52}
            height={52}
            className="h-auto opacity-90"
          />
          <span className="text-[28px] font-bold tracking-tight text-white drop-shadow-sm">FileDock</span>
        </div>
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo2"
          width={52}
          height={52}
          className="lg:hidden opacity-90"
        />
      </Link>
      <nav className="h5 mt-10 flex-1 gap-1">
        <ul className="flex flex-1 flex-col gap-4">
          {navItems.map(({ url, name, icon }) => {
            const isActive = pathName === url;
            return (
            <li
              key={name}
              className={cn(
                "flex gap-4 rounded-[14px] lg:w-full justify-center lg:justify-start items-center lg:px-[24px] h-[52px] transition-all duration-300 relative group",
                isActive 
                  ? "text-white bg-[#FA7275]/[0.15] border border-white/10 shadow-[0_0_20px_rgba(250,114,117,0.2)]" 
                  : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200"
              )}
            >
              <Link href={url} className="lg:w-full flex items-center gap-4 w-full h-full justify-center lg:justify-start relative z-10">
                <Image 
                  src={icon} 
                  alt={name} 
                  width={24} 
                  height={24} 
                  className={cn(
                    "w-6 transition-all duration-300 filter brightness-0 invert", 
                    isActive ? "opacity-100" : "opacity-50 group-hover:opacity-70"
                  )} 
                />
                <p className="hidden lg:block font-medium text-[16px] tracking-wide">{name}</p>
              </Link>
            </li>
          )})}
        </ul>
      </nav>
      <Image src="/assets/images/files-2.png"
      alt ="logo"
        width={503}
        height={415}
        className="w-full opacity-60 mix-blend-screen"
        />
        {/*side bar info  */ }
        <div className="mt-4 flex items-center justify-center gap-3 rounded-[16px] bg-white/[0.02] p-2 text-white border-t border-white/[0.12] border-x border-white/[0.06] border-b border-black/[0.2] shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] lg:justify-start lg:p-3 backdrop-blur-md transition-all"> 
            <Image src ={avatarPlaceholderUrl} alt="avatar" width={44} height={44} className="aspect-square w-11 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/10 filter contrast-110"/>
            <div className="hidden lg:block">
            <p className="text-[14px] leading-[20px] font-semibold capitalize tracking-wide">{fullName}</p>
            <p className="text-[12px] leading-[16px] font-normal text-slate-400">{email}</p>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
