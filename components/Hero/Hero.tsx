"use client";
import Image from "next/image";
import Link from "next/link";

import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { baseURL } from "@/Utils/Axios";
import { useEffect, useState } from "react";
import { GetListGroupProduct } from "@/Apis/Product";
import { Menu } from "@/Utils/type";

export default function Hero() {
  const product = useSelector((state: RootState) => state.product.list);
  const products = product?.slice(1, 6);
  const [menu, setMenu] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetListGroupProduct();
      setMenu(response);
    };
    fetchData();
  }, [menu]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar categories */}
        <div className="w-full md:w-1/5 overflow-hidden">
          <div className="bg-white p-3 font-medium text-gray-700 border-b rounded-t-md">
            Danh mục sản phẩm
          </div>
          <ul className="bg-white rounded-b-md shadow-md">
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
          <div className="border rounded-md overflow-hidden mb-0 bg-[#e6f4f1]">
            <div className="relative p-1 md:p-2">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 flex flex-col justify-center gap-1">
                  {product && product?.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Image
                          src={`${baseURL}${product[0]?.pathimg}`}
                          alt="Samsung"
                          width={60}
                          height={12}
                          className="h-3 w-auto"
                        />
                        <div className="bg-blue-100 text-blue-800 text-[10px] px-1 py-0.5 rounded-full">
                          12GB | 256GB
                        </div>
                        <div className="text-[10px]">Màu xanh dương</div>
                      </div>
                      <h1 className="text-lg md:text-xl font-bold mb-1">
                        {product[0]?.productname}
                      </h1>
                    </div>
                  )}
                  <div className="bg-white rounded-lg p-1 mb-1 inline-block">
                    <div className="text-[10px] text-gray-500">Giá chỉ còn</div>
                    <div className="text-base font-bold">
                      28.990.000<sup>đ</sup>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 mb-1">
                    <div className="bg-blue-800 text-white rounded-lg p-1">
                      <div className="text-[10px]">Lên đời trợ giá</div>
                      <div className="text-base font-bold">
                        3<span className="text-[10px]">triệu</span>
                      </div>
                    </div>
                    <div className="bg-blue-800 text-white rounded-lg p-1">
                      <div className="text-[10px]">VnPay ưu đãi</div>
                      <div className="text-base font-bold">
                        500<span className="text-[10px]">k</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="bg-blue-100 rounded-lg p-1 flex-1">
                      <div className="text-[10px]">Bảo hành mở rộng</div>
                      <div className="text-base font-bold">
                        12<span className="text-[10px]">tháng</span>
                      </div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-1 flex-1">
                      <div className="text-[10px]">Trả góp</div>
                      <div className="text-base font-bold">
                        0<span className="text-[10px]">%</span>
                      </div>
                      <div className="text-[10px]">trả trước từ 0%</div>
                    </div>
                  </div>
                  <button className="bg-blue-800 text-white py-0.5 px-2 rounded-md font-medium text-xs">
                    MUA NGAY
                  </button>
                </div>
                {product && product?.length > 0 && (
                  <div className="md:w-2/5 flex justify-center items-center mt-1 md:mt-0">
                    <Image
                      src={`${baseURL}${product[0].pathimg}`}
                      alt="Samsung Galaxy S25 Ultra"
                      width={120}
                      height={160}
                      className="h-auto"
                    />
                  </div>
                )}
              </div>
              {/* Product categories row - moved inside and bottom of Main banner */}
              <div className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {products &&
                    products?.length > 0 &&
                    products?.map((product, index) => (
                      <Link
                        href="#"
                        key={index}
                        className="border rounded-md p-2 text-center hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
                      >
                        <div className="text-sm font-medium mb-1">
                          {product.productname}
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {product.producttype}
                        </div>
                        <button className="text-xs bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
                          Mua Ngay
                        </button>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right banners */}
        <div className="w-full md:w-1/5 flex flex-col gap-4">
          {/* iPad Air banner */}
          {product && product?.length > 1 && (
            <div className="bg-pink-100 rounded-md p-4 flex flex-col items-center shadow-md">
              <div className="text-xl font-medium mb-2">
                {product[1].productname}
              </div>
              <div className="text-sm mb-3">{product[1].supName}</div>
              <button className="bg-white text-xs rounded-full px-4 py-1 border">
                Mua ngay
              </button>
            </div>
          )}
          {/* Laptop/banner khác */}
          {product && product?.length > 8 && (
            <div className="bg-green-100 rounded-md p-4 flex flex-col items-center shadow-md">
              <div className="text-xl font-medium mb-2">
                {product[8].productname}
              </div>
              <div className="text-sm mb-3">{product[8].material}</div>
              <button className="bg-white text-xs rounded-full px-4 py-1 border">
                MUA NGAY
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}