"use client";
import { useAppSelector, useAppDispatch } from "@/Redux/hook";
import { baseURL } from "@/Utils/Axios";
import { Avatar } from "antd";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { setUser } from "@/Redux/auth";
import dynamic from "next/dynamic";
import { UserProfile } from "@/Utils/type";

const LoginModal = dynamic(() => import("@/components/Modal/Login"), {
  ssr: false,
});
const BottomNav = () => {
  const user = useAppSelector((state) => state.user.user);
  const fullPath = `${baseURL}${user?.Photo}`;
  const dispatch = useAppDispatch();
  const [showAvatarDropdownMobile, setShowAvatarDropdownMobile] =
    useState(false);
  const avatarDropdownRefMobile = useRef<HTMLLIElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseLoginModal = () => {
    setOpenModal(false);
  };
  const handleToggleAvatarDropdownMobile = () => {
    setShowAvatarDropdownMobile(!showAvatarDropdownMobile);
  };

  const handleClickOutsideMobile = (event: MouseEvent) => {
    if (
      avatarDropdownRefMobile.current &&
      !avatarDropdownRefMobile.current.contains(event.target as Node)
    ) {
      setShowAvatarDropdownMobile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobile);
    };
  }, []);

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full items-center bg-white border-t border-gray-200 shadow-md z-20 md:hidden">
        <ul className="flex justify-around items-center h-16">
          <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600 hover:bg-blue-100 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow">
            <Link href="/" className="flex flex-col items-center">
              <AiFillHome className="text-xl transform hover:scale-110 transition-transform duration-300" />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600 hover:bg-blue-100 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow">
            <span className="flex flex-col items-center">
              <AiOutlineMenu className="text-xl transform hover:scale-110 transition-transform duration-300" />
              <span className="text-xs mt-1">Collections</span>
            </span>
          </li>
          <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600 hover:bg-blue-100 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow">
            <Link href="/Cart" className="flex flex-col items-center">
              <BsHandbag className="text-xl transform hover:scale-110 transition-transform duration-300" />
              <span className="text-xs mt-1">Cart</span>
            </Link>
          </li>
          <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600 hover:bg-blue-100 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow">
            <span className="flex flex-col items-center">
              <AiOutlineHeart className="text-xl transform hover:scale-110 transition-transform duration-300" />
              <span className="text-xs mt-1">Wishlist</span>
            </span>
          </li>
          <li
            className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600 hover:bg-blue-100 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow"
            ref={avatarDropdownRefMobile}
          >
            {!user || Object.keys(user).length === 0 ? (
              <div className="flex flex-col items-center">
                <FiUser
                  onClick={() => setOpenModal(true)}
                  className="text-xl hover:text-purple-600 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                />
                <span className="text-xs mt-1">Login</span>
              </div>
            ) : (
              <Avatar
                src={fullPath}
                alt="User Avatar"
                onClick={handleToggleAvatarDropdownMobile}
                className="cursor-pointer transform hover:scale-110 transition-transform duration-300"
              />
            )}

            {showAvatarDropdownMobile && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white border border-gray-200 rounded shadow-md z-50 text-black">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold">
                    {user?.FullName || "Người dùng"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.Email || "example@email.com"}
                  </p>
                </div>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/Profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Cart"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Lịch sử giao hàng
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => dispatch(setUser({} as UserProfile))}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
          {openModal && (
            <LoginModal isOpen={openModal} closeModal={handleCloseLoginModal} />
          )}
        </ul>
      </nav>
    </>
  );
};

export default BottomNav;
