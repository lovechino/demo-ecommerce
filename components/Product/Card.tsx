"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/Redux/hook";
import { addItem } from "@/Redux/cart";
import { CartIntemType } from "@/Utils/type";
import Link from "next/link";

interface CardProps {
  id: number;
  productname: string;
  Price: number;
  pathimg: string;
  productCode: string;
}

const baseURL = "https://backend.smartwork.3i.com.vn";

const CardProduct: React.FC<CardProps> = ({
  id,
  productname,
  Price,
  pathimg,
  productCode,
}) => {
  const fullPath = `${baseURL}${pathimg}`;
  const dispatch = useAppDispatch();

  const buyProduct = (item: CartIntemType) => {
    dispatch(
      addItem({
        id: item.id,
        productname: item.productname,
        Price: item.Price,
        pathimg: fullPath,
        qualitiy: item.qualitiy,
        maxQuantity: 10, // Example value, adjust as needed
      })
    );
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-3 w-full h-[400px] flex flex-col group overflow-hidden border hover:shadow-lg transition-all duration-200">
      {/* Label Giảm giá & Trả góp */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
          Giảm 31%
        </span>
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-semibold">
          Trả góp 0%
        </span>
      </div>

      {/* Icon Giỏ hàng */}
      <div className="absolute top-2 right-2 z-10">
        <button>
          <AiOutlineShoppingCart className="text-xl text-gray-700 hover:text-blue-500 transition" />
        </button>
      </div>

      {/* Hình ảnh sản phẩm */}
      <Link
        href={`/Product/${productCode}`}
        className="h-[250px] flex justify-center items-center overflow-hidden mb-2"
      >
        <Image
          src={fullPath}
          alt={productname}
          width={500}
          height={500}
          className="object-contain h-full transition-transform duration-200 group-hover:scale-105"
        />
      </Link>

      {/* Tên sản phẩm */}
      <p className="text-center text-sm font-medium text-gray-800 line-clamp-2 h-[40px]">
        {productname}
      </p>

      {/* Giá */}
      <p className="text-center text-lg font-bold text-red-600 mt-2">
        {Price?.toLocaleString("vi-VN")}đ
      </p>

      {/* Nút mua ngay */}
      <div
        onClick={() =>
          buyProduct({
            id,
            productname,
            Price,
            pathimg: fullPath,
            qualitiy: 1,
            maxQuantity: 10,
          })
        }
        className="mt-auto bg-blue-500 text-white w-full text-center py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
      >
        Mua Ngay
      </div>
    </div>
  );
};

export default CardProduct;
