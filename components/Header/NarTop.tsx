import Image from "next/image";

const NavTop = ()=>{
    return(
        <div className="bg-gray-900 text-white text-xs py-2">
      <div className="container mx-auto px-6 flex flex-col justify-center items-center md:justify-between md:flex-row md:items-center">
        <div>
          Get 20% discount on your first purchase
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span>Careers</span>
          <span>Help</span>
          <span>Buyer Protection</span>
          <a href="#" className="flex items-center space-x-1">
            <Image src="https://via.placeholder.com/15/FFFFFF/000000?Text=EN" alt="EN" className="rounded-sm" width={20} height={20} />
            <span>EN</span>
          </a>
        </div>
      </div>
    </div>
    )
}

export default NavTop;