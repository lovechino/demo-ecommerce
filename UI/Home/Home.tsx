"use client";
import { getAllProduct } from "@/Apis/Product";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import { FiLoader } from "react-icons/fi";
const ListPrudctHome = dynamic(
  () => import("@/components/Product/ListProductHome"),
  {
    loading: () => {
      return <FiLoader className="animate-spin text-blue-500 text-2xl" />;
    },
  }
);
const Hero = dynamic(() => import("@/components/Hero/Hero"), {
  loading: () => {
    return <FiLoader className="animate-spin text-blue-500 text-2xl" />;
  },
});
const HomeScreeen = () => {
  getAllProduct();
  return (
    <div>
      <Hero />
      <ListPrudctHome />
      <Footer />
    </div>
  );
};

export default HomeScreeen;
