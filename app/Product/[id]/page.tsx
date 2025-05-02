import ProductDetailUi from "@/UI/Product/ProductDetail";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetail({ params }: PageProps) {
  if (!params) {
    redirect("/");
  }
  const value: string = (await params).id;
  return <ProductDetailUi id={value} />;
}
