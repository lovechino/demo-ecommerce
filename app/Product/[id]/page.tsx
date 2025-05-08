import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetailUi = dynamic(() => import("@/UI/Product/ProductDetail"));

export default async function ProductDetail({ params }: PageProps) {
  if (!params) {
    redirect("/");
  }
  const value: string = (await params).id;
  return <ProductDetailUi id={value} />;
}
