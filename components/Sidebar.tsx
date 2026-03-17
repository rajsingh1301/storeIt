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
                "flex text-[#94a3b8] gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[24px] h-[52px] lg:rounded-2xl transition-all duration-300 relative group",
                isActive ? "bg-white/5 text-white" : "hover:bg-white/5 hover:text-[#cbd5e1]"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#FA7275] rounded-r-md shadow-[0_0_12px_#FA7275]" />
              )}
              <Link href={url} className="lg:w-full flex items-center gap-4 w-full h-full justify-center lg:justify-start">
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
                <p className="hidden lg:block font-medium">{name}</p>
              </Link>
            </li>
          )})}
        </ul>
      </nav>
      <Image src="/assets/images/files-2.png"
        alt="logo"
        width={503}
        height={415}
        className="w-full opacity-60 mix-blend-screen"
        />
        {/*side bar info  */ }
        <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-white/5 p-2 text-white border border-white/10 lg:justify-start lg:p-3 backdrop-blur-md"> 
            <Image src ={avatarPlaceholderUrl} alt="avatar" width={44} height={44} className="aspect-square w-11 rounded-full object-cover border-2 border-white/10"/>
            <div className="hidden lg:block">
            <p className="text-[14px] leading-[20px] font-semibold capitalize tracking-wide">{fullName}</p>
            <p className="text-[12px] leading-[16px] font-normal text-[#94a3b8]">{email}</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
