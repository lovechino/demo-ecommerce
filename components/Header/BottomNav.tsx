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
import { setActiveItem } from "@/Redux/nav";
import dynamic from "next/dynamic";
import { UserProfile } from "@/Utils/type";

const LoginModal = dynamic(() => import("@/components/Modal/Login"), {
  ssr: false,
});

const BottomNav = () => {
  const user = useAppSelector((state) => state.user.user);
  const activeItem = useAppSelector((state) => state.nav.activeItem);
  const fullPath = `${baseURL}${user?.Photo}`;
  const dispatch = useAppDispatch();
  const [showAvatarDropdownMobile, setShowAvatarDropdownMobile] = useState(false);
  const avatarDropdownRefMobile = useRef<HTMLLIElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  const getItemStyle = (itemId: string) => {
    const isActive = activeItem === itemId;
    const isHovered = hoveredItem === itemId;
    return `flex flex-col items-center 
      ${isActive ? 'text-purple-600 bg-blue-100' : 'text-gray-600'} 
      ${isHovered ? 'text-purple-600 bg-blue-50' : ''}
      hover:text-purple-600 hover:bg-blue-50
      p-2 rounded-lg transition-all duration-300 ease-in-out 
      transform hover:scale-105
      ${isActive ? 'shadow-md' : ''}`;
  };

  const getIconStyle = (itemId: string) => {
    const isActive = activeItem === itemId;
    const isHovered = hoveredItem === itemId;
    return `text-xl transition-all duration-300 
      ${isActive ? 'text-purple-600' : ''}
      ${isHovered ? 'text-purple-600' : ''}
      hover:text-purple-600`;
  };

  const getTextStyle = (itemId: string) => {
    const isActive = activeItem === itemId;
    const isHovered = hoveredItem === itemId;
    return `text-xs mt-1 transition-all duration-300 
      ${isActive ? 'font-semibold text-purple-600' : ''}
      ${isHovered ? 'text-purple-600' : ''}
      hover:text-purple-600`;
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full items-center bg-white border-t border-gray-200 shadow-lg z-20 md:hidden backdrop-blur-sm bg-opacity-90">
        <ul className="flex justify-around items-center h-16">
          <li 
            className={getItemStyle('home')}
            onMouseEnter={() => setHoveredItem('home')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href="/" className="flex flex-col items-center" onClick={() => dispatch(setActiveItem('home'))}>
              <AiFillHome className={getIconStyle('home')} />
              <span className={getTextStyle('home')}>Home</span>
            </Link>
          </li>
          <li 
            className={getItemStyle('collections')}
            onMouseEnter={() => setHoveredItem('collections')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href="#" className="flex flex-col items-center" onClick={() => dispatch(setActiveItem('collections'))}>
              <AiOutlineMenu className={getIconStyle('collections')} />
              <span className={getTextStyle('collections')}>Collections</span>
            </Link>
          </li>
          <li 
            className={getItemStyle('cart')}
            onMouseEnter={() => setHoveredItem('cart')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href="/Cart" className="flex flex-col items-center" onClick={() => dispatch(setActiveItem('cart'))}>
              <BsHandbag className={getIconStyle('cart')} />
              <span className={getTextStyle('cart')}>Cart</span>
            </Link>
          </li>
          <li 
            className={getItemStyle('wishlist')}
            onMouseEnter={() => setHoveredItem('wishlist')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href="#" className="flex flex-col items-center" onClick={() => dispatch(setActiveItem('wishlist'))}>
              <AiOutlineHeart className={getIconStyle('wishlist')} />
              <span className={getTextStyle('wishlist')}>Wishlist</span>
            </Link>
          </li>
          <li
            className={getItemStyle('profile')}
            ref={avatarDropdownRefMobile}
            onMouseEnter={() => setHoveredItem('profile')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {!user || Object.keys(user).length === 0 ? (
              <div className="flex flex-col items-center">
                <FiUser
                  onClick={() => setOpenModal(true)}
                  className={getIconStyle('profile')}
                />
                <span className={getTextStyle('profile')}>Login</span>
              </div>
            ) : (
              <Avatar
                src={fullPath}
                alt="User Avatar"
                onClick={handleToggleAvatarDropdownMobile}
                className={`cursor-pointer transition-all duration-300 ${activeItem === 'profile' ? 'ring-2 ring-purple-500' : ''}`}
              />
            )}

            {showAvatarDropdownMobile && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 text-black animate-fadeIn">
                <div className="px-4 py-3 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                  <p className="text-sm font-semibold text-purple-700">
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
                      className="block px-4 py-2 hover:bg-purple-50 transition-colors duration-200"
                      onClick={() => dispatch(setActiveItem('profile'))}
                    >
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Cart"
                      className="block px-4 py-2 hover:bg-purple-50 transition-colors duration-200"
                      onClick={() => dispatch(setActiveItem('cart'))}
                    >
                      Lịch sử giao hàng
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        dispatch(setUser({} as UserProfile));
                        dispatch(setActiveItem('home'));
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
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
