"use client";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
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
                "sidebar-nav-item",
                pathName === url && "bg-brand text-white shadow-drop-2 "
              )}
            >
              <Link href={url} className="lg:w-full flex items-center gap-4">
                <Image src={icon} alt={name} width={24} height={24} />
                <p>{name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
