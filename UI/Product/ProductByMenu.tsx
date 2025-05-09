"use client";

import { GetListProductByGroup } from "@/Apis/Product";
import CardProduct from "@/components/Product/Card";
import { ProductType } from "@/Utils/type";
import { useEffect, useState } from "react";

const ProductsByMenu = ({ id }: { id: string }) => {
  const [list, setList] = useState<ProductType[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetListProductByGroup(id);
      setList(response.data);
    };
    fetchData();
  }, []);
  console.log(list);
  if (!list) {
    return (
      <div className=" flex justify-center items-center">
        Vui lòng đợi trong giây lát
      </div>
    );
  }
  return (
    <div className=" container mx-auto">
      <div className=" grid grid-cols-3 md:grid-cols-5 gap-5">
        {list &&
          list?.map((item) => (
            <CardProduct
              key={item.id}
              id={item.id}
              productname={item.productname}
              Price={item.Price}
              pathimg={item.pathimg}
              productCode={item.productcode}
            />
          ))}
      </div>
    </div>
  );
};
export default ProductsByMenu;
