import dynamic from "next/dynamic";

const CartPage = dynamic(() => import("@/UI/Cart/Cart"));
const Cart = () => {
  return <CartPage />;
};

export default Cart;
