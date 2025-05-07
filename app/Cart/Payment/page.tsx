import dynamic from "next/dynamic";
const PaymentPage = dynamic(() => import("@/UI/Payment/Payment"));
const Cart = () => {
  return <PaymentPage />;
};

export default Cart;
