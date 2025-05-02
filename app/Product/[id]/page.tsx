import ProductDetailUi from "@/UI/Product/ProductDetail";

type PropsId = {
  params: { id: string };
};

const ProductDetail = ({ params }: PropsId) => {
  return <ProductDetailUi id={params.id} />;
};

export default ProductDetail;
