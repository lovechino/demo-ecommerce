import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sale_price: number;
  img: string;
};

const ListOrderProduct = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="flex justify-between">
          <Image
            src={product.img}
            width={180}
            height={180}
            alt="Picture of the Product"
          />
          <div className="flex-1 w-full">
            <div className="text-xl">{product.name}</div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <div className="text-red-600 text-xl">{product.price}đ</div>
                <div className="line-through text-gray-500 text-lg">
                  {product.sale_price}đ
                </div>
              </div>
              <div className="text-lg">
                Số lượng:{" "}
                <span className="text-red-600">{product.quantity}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOrderProduct;
