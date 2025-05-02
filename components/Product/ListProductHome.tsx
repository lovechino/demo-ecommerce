"use client";

import { useState } from "react";
import { GetAllProduct } from "@/Apis/Product";
import CardProduct from "./Card";
import { useAppSelector } from "@/Redux/hook";
import { ProductType } from "@/Utils/type";

const ListProductHome = () => {
  GetAllProduct();
  const product = useAppSelector((state) => state.product.listProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // số sản phẩm mỗi trang

  // Tính chỉ số bắt đầu và kết thúc
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts: ProductType[] = product?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(product?.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Sản Phẩm</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentProducts.map(
          (item: {
            id: number;
            productname: string;
            Price: number;
            pathimg: string;
            productcode: string;
          }) => (
            <CardProduct
              key={item.id}
              productname={item.productname}
              id={item.id}
              Price={item.Price}
              pathimg={item.pathimg}
              productCode={item.productcode}
            />
          )
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListProductHome;
