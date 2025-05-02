"use client";
import { useState, useEffect, useRef } from "react";
import { BsBag } from "react-icons/bs";
import { FiLoader, FiSearch, FiUser } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/Redux/hook";
import { baseURL } from "@/Utils/Axios";
import { Avatar, Badge } from "antd";
import { ProductType, UserProfile } from "@/Utils/type";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Image/komex-digital-logo_a39f6b3a05934b128b6b2e4e11ee89e1.webp";

const ModalAuth = dynamic(() => import("../Modal/Login"), {
  loading: () => <FiLoader className="animate-spin text-blue-500 text-2xl" />,
});

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const storea = useAppSelector((state) => state.cart.items);
  const user: UserProfile =
    useAppSelector((state) => state.user.user) || ({} as UserProfile);
  const fullPath = `${baseURL}${user?.Photo}`;
  const productList = useAppSelector((state) => state.product.listProduct);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);

  const fetchSuggestions = async (text: string) => {
    if (!text.trim()) return setSuggestions([]);
    setSuggestions(productList);
  };

  useEffect(() => {
    if (query) {
      fetchSuggestions(query);
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

  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  return (
    <header className="bg-red-500 py-4 shadow-sm">
      <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            className="h-10 w-auto"
          />
        </Link>

        {/* Danh mục & Vị trí */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <button
              onClick={() => setShowMenuDropdown(!showMenuDropdown)}
              className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded-md flex items-center gap-1 text-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>Danh mục</span>
            </button>
            <div
              className={`absolute mt-1 ${
                showMenuDropdown ? "" : "hidden"
              } bg-white text-black rounded-md shadow-lg w-48 z-10`}
            >
              <ul>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Điện thoại
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Laptop
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Máy tính bảng
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Phụ kiện
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded-md flex items-center gap-2 text-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs leading-none">Xem giá tại</span>
                <span className="font-semibold text-sm leading-none">
                  Hồ Chí Minh
                </span>
              </div>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`absolute mt-1 ${
                showCityDropdown ? "" : "hidden"
              } bg-white text-black rounded-md shadow-lg w-48 z-10`}
            >
              <input
                type="text"
                placeholder="Nhập tỉnh/thành"
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
              />
              <ul className="max-h-48 overflow-y-auto">
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Hà Nội
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Đà Nẵng
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Cần Thơ
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Huế
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-64" ref={searchDropdownRef}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full mt-1 z-50 w-full bg-white border border-gray-200 rounded shadow-lg max-h-96 overflow-y-auto">
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
                    width={50}
                    height={50}
                    className="mr-2 rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">
                      {item?.productname}
                    </p>
                    <div className="text-xs text-gray-600">
                      <span className="text-red-500 font-semibold">
                        {item?.Price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-white">
          <div className="text-xs text-left">
            <p className="font-bold">Hotline</p>
            <p>0922306268 - 0928206268</p>
          </div>

          {/* Cửa hàng gần bạn */}
          <div className="relative">
            <button
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
              className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded-md flex items-center gap-2 text-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm2 5h10M7 12h10M7 16h6"
                />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[10px] leading-none">
                  Cửa hàng gần bạn
                </span>
                <span className="text-[13px] font-semibold leading-none">
                  123 Lê Lợi, Quận 1
                </span>
              </div>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`absolute top-full left-0 mt-1 w-64 bg-white text-black rounded-md shadow-lg z-10 ${
                showStoreDropdown ? "" : "hidden"
              }`}
            >
              <input
                type="text"
                placeholder="Tìm cửa hàng"
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
              />
              <ul className="max-h-48 overflow-y-auto">
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  123 Lê Lợi, Quận 1
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  456 Nguyễn Huệ, Quận 1
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  789 Trần Hưng Đạo, Quận 5
                </li>
              </ul>
            </div>
          </div>

          <Link href="/Cart">
            <Badge count={storea.length} size="small" color="#f5222d">
              <BsBag className="text-xl text-white hover:text-gray-200 cursor-pointer" />
            </Badge>
          </Link>

          {user === null ? (
            <FiUser
              onClick={() => setShowModal(true)}
              className="text-xl hover:text-gray-200 cursor-pointer"
              color="white"
            />
          ) : (
            <div className="relative" ref={avatarDropdownRef}>
              <div
                onClick={() => setShowAvatarDropdown((prev) => !prev)}
                className="cursor-pointer"
              >
                <Avatar src={fullPath} alt="User Avatar" />
              </div>
              {showAvatarDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-md z-50 text-black">
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
                      <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {showModal && (
          <ModalAuth isOpen={showModal} closeModal={handleCloseModal} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
