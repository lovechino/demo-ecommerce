"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/Redux/hook";
import { ProductType } from "@/Utils/type";
import Fuse from "fuse.js";
import Image from "next/image";
import { baseURL } from "@/Utils/Axios";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [showScrollTop, setShowScrollTop] = useState(false);

  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const productList = useAppSelector((state) => state.product.list);
  const [results, setResults] = useState<ProductType[]>([]);

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

  useEffect(() => {
    if (query && productList.length > 0) {
      const fuse = new Fuse(productList, {
        keys: ["productname"],
        threshold: 0.4,
        distance: 100,
        minMatchCharLength: 2,
      });

      const searchResults = fuse.search(query).map((res: { item: ProductType }) => res.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, productList]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Kết quả tìm kiếm cho: <span className="text-red-600">&ldquo;{query}&rdquo;</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((item) => (
            <Link
              key={item.id}
              href={`/Product/${item.productcode}`}
              className="group border border-gray-200 hover:border-gray-400 rounded-lg p-2 shadow-sm hover:shadow-lg transform hover:scale-[1.03] transition-transform duration-300 ease-in-out hover:backdrop-blur-sm"
            >
              <Image
                src={`${baseURL}${item.pathimg}`}
                alt={item.productname}
                width={200}
                height={200}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-sm font-medium mt-2 line-clamp-2">
                {item.productname}
              </h2>
              <p className="text-red-600 font-semibold mt-1">{formatCurrency(item.Price)}đ</p>
            </Link>
          ))}
        </div>
      )}
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

export default SearchPage;
