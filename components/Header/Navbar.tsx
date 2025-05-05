"use client";
import { useState, useEffect, useRef } from "react";
import { BsBag } from "react-icons/bs";
import { FiLoader, FiSearch, FiUser } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { baseURL } from "@/Utils/Axios";
import { Avatar, Badge } from "antd";
import { ProductType, UserProfile } from "@/Utils/type";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Image/komex-digital-logo_a39f6b3a05934b128b6b2e4e11ee89e1.webp";
import { setUser } from "@/Redux/auth";
import ProvinceSelectorModal from "./ProvinceSelectorModal";


const ModalAuth = dynamic(() => import("../Modal/Login"), {
  loading: () => <FiLoader className="animate-spin text-blue-500 text-2xl" />,
});

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const storea = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const fullPath = `${baseURL}${user?.Photo}`;
  const productList = useAppSelector((state) => state.product.list)
 
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedProvince, setSelectedProvince] = useState("Hà Nội");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  const FetchSuggestions = async (text: string) => {
    if (!text.trim()) return setSuggestions([]);
    setSuggestions(productList);
  };
  
  useEffect(() => {
    if (query) {
      FetchSuggestions(query);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, FetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }

      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAvatarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-red-500 py-3 shadow-md sticky top-0 z-10">
      <div className="  container mx-auto px-4 md:px-6 grid grid-flow-col justify-items-center  gap-3 md:gap-4 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex justify-center items-center">
          <Image
            src={logo}
            alt="Logo Komex Digital"
            width={80}
            height={80}
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Ô tìm kiếm */}
        <div className="w-full flex flex-row items-center">
  <div className="relative w-3/4 gap-3">
    <div ref={searchDropdownRef} >
    <input
      type="text"
      placeholder="Tìm sản phẩm..."
      className="w-full px-3 py-2 border border-red-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white bg-red-300"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={() => setShowDropdown(true)}
      
    />
    <div className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
      <FiSearch />
    </div>
    </div>

    {showDropdown && suggestions.length > 0 && (
      <div className="absolute top-full left-0 mt-1 z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto">
        <div className="px-4 py-2 text-gray-500 text-sm border-b">
          Sản phẩm gợi ý
        </div>
        {suggestions.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <Image
              src={`${baseURL}${item?.pathimg}`}
              alt={item?.productname}
              width={40}
              height={40}
              className="mr-2 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">
                {item?.productname}
              </p>
              <p className="text-xs text-gray-600">
                <span className="text-red-500 font-semibold">
                  {item?.Price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  <div className=" text-white p-2 ml-10">
   
    <div>
      <p className=" hidden md:block">Gọi mua hàng</p>
      <span className="">1800.2097</span>
    </div>
  </div>
</div>

        {/* Các biểu tượng và dropdown bên phải */}
        <div className="flex items-center gap-2 md:gap-3">
          {" "}
          {/* Giảm gap cho mobile */}
          {/* Vị trí dropdown (chỉ hiển thị trên desktop) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="bg-red-600 hover:bg-red-400 px-3 py-2 rounded-md flex items-center gap-1 text-white text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
              </svg>
              <span className="font-semibold">{selectedProvince}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <ProvinceSelectorModal
              open={showCityDropdown}
              selectedProvince={selectedProvince}
              onOpenChange={setShowCityDropdown}
              onSelectProvince={setSelectedProvince}
            />
          </div>
          {/* Giỏ hàng */}
          <Link href="/Cart" className="flex-shrink-0 relative">
            {" "}
            {/* Thêm relative để định vị badge */}
            <Badge count={storea.length} size="small" color="#f5222d">
              <BsBag className="text-xl text-white hover:text-gray-200 cursor-pointer" />
            </Badge>
          </Link>
          {/* User Avatar */}
          {!user || Object.keys(user).length === 0 ? (
            <FiUser
              onClick={() => setShowModal(true)}
              className="text-xl text-white hover:text-gray-200 cursor-pointer"
            />
          ) : (
            <div className="relative" ref={avatarDropdownRef}>
              <div
                onClick={() => setShowAvatarDropdown((prev) => !prev)}
                className="cursor-pointer"
              >
                <Avatar size="small" src={fullPath} alt="User Avatar" />{" "}
                {/* Sử dụng size small */}
              </div>
              {showAvatarDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-md z-50 text-black text-sm">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">
                      {user?.FullName || "Người dùng"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {user?.Email || "example@email.com"}
                    </p>
                  </div>
                  <ul className="py-2 text-gray-700">
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
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ModalAuth isOpen={showModal} closeModal={handleCloseModal} />
      )}
    </header>
  );
};

export default Navbar;
