"use client";

import { GetProductById, getReviewProducts } from "@/Apis/Product";
import CardProduct from "@/components/Product/Card";
import { useAppSelector } from "@/Redux/hook";
import { baseURL } from "@/Utils/Axios";
import { Product, ProductType } from "@/Utils/type";
import { useEffect, useState } from "react";

interface DetailType {
  id: string;
}

const ProductDetailUi = ({ id }: DetailType) => {
  const [product, setProduct] = useState<Product>();
  const [resview, setReview] = useState<any>(null);
  const GetData = async () => {
    const response = await GetProductById(id);
    const resReview = await getReviewProducts();
    setProduct(response);
    setReview(resReview);
  };
  const [quality, setQuality] = useState<number>(1);
  const normalizeGroupName = (name: string) => {
    return name
      .normalize("NFD") // Tách chữ và dấu
      .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
      .toLowerCase() // Chuyển về chữ thường
      .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu "-"
  };

  const listProduct = useAppSelector((state) => state.product.list);
  const newMap: ProductType[] = listProduct.filter(
    (item: ProductType) =>
      normalizeGroupName(item.productgroup) === product?.GroupCode
  );
  const subProdct: ProductType[] = newMap.filter(
    (item: ProductType) => item.id !== product?.Id
  );
  useEffect(() => {
    GetData();
    console.log(newMap);
  }, [id]);

  const fullpath = `${baseURL}${product?.Image}`;
  const packingArray = product?.Packing?.split(" x ") || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{product?.ProductName}</h1>
        <p className="text-gray-600 mt-2">
          Nhóm Sản Phẩm : {product?.GroupCode}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Hình ảnh */}
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-2 mb-4">
            <img
              className="w-full h-auto cursor-pointer border rounded"
              src={fullpath}
              alt="Ảnh nhỏ 1"
            />
            <img
              className="w-full h-auto cursor-pointer border rounded"
              src={fullpath}
              alt="Ảnh nhỏ 2"
            />
            <img
              className="w-full h-auto cursor-pointer border rounded"
              src={fullpath}
              alt="Ảnh nhỏ 3"
            />
            <img
              className="w-full h-auto cursor-pointer border rounded"
              src={fullpath}
              alt="Ảnh nhỏ 4"
            />
            <img
              className="w-full h-auto cursor-pointer border rounded"
              src={fullpath}
              alt="Ảnh nhỏ 5"
            />
          </div>
          <div className="border rounded overflow-hidden">
            <img className="w-full" src={fullpath} alt="Ảnh chính sản phẩm" />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold text-left">
            {product?.ProductName}
          </h2>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {/* 5 sao */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
            </div>
            <span className="text-sm text-gray-600">(5 đánh giá)</span>
          </div>

          <div className="text-2xl font-bold text-red-500">
            {product?.Price} đ
          </div>

          <div className="flex gap-4">
            {packingArray.map((item: any, index: number) => (
              <button
                key={index}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuality(quality - 1)}
              // disabled={}
              className="w-8 h-8 flex justify-center items-center border rounded hover:bg-gray-100"
            >
              -
            </button>
            <input
              className="w-16 border rounded text-center"
              type="text"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              readOnly
            />
            <button className="w-8 h-8 flex justify-center items-center border rounded hover:bg-gray-100">
              +
            </button>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded">
            Thêm vào giỏ hàng
          </button>

          <div className="pt-4">
            <h3 className="font-semibold">Đặc điểm nổi bật</h3>
            <p className="text-gray-700">Sản phẩm tuyệt vời cho sức khỏe.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-6 bg-white rounded-xl shadow-sm">
        {/* Tổng quan đánh giá */}
        <div className="flex flex-col items-center text-center">
          <h5 className="text-xl font-semibold">Đánh giá sản phẩm</h5>
          <div className="text-3xl font-bold text-orange-500">4.25</div>
          <div className="flex gap-1 mt-1 text-yellow-400">
            {/* Mock sao đánh giá */}
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>☆</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">{resview?.length}</div>
        </div>

        {/* Danh sách đánh giá */}
        <div className="flex flex-col gap-6">
          {resview?.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 items-start">
              <img
                className="w-12 h-12 rounded-full"
                src={`${baseURL}${item?.Image}`}
                alt="Người đánh giá"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item?.UserName}</span>
                  <span className="text-sm text-gray-500">
                    {item?.CreatedAt}
                  </span>
                </div>
                <p>{item?.Content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Form gửi đánh giá */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
          Hãy cho chúng tôi biết đánh giá của bạn
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Tên của bạn
            </label>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              className="w-full px-4 py-2 border-2 border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Đánh giá
            </label>
            <select className="w-full px-4 py-2 border-2 border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>1 - Rất tệ</option>
              <option>2 - Tệ</option>
              <option>3 - Bình thường</option>
              <option>4 - Tốt</option>
              <option>5 - Rất tốt</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Chọn ảnh
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:text-sm file:font-semibold
        file:bg-red-700 file:text-white
        hover:file:bg-red-800"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Nội dung
            </label>
            <textarea
              rows={4}
              placeholder="Nhập nội dung của bạn"
              className="w-full px-4 py-2 border-2 border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded text-lg font-semibold"
          >
            Gửi
          </button>
        </form>
      </div>
      <div>
        <div className="text-2xl font-bold text-center">Sản Phẩm Liên Quan</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {subProdct?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b py-4"
              >
                <CardProduct
                  id={item?.id}
                  productname={item?.productname}
                  Price={item?.Price}
                  pathimg={item?.pathimg}
                  productCode={item?.productcode}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailUi;
