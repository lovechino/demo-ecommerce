import ProductsByMenu from "@/UI/Product/ProductByMenu";
import { redirect } from "next/navigation";

type MenuPros = {
    params: Promise<{
      id: string;
    }>;
  };


const MenuPage = async ({params} : MenuPros)=>{
    if(!params){
        redirect("/")
    }
    return(
        <div>
          <ProductsByMenu id= {(await params).id}/>
        </div>
    )
}

export default MenuPage