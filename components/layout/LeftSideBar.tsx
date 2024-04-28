"use client"

import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "@clerk/nextjs";

export default function LeftSideBar() {
 const pathname = usePathname(); 
 
  return (
    <div className="h-screen flex left-0 top-0 sticky p-10 flex-col bg-blue-2 shadow-xl max-lg:hidden gap-16 ">
      <Image src="/logo.png" width={150} height={30} alt="logo icon" />
      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link href={link.url} key={link.label} className={`flex gap-4 font-medium text-md ${pathname===link.url ? "text-blue-1":"text-grey-1"}`}>
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-md font-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
}
