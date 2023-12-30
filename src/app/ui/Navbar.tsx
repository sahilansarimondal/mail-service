"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const pathname = usePathname();

  const getUser = async () => {
    if (pathname === "/profile") {
      const response = await axios.get("/api/users/me");
      const username = response.data.data.username;
      setUsername(username);
    }
  };
  useEffect(() => {
    getUser();
  });

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  if (pathname === "/profile") {
    return (
      <div className="flex justify-between border-b-2 drop-shadow-md border-slate-900  ">
        <Link href={"/"}>
          <Image
            className="mx-2"
            src="/logoimg.png"
            alt="logo"
            width={"60"}
            height={"60"}
          />
        </Link>
        <h2 className="flex items-center text-xl font-semibold ">{username}</h2>

        <button
          onClick={logout}
          className="p-2 mt-2 mr-3 border-b-2 border-gray-300  bg-slate-900 rounded-lg mb-4 hover:border-blue-500 hover:bg-slate-800"
        >
          {"Logout"}
        </button>
      </div>
    );
  }
  return (
    <div className="flex justify-between border-b-2 drop-shadow-md border-slate-900  ">
      <Link href={"/"}>
        <Image
          className="mx-2"
          src="/logoimg.png"
          alt="logo"
          width={"60"}
          height={"60"}
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
