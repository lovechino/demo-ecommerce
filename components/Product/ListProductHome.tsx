"use client";

import { useEffect, useState } from "react";
import { GetListGroupProduct, GetListProductByGroup } from "@/Apis/Product";
import CardProduct from "./Card";

import { Menu, ProductType } from "@/Utils/type";

const ListProductHome = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [groupProducts, setGroupProducts] = useState<{
    [key: string]: ProductType[];
  }>({});
  const filterOptions = [
    { label: "Tất cả", value: "" },
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

  useEffect(() => {
    const fetchMenuAndProducts = async () => {
      const menuList = await GetListGroupProduct();
      setMenu(menuList);
      // Lấy sản phẩm cho từng menu
      const productsByGroup: { [key: string]: ProductType[] } = {};
      for (const m of menuList) {
        const products = await GetListProductByGroup(m.Code);
        productsByGroup[m.Code] = products || [];
      }
      setGroupProducts(productsByGroup);
    };
    fetchMenuAndProducts();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center px-2 py-6">
      {menu.map((group) => {
        const products = groupProducts[group.Code] || [];
        if (products.length === 0) return null;
        // Không lọc theo filter, chỉ hiển thị toàn bộ sản phẩm của nhóm
        const filteredProducts = products;
        return (
          <div key={group.Code} className="mb-8 w-full">
            <div className="flex flex-col justify-start md:flex-row md:items-center gap-2 mb-2 md:gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">
                {group.Name}
              </h2>
              <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className="px-3 py-1 border border-gray-300 rounded-full text-xs font-medium whitespace-nowrap bg-white hover:bg-blue-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredProducts.map((item: ProductType) => (
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
        );
      })}
    </div>
  );
};

export default ListProductHome;
