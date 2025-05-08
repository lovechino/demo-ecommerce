import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProductPage = dynamic(() => import("@/UI/Product/Product"));
const Product = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductPage />
    </Suspense>
  );
};
export default Product;
