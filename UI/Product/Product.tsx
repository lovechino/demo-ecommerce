"use client";

import CardProduct from "@/components/Product/Card";
import { useAppSelector } from "@/Redux/hook";
import { ProductType } from "@/Utils/type";
import { useEffect, useState } from "react";
import { FaFilter, FaTruck, FaTags } from "react-icons/fa";
import { MdSort } from "react-icons/md";

const filterOptions = [
  { label: "Bộ lọc", icon: <FaFilter /> },
  { label: "Sẵn hàng", icon: <FaTruck /> },
  { label: "Giá", icon: <FaTags /> },
  "Nhu cầu sử dụng",
  "Tính năng đặc biệt",
  "Bộ nhớ trong",
  "Dung lượng RAM",
  "Màn hình",
  "Hệ điều hành",
  "Chipset",
];

const sortOptions = [
  { label: "Giá Cao - Thấp", icon: <MdSort /> },
  { label: "Giá Thấp - Cao", icon: <MdSort /> },
];

const ProductPage = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
  const product = useAppSelector((state) => state.product.list);

  useEffect(() => {
    const sorted = [...product].sort((a: ProductType, b: ProductType) => {
      switch (selectedSort) {
        case "Giá Cao - Thấp":
          return (b.Price ?? 0) - (a.Price ?? 0);
        case "Giá Thấp - Cao":
          return (a.Price ?? 0) - (b.Price ?? 0);
        default:
          return 0;
      }
    });
    setSortedProducts(sorted);
  }, [selectedSort, product]);

  return (
    <div className="px-4 py-8 flex flex-col gap-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((item, index) =>
          typeof item === "string" ? (
            <button
              key={index}
              className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-200"
            >
              {item}
            </button>
          ) : (
            <button
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-200"
            >
              {item.icon} {item.label}
            </button>
          )
        )}
        <select className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-200">
          <option>Camera</option>
        </select>
        <select className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-200">
          <option>Lenovo Tab</option>
        </select>
      </div>

      {/* Sort Options */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Sắp xếp theo</h3>
        <div className="flex flex-wrap gap-3">
          {sortOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSelectedSort(opt.label)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm border transition
              ${
                selectedSort === opt.label
                  ? "border-red-500 text-red-500 bg-red-100"
                  : "border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((item) => (
            <CardProduct
              key={item.id}
              productname={item.productname}
              id={item.id}
              Price={item.Price}
              pathimg={item.pathimg}
              productCode={item.productcode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
