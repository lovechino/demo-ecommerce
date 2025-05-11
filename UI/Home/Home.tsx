"use client";
import { getAllProduct } from "@/Apis/Product";
import Loading from "@/components/Loading/Loading";

import dynamic from "next/dynamic";
import { Suspense } from "react";
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
const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  loading: () => {
    return <FiLoader className="animate-spin text-blue-500 text-2xl" />;
  },
});
const HomeScreeen = () => {
  getAllProduct();
  
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Hero />
        <ListPrudctHome />
      </Suspense>
      <Footer />
      
    </div>
  );
};

export default HomeScreeen;
