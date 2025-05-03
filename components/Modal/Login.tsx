"use client";

import { LoginApi } from "@/Apis/User";

import { setUser } from "@/Redux/auth";
import { useAppDispatch } from "@/Redux/hook";
import { useState } from "react";

const ModalAuth = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  if (!isOpen) return null;
  const handleLogin = async () => {
    const res = await LoginApi({ username, password });
    console.log("res", res.Object);
    dispatch(setUser(res.Object));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold rounded-l-md ${
              activeTab === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-r-md ${
              activeTab === "register"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Form Area */}
        {activeTab === "login" ? (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="username"
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAuth;
