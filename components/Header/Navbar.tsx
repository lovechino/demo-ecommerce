"use client";
import { useState, useEffect, useRef } from "react";
import { BsBag } from "react-icons/bs";
import { FiLoader, FiSearch, FiUpload, FiUser } from "react-icons/fi";
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
import Fuse from "fuse.js";

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
  const productList = useAppSelector((state) => state.product.list);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedProvince, setSelectedProvince] = useState("Hà Nội");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  // ✅ Cấu hình Fuse.js
  const fuse = new Fuse(productList, {
    keys: ["productname"],
    threshold: 0.4,
    distance: 100,
    minMatchCharLength: 2,
  });

  // ✅ Tìm kiếm gần đúng
  const FetchSuggestions = (text: string) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(text).map((res: any) => res.item);
    setSuggestions(results);
  };

  useEffect(() => {
    if (query) {
      FetchSuggestions(query);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

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
    <header className="bg-[#e60012] py-2 w-full shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2 px-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center mr-2">
          <Image
            src={logo}
            alt="Logo Komex Digital"
            width={120}
            height={40}
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Ô tìm kiếm */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 w-full max-w-xl">
            <div className="hidden md:flex bg-[#d32f2f] hover:bg-[#e53935] text-white px-4 py-2 rounded-xl items-center gap-2 font-medium">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"
                  stroke="white"
                />
              </svg>
              <span>
                Gọi mua hàng <b>1800.2097</b>
              </span>
            </div>
            <div className="relative flex-1" ref={searchDropdownRef}>
              <input
                type="text"
                placeholder="Bạn cần tìm gì?"
                className="w-full px-4 py-2 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
                <FiSearch />
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
          </div>
        </div>

        {/* Các biểu tượng bên phải */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:flex flex-row items-center gap-2">
            <button className="bg-[#d32f2f] hover:bg-[#e53935] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
              Cửa hàng gần bạn
            </button>
            <button className="bg-[#d32f2f] hover:bg-[#e53935] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor">
                <rect
                  x="2"
                  y="7"
                  width="20"
                  height="10"
                  rx="2"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
              Tra cứu đơn hàng
            </button>
          </div>
          {/* Vị trí dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="bg-[#d32f2f] hover:bg-[#e53935] px-4 py-2 rounded-xl flex items-center gap-1 text-white text-sm font-medium"
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
            <Badge count={storea.length} size="small" color="#f5222d">
              <BsBag className="text-xl text-white hover:text-gray-200 cursor-pointer" />
            </Badge>
          </Link>

          {/* User Avatar */}
          {!user || Object.keys(user).length === 0 ? (
            <FiUser
              size={30}
              onClick={() => setShowModal(true)}
              className="text-xl text-white hover:text-gray-200 cursor-pointer bg-[#d32f2f] rounded-xl p-2 ml-2"
            />
          ) : (
            <div className="relative" ref={avatarDropdownRef}>
              <div
                onClick={() => setShowAvatarDropdown((prev) => !prev)}
                className="cursor-pointer bg-[#d32f2f] rounded-xl p-1 ml-2"
              >
                <Avatar size={30} src={fullPath} alt="User Avatar" />
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
