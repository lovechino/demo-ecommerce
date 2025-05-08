import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
  return (
    <Suspense fallback={<Loading />}>
      <ProductDetailUi id={value} />
    </Suspense>
  );
}
