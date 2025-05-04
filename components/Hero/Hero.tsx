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
    <main className=" max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-row md:flex-row gap-4">
        {/* Left sidebar categories */}
        <div className="w-1/3  md:w-1/5  overflow-hidden">
          <div className="bg-gray-50 p-3 font-medium text-gray-700 border-b">
            Danh mục sản phẩm
          </div>
          <ul className="">
            {menu ? (
               menu?.map((category, index) => (
                <Link key={index} href={`/Menu/${category.Code}`}>
                  <li>
                  <div className="flex items-center justify-between p-3 hover:bg-blue-50 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center gap-3">
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
            )
            }
          </ul>
        </div>

        {/* Main content area */}
        <div className="w-2/3 md:w-4/5">
          {/* Main Samsung banner */}
          <div className="border rounded-md overflow-hidden mb-4">
            <div className="relative bg-[#f5f7ff] p-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5">
                  {product && product?.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={`${baseURL}${product[0]?.pathimg}`}
                          alt="Samsung"
                          width={100}
                          height={20}
                          className="h-5 w-auto"
                        />
                        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          12GB | 256GB
                        </div>
                        <div className="text-xs">Màu xanh dương</div>
                      </div>

                      <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {product[0]?.productname}
                      </h1>
                    </div>
                  )}

                  <div className="bg-white rounded-lg p-3 mb-3 inline-block">
                    <div className="text-sm text-gray-500">Giá chỉ còn</div>
                    <div className="text-xl font-bold">
                      28.990.000<sup>đ</sup>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-800 text-white rounded-lg p-3">
                      <div className="text-sm">Lên đời trợ giá</div>
                      <div className="text-xl font-bold">
                        3<span className="text-sm">triệu</span>
                      </div>
                    </div>
                    <div className="bg-blue-800 text-white rounded-lg p-3">
                      <div className="text-sm">VnPay ưu đãi</div>
                      <div className="text-xl font-bold">
                        500<span className="text-sm">k</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 rounded-lg p-3 flex-1">
                      <div className="text-sm">Bảo hành mở rộng</div>
                      <div className="text-xl font-bold">
                        12<span className="text-sm">tháng</span>
                      </div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 flex-1">
                      <div className="text-sm">Trả góp</div>
                      <div className="text-xl font-bold">
                        0<span className="text-sm">%</span>
                      </div>
                      <div className="text-xs">trả trước từ 0%</div>
                    </div>
                  </div>

                  <button className="bg-blue-800 text-white py-2 px-6 rounded-md font-medium">
                    MUA NGAY
                  </button>
                </div>
                {product && product?.length > 0 && (
                  <div className="md:w-2/5 flex justify-center items-center mt-4 md:mt-0">
                    <Image
                      src={`${baseURL}${product[0].pathimg}`}
                      alt="Samsung Galaxy S25 Ultra"
                      width={300}
                      height={400}
                      className="h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product categories */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {products &&
              products?.length > 0 &&
              products?.map((product, index) => (
                <Link
                  href="#"
                  key={index}
                  className="border rounded-md p-2 text-center hover:shadow-md transition-shadow"
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

          {/* iPad Air banner */}
          {product && product?.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-pink-100 rounded-md p-4 flex flex-col items-center">
                <div className="text-xl font-medium mb-2">
                  {product[1].productname}
                </div>
                <div className="text-sm mb-3">{product[1].supName}</div>
                <button className="bg-white text-xs rounded-full px-4 py-1 border">
                  Mua ngay
                </button>
              </div>

              <div className="bg-green-100 rounded-md p-4 flex flex-col items-center">
                <div className="text-xl font-medium mb-2">
                  {product[8].productname}
                </div>
                <div className="text-sm mb-3">{product[8].material}</div>
                <button className="bg-white text-xs rounded-full px-4 py-1 border">
                  MUA NGAY
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}