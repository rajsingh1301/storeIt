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
const Sidebar = ({fullName , email , avatar}) => {
  const pathName = usePathname();
  return (
    <aside className=" remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo2"
          width={53}
          height={53}
          className=" lg:hidden"
        />
      </Link>
      <nav className="h5 mt-9 flex-1 gap-1 text-red-400 ">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <li
              key={name}
              className={cn(
                "flex text-[#333F4E] gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full",
                pathName === url && "bg-[#FA7275] text-white shadow-drop-2 "
              )}
            >
              <Link href={url} className="lg:w-full flex items-center gap-4">
                <Image src={icon} alt={name} width={24} height={24} className={cn("w-6 filter invert opacity-25 ", pathName === url && "invert-0 opacity-100")} />
                <p className="hidden lg:block">{name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Image src="/assets/images/files-2.png"
      alt ="logo"
        width={503}
        height={415}
        className="w-full "
        />
        {/*side bar info  */ }
        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#FA7275]/10 p-1 text-[#333F4E] lg:justify-start lg:p-3"> 
            <Image src ={avatarPlaceholderUrl} alt="avatar" width={40} height={40} className="aspect-square w-10 rounded-full object-cover "/>
            <div className="hidden lg:block">
            <p className="text-[14px] leading-[20px] font-semibold capitalize">{fullName}</p>
            <p className="text-[12px] leading-[16px] font-normal">{email}</p>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
