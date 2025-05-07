import ProductDetailUi from "@/UI/Product/ProductDetail";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default function ProductDetail({ params }: PageProps) {
  if (!params?.id) {
    redirect("/");
  }

  return <ProductDetailUi id={params.id} />;
}
