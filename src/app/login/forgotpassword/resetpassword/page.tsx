"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const initialized = useRef(false);
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clickHandler = async () => {
    try {
      if (newPassword === confirmPassword) {
        const response = await axios.post("/api/users/changepassword", {
          newPassword,
          userId,
        });
        console.log(response.data);
        alert(response.data.message);
        router.push("/login");
      } else {
        alert("password does not match");
      }
    } catch (error: any) {
      console.log({ error: error.message });
    }
  };

  const verifyUserEmail = async () => {
    const response = await axios.post("/api/users/resetpassword", { token });
    if (response.data.success === true) {
      setVerified(true);
      setUserId(response.data.userId);
    }
    console.log(response.data);
    alert(response.data.message);
  };

  useEffect(() => {
    console.log("hi form effect");
    const tokenUrl = window.location.search.split("=")[1];
    setToken(tokenUrl);
  }, []);

  useEffect(() => {
    verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {verified && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl m-4">Reset Password</h1>
          <form action=""></form>
          <label htmlFor="newPassword">New Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus: border-gray-600 text-black"
            type="text"
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="newPassword"
            required
            min={4}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus: border-gray-600 text-black"
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="confirmPassword"
            required
            min={4}
          />
          <button
            onClick={clickHandler}
            className="p-2 border border-gray-300 rounded-lg m-4 focus: border-gray-600"
          >
            Save Changes
          </button>
        </div>
      )}

      {!verified && (
        <div>
          <h1 className="text-4xl m-4">Proccessing...</h1>
        </div>
      )}
    </div>
  );
}
