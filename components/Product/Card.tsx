"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";


interface CardProps {
  id: number;
  productname: string;
  Price: number;
  pathimg: string;
  productCode: string;
  discount?: string;
  
}

const baseURL = "https://backend.smartwork.3i.com.vn";

const CardProduct: React.FC<CardProps> = ({
  id,
  productname,
  Price,
  pathimg,
  productCode,
  discount = "31%",
 
 
}) => {
  const fullPath = `${baseURL}${pathimg}`;


  return (
    <div key={id} className="bg-white rounded-xl border border-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="relative">
        {discount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            Giảm {discount}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-md border border-blue-200 z-10">
          Trả góp 0%
        </div>
        <Link href={`/Product/${productCode}`}> 
          <div className="flex items-center justify-center bg-white" style={{minHeight: '160px', height: '180px'}}>
            <Image
              src={fullPath}
              alt={productname}
              width={160}
              height={160}
              className="object-contain max-h-36 w-auto h-auto"
            />
          </div>
        </Link>
      </div>
      <div className="p-3 flex flex-col gap-1 h-[220px]">
        <h3 className="text-sm font-semibold line-clamp-2 h-10 mb-1">{productname}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-red-600 font-bold text-lg">{Price?.toLocaleString("vi-VN")}đ</span>
          <span className="text-gray-400 text-xs line-through">34.990.000đ</span>
        </div>
        <div className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1 mb-1">Smember giảm thêm đến <span className="text-red-500 font-semibold">304.000đ</span></div>
        <div className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1 mb-1">Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng</div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <AiFillStar key={star} className="w-4 h-4 text-yellow-400" />
            ))}
          </div>
          <button className="flex items-center text-xs text-gray-500 hover:text-pink-500 transition">
            <span className="mr-1">Yêu thích</span>
            <AiOutlineHeart className="w-4 h-4" />
          </button>
        </div>
        {/* Nút mua ngay */}
        <button
          className="mt-3 w-full flex items-center justify-center gap-2 text-white font-semibold text-lg py-2 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 transition-all shadow-md"
        >
          Mua ngay
          <AiOutlineShoppingCart className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
