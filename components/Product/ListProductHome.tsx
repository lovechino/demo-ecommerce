"use client";

import { useEffect, useState } from "react";
import { GetListGroupProduct, GetListProductByGroup } from "@/Apis/Product";
import CardProduct from "./Card";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Menu, ProductType } from "@/Utils/type";

const SCROLL_AMOUNT = 400; // pixel khi b?m nút
const ListProductHome = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [groupProducts, setGroupProducts] = useState<{
    [key: string]: ProductType[];
  }>({});

  const filterOptions = [
    { label: "All", value: "" },
    { label: "iPhone", value: "iphone" },
    { label: "Samsung", value: "samsung" },
    { label: "Xiaomi", value: "xiaomi" },
    { label: "Nokia", value: "nokia" },
    { label: "Oppo", value: "oppo" },
    { label: "Vivo", value: "vivo" },
    { label: "Realme", value: "realme" },
    { label: "Asus", value: "asus" },
    { label: "Honor", value: "honor" },
    { label: "Tecno", value: "tecno" },
  ];
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // const scrollLeft = (code: string) => {
  //   const ref = scrollRefs.current[code];
  //   if (ref) ref.scrollBy({ left: -400, behavior: "smooth" });
  // };

  // const scrollRight = (code: string) => {
  //   const ref = scrollRefs.current[code];
  //   if (ref) ref.scrollBy({ left: 400, behavior: "smooth" });
  // };
  const handleScroll = (code: string, direction: "left" | "right") => {
    const ref = scrollRefs.current[code];
    if (ref) {
      const scrollWidth = ref.scrollWidth;
      const scrollLeft = ref.scrollLeft;
      const clientWidth = ref.clientWidth;

      // Ki?m tra cu?n t?i cu?i ho?c d?u
      if (direction === "right" && scrollLeft + clientWidth >= scrollWidth) {
        // N?u cu?n t?i cu?i thì chuy?n s?n ph?m d?u vào cu?i
        ref.scrollLeft = 0; // Cu?n l?i d?u
      } else if (direction === "left" && scrollLeft === 0) {
        // N?u cu?n t?i d?u thì chuy?n s?n ph?m cu?i vào d?u
        ref.scrollLeft = scrollWidth; // Cu?n t?i cu?i
      } else {
        // Cu?n bình thu?ng
        ref.scrollBy({
          left: direction === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
          behavior: "smooth",
        });
      }
    }
  };
  useEffect(() => {
    const fetchMenuAndProducts = async () => {
      const menuList = await GetListGroupProduct();
      const pages: { [key: string]: number } = {};
      setMenu(menuList);
      // L?y s?n ph?m cho t?ng menu
      const productsByGroup: { [key: string]: ProductType[] } = {};
      for (const m of menuList) {
        const products = await GetListProductByGroup(m.Code);
        productsByGroup[m.Code] = products || [];
        pages[m.Code] = 1;
      }
      setGroupProducts(productsByGroup);
    };
    fetchMenuAndProducts();
  }, []);
  console.log(menu);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center px-2 py-6">
      <style jsx>{`
        .scroll-container {
          overflow-x: auto;
          scrollbar-width: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {menu.map((group) => {
        const products = groupProducts[group.Code] || [];
        if (products.length === 0) return null;

        return (
          <div key={group.Code} className="mb-8 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 md:gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">
                {group.Name}
              </h2>
              <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className="px-3 py-1 border border-gray-300 rounded-full text-xs font-medium whitespace-nowrap hover:bg-blue-500 hover:text-white hover:font-bold transition duration-200"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => handleScroll(group.Code, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition"
              >
                <FaChevronLeft size={14} className="text-gray-700" />
              </button>

              <div
                className="flex space-x-3 pb-2 scroll-container scroll-smooth"
                ref={(el) => {
                  if (el) scrollRefs.current[group.Code] = el;
                }}
              >
                {products.map((item: ProductType) => (
                  <div key={item.id} className="flex-none w-52">
                    <CardProduct
                      productname={item.productname}
                      id={item.id}
                      Price={item.Price}
                      pathimg={item.pathimg}
                      productCode={item.productcode}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleScroll(group.Code, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition"
              >
                <FaChevronRight size={14} className="text-gray-700" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListProductHome;
