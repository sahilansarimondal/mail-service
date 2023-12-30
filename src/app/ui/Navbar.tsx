"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex justify-between border-b-2 drop-shadow-md border-slate-900  ">
      <Link href={"/"}>
        <Image
          className="mx-2"
          src="/logoimg.png"
          alt="logo"
          width={"60"}
          height={"50"}
        />
      </Link>
      <Link
        href={pathname === "/signup" ? "/login" : "/signup"}
        className="mt-2 pr-2"
      >
        <button className="p-2 border-b-2 border-gray-300  bg-slate-900 rounded-lg mb-4 hover:border-blue-500 hover:bg-slate-800">
          {pathname === "/signup" ? "Login" : "Signup"}
        </button>
      </Link>
    </div>
  );
};
