import { AiFillHome } from "react-icons/ai";

import { AiOutlineHeart } from "react-icons/ai";

import { AiOutlineMenu } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-20 md:hidden">
      <ul className="flex justify-around items-center h-16">
        <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600">
          <AiFillHome className="text-xl" />
          <span className="text-xs mt-1">Home</span>
        </li>
        <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600">
          <AiOutlineMenu className="text-xl" />
          <span className="text-xs mt-1">Collections</span>
        </li>
        <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600">
          <BsHandbag className="text-xl" />
          <span className="text-xs mt-1">Cart</span>
        </li>
        <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600">
          <AiOutlineHeart className="text-xl" />
          <span className="text-xs mt-1">Wishlist</span>
        </li>
        {/* <li className="flex flex-col items-center text-gray-600 hover:text-purple-600 focus:text-purple-600">
          <AiOutlineUser className="text-xl" />
          <span className="text-xs mt-1">Profile</span>
        </li> */}
      </ul>
    </nav>
  );
};

export default BottomNav;
