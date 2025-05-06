"use client";
import Image from "next/image";
import Link from "next/link";

import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { baseURL } from "@/Utils/Axios";
import { useEffect, useState } from "react";
import { GetAllProduct, GetListGroupProduct } from "@/Apis/Product";
import { Menu } from "@/Utils/type";

export default function Hero() {
  GetAllProduct();
  const product = useSelector((state: RootState) => state.product.list);
  const products = product?.slice(1, 6);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetListGroupProduct();
      setMenu(response);
    };
    fetchData();
  }, [menu]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-row md:flex-row gap-4">
        {/* Sidebar categories */}
        <div className="hidden md:block w-full md:w-1/5 overflow-hidden border-white">
          <div className="bg-white p-3 font-medium text-gray-700 border-b border-white rounded-t-md">
            Danh mục sản phẩm
          </div>
          <ul className="bg-white rounded-b-md shadow-md border-white">
            {menu ? (
              menu?.map((category, index) => (
                <Link key={index} href={`/Menu/${category.Code}`}>
                  <li>
                    <div className="flex items-center justify-between p-3 hover:bg-blue-50 transition-colors duration-150 cursor-pointer">
                      <div className="flex items-center gap-3">
                        {/* Có thể thêm icon ở đây nếu muốn */}
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
              <div>Đang load menu</div>
            )}
          </ul>
        </div>

        {/* Main banner */}
        <div className="w-full md:w-3/5 flex flex-col gap-4">
          {/* Main Samsung banner */}
          <div className="border border-white rounded-md overflow-hidden mb-0 ">
            <div className="relative p-1 md:p-2">
              <div className="flex flex-col md:flex-row">
                {/* Ảnh sản phẩm lớn với thông tin đè lên */}
                {products && products[selectedProductIndex] && (
                  <div className="relative w-full aspect-[4/2] md:aspect-[4/2] flex items-center justify-center">
                    <Link
                      href={`/Product/${products[selectedProductIndex].productcode}`}
                    >
                      <Image
                        src={`${baseURL}${products[selectedProductIndex].pathimg}`}
                        alt={products[selectedProductIndex].productname}
                        fill
                        className="object-contain w-full h-full cursor-pointer"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Product categories row - luôn ở dưới main banner */}
          <div className="mt-3">
            <div className="hidden md:grid md:grid-cols-5 gap-2">
              {products &&
                products?.length > 0 &&
                products?.map((product, index) => (
                  <button
                    key={index}
                    className={`border border-white rounded-md p-2 text-center hover:shadow-md transition-shadow bg-white flex flex-col justify-between ${
                      selectedProductIndex === index
                        ? "ring-2 ring-blue-400"
                        : ""
                    }`}
                    onClick={() => setSelectedProductIndex(index)}
                  >
                    <div className="text-sm font-medium mb-1">
                      <span className="block text-xs md:text-sm font-medium truncate max-w-full">
                        {product.productname}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
            {/* Dots navigation for mobile */}
            <div className="md:hidden flex justify-center gap-2 mt-2">
              {products &&
                products?.length > 0 &&
                products?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedProductIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      selectedProductIndex === index
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Right banners */}
        {/* w-full md:w-1/5 flex flex-col gap-4 border-white */}
        <div className=" hidden md:flex md:flex-col md:gap-4 w-full md:w-1/5 border-white">
          {/* iPad Air banner */}
          {product && product?.length > 1 && (
            <div className="bg-pink-100 rounded-md p-4 flex flex-col items-center shadow-md border border-white">
              <Link href={`/Product/${product[1].productcode}`}>
                <Image
                  src={`${baseURL}${product[1].pathimg}`}
                  alt={product[1].productname}
                  width={100}
                  height={100}
                  className="rounded-lg object-contain mb-2 cursor-pointer"
                />
              </Link>
            </div>
          )}
          {/* Laptop/banner khác */}
          {product && product?.length > 8 && (
            <div className="bg-green-100 rounded-md p-4 flex flex-col items-center shadow-md border border-white">
              <Image
                src={`${baseURL}${product[8].pathimg}`}
                alt={product[8].productname}
                width={100}
                height={100}
                className="rounded-lg object-contain mb-2"
              />
            </div>
          )}
          {product && product?.length > 8 && (
            <div className="bg-green-100 rounded-md p-4 flex flex-col items-center shadow-md border border-white">
              <Link href={`/Product/${product[9].productcode}`}>
                <Image
                  src={`${baseURL}${product[9].pathimg}`}
                  alt={product[9].productname}
                  width={100}
                  height={100}
                  className="rounded-lg object-contain mb-2 cursor-pointer"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
