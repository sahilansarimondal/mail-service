"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { serialize } from "v8";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl m-4 font-semibold">
        {loading ? "Loading..." : " Welcome back"}
      </h1>
      <hr />
      <label htmlFor="email" className="m-1 font-semibold">
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="m-1 font-semibold">
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: border-gray-600 text-black"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <Link
        className="mb-4 text-blue-400 font-semibold hover:font-bold hover:text-blue-500 "
        href={"/login/forgotpassword"}
      >
        forgot Password?
      </Link>

      <button
        onClick={onLogin}
        className="p-2 border-2 border-gray-300 rounded-lg mb-4 hover:border-green-500 "
      >
        {buttonDisabled ? "Enter details" : "Login"}
      </button>
      <Link
        className="text-blue-400 font-semibold hover:font-bold hover:text-blue-500 "
        href={"/signup"}
      >
        Visit Signup Page
      </Link>
    </div>
  );
}
