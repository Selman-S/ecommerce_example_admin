"use client"

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import  { useState } from "react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const TopBar = () => {
 const [dropdownMenu, setDropdownMenu] = useState(false);
 const pathname = usePathname(); 


  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-200 shadow-xl lg:hidden">
      <Image src="/logo.png" width={150} height={30} alt="logo icon" />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link href={link.url} key={link.label} className={`flex gap-4 font-medium text-md ${pathname===link.url ? "text-blue-700":"text-gray-700"}`}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 items-center relative">
        <Menu className="cursor-pointer md:hidden" onClick={()=>setDropdownMenu(!dropdownMenu)} />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link href={link.url} key={link.label} className={`flex gap-4 font-medium text-md ${pathname===link.url ? "text-blue-700":"text-gray-700"}`}>
                {link.icon}<p>{link.label}</p>
              </Link>
            ))}
        </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
