"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { baseURL } from "@/Utils/Axios";
import { useEffect, useState, useCallback } from "react";
import { GetListGroupProduct } from "@/Apis/Product";
import { Menu } from "@/Utils/type";
import placeholderImg from "@/public/Image/komex-digital-logo_a39f6b3a05934b128b6b2e4e11ee89e1.webp";

export default function Hero() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const product = useSelector((state: RootState) => state.product.list);
  const products = product?.slice(1, 16) || [];

  useEffect(() => {
    if (products.length < 15) return;
    const timer = setInterval(() => {
      setSelectedProductIndex((current) => (current === 14 ? 0 : current + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [products]);

  const fetchMenu = useCallback(async () => {
    try {
      const response = await GetListGroupProduct();
      setMenu(response);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar categories */}
        <aside className="hidden md:block w-full md:w-1/5 border-white">
          <div className="bg-red-500 flex items-center gap-2 p-3 font-medium text-gray-700 border-b border-white rounded-t-md">
            <Image
              src="https://file.hstatic.net/200000713019/file/category_cc0fade29df84dbdbce905c303557980.png"
              alt="item"
              width={20}
              height={20}
              priority
            />
            <span>Danh mục sản phẩm</span>
          </div>
          <ul className="bg-white rounded-b-md shadow-md">
            {menu.length ? (
              menu.map((category, index) => (
                <Link key={index} href={`/Menu/${category.Code}`}>
                  <li>
                    <div className="flex items-center justify-between p-3 hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Image
                          src={category.Description}
                          alt="item"
                          width={20}
                          height={20}
                          priority
                        />
                        <span className="text-gray-700 text-sm">
                          {category.Name}
                        </span>
                      </div>
                      <BsChevronRight className="h-4 w-4 text-blue-400" />
                    </div>
                  </li>
                </Link>
              ))
            ) : (
              <div className="p-3">Đang load menu...</div>
            )}
          </ul>
        </aside>

        {/* Main banner */}
        <section className="w-full md:w-3/5 flex flex-col gap-4">
          <motion.div
            className="border border-white rounded-md overflow-hidden cursor-pointer"
            onClick={() =>
              (window.location.href = `/Product/${products[selectedProductIndex].productcode}`)
            }
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <motion.div className="relative p-2">
              <motion.div
                className="relative w-full aspect-[4/2] flex items-center justify-center"
                onMouseEnter={() => setShowArrows(true)}
                onMouseLeave={() => setShowArrows(false)}
              >
                {showArrows && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProductIndex((prev) =>
                        prev === 0 ? products.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-100 rounded-full p-2 shadow-md"
                    aria-label="Sản phẩm trước"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={products[selectedProductIndex]?.productcode}
                    className="w-full h-full rounded-xl border-4 border-transparent shadow-2xl shadow-blue-200/70 overflow-hidden"
                    initial={{ opacity: 0, x: 40, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.98 }}
                    transition={{ duration: 0.4, type: "tween" }}
                  >
                    <Image
                      src={
                        products[selectedProductIndex]?.pathimg
                          ? `${baseURL}${products[selectedProductIndex]?.pathimg}`
                          : placeholderImg
                      }
                      alt={
                        products[selectedProductIndex]?.productname ||
                        "Ảnh sản phẩm"
                      }
                      fill
                      priority
                      className="object-contain w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {showArrows && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProductIndex((prev) =>
                        prev === products.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-100 rounded-full p-2 shadow-md"
                    aria-label="Sản phẩm tiếp theo"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                )}

                <div className="absolute inset-0 flex flex-col items-start justify-center ml-5 mt-20">
                  <h2 className="text-xs md:text-sm font-bold text-blue-500 drop-shadow-md">
                    ĐÓN XUÂN SANG
                  </h2>
                  <h1 className="text-xs md:text-base font-extrabold text-pink-500 mb-4 drop-shadow-md">
                    DEAL RỘN RÀNG
                  </h1>
                  <div className="bg-pink-500 rounded-full px-4 py-1 mb-3 shadow-md border-3 border-white">
                    <span className="text-white text-xs md:text-sm font-bold">
                      GIẢM ĐẾN 40%
                    </span>
                  </div>
                  <div className="bg-pink-500 rounded-full px-4 py-1 mb-3 shadow-md border-3 border-white">
                    <span className="text-white text-xs md:text-sm font-bold">
                      Hàng chính hãng
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="mt-3 flex justify-center gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedProductIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  selectedProductIndex === index ? "bg-blue-500" : "bg-gray-300"
                }}
                aria-label={Chọn sản phẩm ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Right banners */}
        <aside className="hidden md:flex md:flex-col gap-4 w-full md:w-1/5">
          {[1, 8, 9].map(
            (i) =>
              product[i] && (
                <div
                  key={i}
                  className={`bg-${
                    i === 1 ? "pink" : "green"
                  }-100 rounded-md p-4 flex flex-col items-center shadow-md`}
                >
                  <Link href={`/Product/${product[i]?.productcode}`}>
                    <Image
                      src={
                        product[i]?.pathimg
                          ? `${baseURL}${product[i]?.pathimg}`
                          : placeholderImg
                      }
                      alt={product[i]?.productname || "Ảnh sản phẩm"}
                      priority
                      width={100}
                      height={100}
                      className="rounded-lg object-contain mb-2"
                    />
                  </Link>
                </div>
              )
          )}
        </aside>
      </div>
        
    </main>
  );
}
