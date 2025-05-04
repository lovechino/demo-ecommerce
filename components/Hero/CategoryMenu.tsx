import {
    AiOutlineMobile,
    AiOutlineLaptop,
    AiOutlineSound,
    AiOutlineCamera,
    AiOutlineHome,
    AiOutlineSync,
    AiOutlineGift,
  } from "react-icons/ai";
  import { MdMonitor, MdDiscount } from "react-icons/md";
  import { PiTelevisionBold } from "react-icons/pi";
  import { BsChevronRight } from "react-icons/bs";
  import { FaHeadphones } from "react-icons/fa";
  
  export default function CategoryMenu() {
    const categories = [
      { name: "Điện thoại, Tablet", icon: <AiOutlineMobile className="w-5 h-5" /> },
      { name: "Laptop", icon: <AiOutlineLaptop className="w-5 h-5" /> },
      { name: "Âm thanh, Mic thu âm", icon: <FaHeadphones className="w-5 h-5" /> },
      { name: "Đồng hồ, Camera", icon: <AiOutlineCamera className="w-5 h-5" /> },
      { name: "Đồ gia dụng", icon: <AiOutlineHome className="w-5 h-5" /> },
      { name: "Phụ kiện", icon: <AiOutlineSound className="w-5 h-5" /> },
      { name: "PC, Màn hình, Máy in", icon: <MdMonitor className="w-5 h-5" /> },
      { name: "Tivi", icon: <PiTelevisionBold className="w-5 h-5" /> },
      { name: "Thu cũ đổi mới", icon: <AiOutlineSync className="w-5 h-5" /> },
      { name: "Hàng cũ", icon: <AiOutlineMobile className="w-5 h-5" /> },
      { name: "Khuyến mãi", icon: <MdDiscount className="w-5 h-5" /> },
      { name: "Tin công nghệ", icon: <AiOutlineGift className="w-5 h-5" /> },
    ];
  
    return (
      <div className="bg-white rounded-md overflow-hidden">
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="border-b last:border-b-0">
              <a
                href="#"
                className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className="text-sm">{category.name}</span>
                </div>
                <BsChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  