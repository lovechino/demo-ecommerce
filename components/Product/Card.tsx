"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillStar,
  AiOutlineHeart,
} from "react-icons/ai";
import { useAppDispatch } from "@/Redux/hook";
import { addItem } from "@/Redux/cart";
import { CartIntemType } from "@/Utils/type";

interface CardProps {
  id: number;
  productname: string;
  Price: number;
  pathimg: string;
  productCode: string;
  discount?: string;
  smemberDiscount?: string;
  studentDiscount?: string;
  originalPrice?: string;
  installment?: boolean;
}

const baseURL = "https://backend.smartwork.3i.com.vn";

const CardProduct: React.FC<CardProps> = ({
  id,
  productname,
  Price,
  pathimg,
  productCode,
  discount = "31%",
  smemberDiscount,
  studentDiscount,
  originalPrice,
  installment = true,
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
        maxQuantity: 10,
      })
    );
  };

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        {discount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Giảm {discount}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded">
          Trả góp 0%
        </div>
        <Link href={`/Product/${productCode}`}>
          <Image
            src={fullPath}
            alt={productname}
            width={200}
            height={200}
            className="w-full h-48 object-contain p-4"
          />
        </Link>
      </div>

      <div className="p-3 flex flex-col justify-between h-[220px]">
        <h3 className="text-sm font-medium line-clamp-2 h-10">{productname}</h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-red-600 font-bold">
            {Price.toLocaleString("vi-VN")}đ
          </span>
          {originalPrice && (
            <span className="text-gray-500 text-xs line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {smemberDiscount && (
          <div className="mt-1 text-xs">
            <span className="text-gray-600">Smember giảm thêm đến </span>
            <span className="text-red-600 font-bold">{smemberDiscount}</span>
          </div>
        )}

        {studentDiscount && (
          <div className="mt-1 text-xs">
            <span className="text-gray-600">S-Student giảm thêm đến </span>
            <span className="text-red-600 font-bold">{studentDiscount}</span>
          </div>
        )}

        {installment && (
          <div className="mt-1 text-xs text-gray-600">
            Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
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

        <button
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
          className="mt-3 bg-blue-500 text-white w-full text-center py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          <div className="flex justify-center items-center gap-2">
            <AiOutlineShoppingCart className="text-lg" />
            Mua Ngay
          </div>
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
