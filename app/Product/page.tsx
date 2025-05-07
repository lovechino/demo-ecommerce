import dynamic from "next/dynamic";

const ProductPage = dynamic(() => import("@/UI/Product/Product"));
const Product = () => {
  return (
    <div className="">
      <ProductPage />
    </div>
  );
};
export default Product;
