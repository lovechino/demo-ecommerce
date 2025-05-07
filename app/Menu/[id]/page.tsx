import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const ProductsByMenu = dynamic(() => import("@/UI/Product/ProductByMenu"));

type MenuPros = {
  params: Promise<{
    id: string;
  }>;
};

const MenuPage = async ({ params }: MenuPros) => {
  if (!params) {
    redirect("/");
  }
  return (
    <div>
      <ProductsByMenu id={(await params).id} />
    </div>
  );
};

export default MenuPage;
