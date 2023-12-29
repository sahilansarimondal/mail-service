"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl m-4 font-semibold">
        {loading ? "Loading..." : "Create Account"}
      </h1>
      <hr />
      <label className="m-1 font-semibold" htmlFor="username">
        Username
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label className="m-1 font-semibold" htmlFor="email">
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
      <label className="m-1 font-semibold" htmlFor="password">
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
      <button
        onClick={onSignup}
        className="p-2 mt-4 border-2 border-gray-300 rounded-lg mb-4 hover:border-green-600 "
      >
        {buttonDisabled ? "Enter Details" : "Sign Up"}
      </button>
      <Link
        className="font-semibold text-blue-400 hover:text-blue-500 hover:font-bold"
        href={"/login"}
      >
        Visit Login Page
      </Link>
    </div>
  );
}
