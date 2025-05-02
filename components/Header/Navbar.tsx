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
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <div className="text-2xl font-bold text-gray-800">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              className="h-10 w-auto"
            />
          </div>
        </Link>
        {/* <!-- Danh mục & Địa điểm --> */}
        <div className="flex space-x-2">
          {/* <!-- Danh mục --> */}
          <div className="relative">
            <button
              id="menu-btn"
              className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded-md flex items-center space-x-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>Danh mục</span>
            </button>
            {/* <!-- Dropdown Danh mục --> */}
            <div
              id="menu-dropdown"
              className="absolute mt-1 hidden bg-white text-black rounded-md shadow-lg w-48 z-10"
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

          {/* <!-- Vị trí --> */}
          <div className="relative">
            <button className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded-md flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
              </svg>
              <div className="flex flex-col items-start text-left leading-tight">
                <span className="text-xs">Xem giá tại</span>
                <span className="font-semibold">Hồ Chí Minh</span>
              </div>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* <!-- Dropdown Tỉnh Thành --> */}
            <div
              className="absolute mt-1 hidden bg-white text-black rounded-md shadow-lg w-48 z-10"
              id="city-dropdown"
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

        {/* Navigation */}
        {/* <nav className="hidden text-white md:flex items-center space-x-6 text-sm text-gray-700">
          <Link href="/Product" className="text-xl hover:text-gray-900">
            Products
          </Link>
          <a href="#" className="text-xl hover:text-gray-900">
            Blog
          </a>
          <a href="#" className="text-xl hover:text-gray-900">
            Contacts
          </a>
        </nav> */}

        {/* Search and Icons */}
        <div className="flex items-center text-white space-x-4">
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
          {/* <!-- Liên hệ, vị trí, giao hàng, giỏ hàng --> */}
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 8c0-1.1.9-2 2-2h2l3.6 7.59-1.35 2.45A1.99 1.99 0 0 0 8 18h12v-2H8.42c-.14 0-.25-.11-.25-.25l.03-.12L9.1 14h7.45c.75 0 1.41-.41 1.75-1.03L23 4H6" />
            </svg>
            <a href="#">
              <p>Hotline</p>
              <p>0922306268 - 0928206268 </p>
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <span>Cửa hàng</span>
          </div>

          {/* Cart */}
          <Link href="/Cart">
            <Badge count={storea.length} size="small" color="#f5222d">
              <BsBag className="text-xl text-gray-700 hover:text-gray-900 cursor-pointer" />
            </Badge>
          </Link>

          {/* User / Avatar */}
          {user === null ? (
            <FiUser
              onClick={() => setShowModal(true)}
              className="text-xl hover:text-gray-900 cursor-pointer"
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
                      <button
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        // onClick={handleLogout} // Thêm sau nếu cần
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

        {/* Modal Login */}
        {showModal && (
          <ModalAuth isOpen={showModal} closeModal={handleCloseModal} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
