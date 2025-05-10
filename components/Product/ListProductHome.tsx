"use client";

import { useEffect, useState } from "react";
import { GetListGroupProduct, GetListProductByGroup } from "@/Apis/Product";
import CardProduct from "./Card";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowUp } from "react-icons/fa";
import { Menu, ProductType } from "@/Utils/type";

const SCROLL_AMOUNT = 400; // pixel khi b?m nút
const ListProductHome = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [groupProducts, setGroupProducts] = useState<{
    [key: string]: ProductType[];
  }>({});
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMoreFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-left ml-5 md:text-left">
                {group.Name}
              </h2>
              <div
                className="flex flex-wrap gap-1 justify-center md:justify-start relative"
                ref={dropdownRef}
              >
                {/* Show first 4 filters on mobile */}
                {filterOptions.slice(0, 4).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedFilter(opt.value)}
                    className={`px-3 py-1 border border-gray-300 rounded-full text-xs font-medium whitespace-nowrap transition duration-200
                      hover:bg-blue-500 hover:text-white hover:font-bold active:bg-blue-500 active:text-white active:font-bold
                      ${selectedFilter === opt.value ? "bg-blue-500 text-white font-bold" : ""}
                    `}
                  >
                    {opt.label}
                  </button>
                ))}

                {/* More Filters button for mobile */}
                <button
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                  className="md:hidden px-3 py-1 border border-gray-300 rounded-full text-xs font-medium whitespace-nowrap hover:bg-blue-500 hover:text-white hover:font-bold active:bg-blue-500 active:text-white active:font-bold transition duration-200"
                >
                  More Filters
                </button>

                {/* Dropdown menu for mobile */}
                <div
                  className={`md:hidden absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48 transition-all duration-200 ${
                    showMoreFilters
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  {filterOptions.slice(4).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSelectedFilter(opt.value);
                        setShowMoreFilters(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors
                        hover:bg-gray-100 active:bg-gray-200
                        ${selectedFilter === opt.value ? "bg-blue-500 text-white font-bold" : ""}
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Show all filters on desktop */}
                <div className="hidden md:flex flex-wrap gap-1">
                  {filterOptions.slice(4).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedFilter(opt.value)}
                      className={`px-3 py-1 border border-gray-300 rounded-full text-xs font-medium whitespace-nowrap transition duration-200
                        hover:bg-blue-500 hover:text-white hover:font-bold active:bg-blue-500 active:text-white active:font-bold
                        ${selectedFilter === opt.value ? "bg-blue-500 text-white font-bold" : ""}
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
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

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed z-50 bg-gray-400 text-white p-3 rounded-full shadow-lg
          transition-all duration-300 hover:bg-gray-500
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          md:bottom-8 md:right-8
          bottom-20 right-4
        `}
        style={{ zIndex: 100 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
};

export default ListProductHome;
