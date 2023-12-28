"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const clickHandler = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      console.log(response.data);
      alert(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log({ error: error.message });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Forgot Password</h1>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: border-gray-600 text-black"
        type="text"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="email"
      />{" "}
      <button
        onClick={clickHandler}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: border-gray-600"
      >
        send email
      </button>
    </div>
  );
}
