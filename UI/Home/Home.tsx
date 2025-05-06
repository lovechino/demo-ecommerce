import Footer from "@/components/Footer/Footer";
// import BottomNav from "@/components/Header/BottomNav";
// import NavTop from "@/components/Header/NarTop";
// import Navbar from "@/components/Header/Navbar";
import Hero from "@/components/Hero/Hero";
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
const HomeScreeen = () => {
  return (
    <div>
      <Hero />
      <ListPrudctHome />
      <Footer />
    </div>
  );
};

export default HomeScreeen;
