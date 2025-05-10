"use client";

import { GetProductById, getReviewProducts } from "@/Apis/Product";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { baseURL } from "@/Utils/Axios";
import { Product, ProductType } from "@/Utils/type";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import sptt from "@/public/Image/WhatsApp Image 2025-05-05 at 16.55.07_d9bf088d.jpg";
import { addItem } from "@/Redux/cart";

interface DetailType {
  id: string;
}

const ProductDetailUi = ({ id }: DetailType) => {
  const [product, setProduct] = useState<Product>();

  const [resview, setReview] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const GetData = async () => {
    const response = await GetProductById(id);
    const resReview = await getReviewProducts();
    setProduct(response);
    setReview(resReview);
  };
  const [quality, setQuality] = useState<number>(1);
  const normalizeGroupName = (name: string) => {
    return name
      .normalize("NFD") // Tách chữ và dấu
      .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
      .toLowerCase() // Chuyển về chữ thường
      .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu "-"
  };

  const listProduct = useAppSelector((state) => state.product.list);
  const newMap: ProductType[] = listProduct.filter(
    (item: ProductType) =>
      normalizeGroupName(item.productgroup) === product?.GroupCode
  );
  // const subProdct: ProductType[] = newMap.filter(
  //   (item: ProductType) => item.id !== product?.Id
  // );
  useEffect(() => {
    GetData();
    console.log(newMap);
  }, [id]);

  const fullpath = `${baseURL}${product?.Image}`;
  // const packingArray = product?.Packing?.split(" x ") || [];
  const bundledItems = [
    {
      Image:
        "https://cdn.tgdd.vn/Products/Images/5698/299348/arm-humanmotion-h1pro-thumb-600x600.png",
      title: "Giảm 100K khi mua kèm giá treo Hum...",
    },
    {
      img: "https://cdn.tgdd.vn/Products/Images/5698/299350/arm-xiaomi-mi-display-1c-thumb-600x600.png",
      title: "Giảm 100K khi mua kèm giá đỡ...",
    },
    {
      img: "https://cdn.tgdd.vn/Products/Images/5698/299349/arm-northbayou-f80-thumb-600x600.png",
      title: "Giảm 100K khi mua kèm giá treo Nort...",
    },
  ];
  const capacities = [
    { label: "S25 Ultra 1TB", price: 36490000 },
    { label: "S25 Ultra 512GB", price: 32690000 },
    { label: "S25 Ultra 256GB", price: 29890000 },
    { label: "S25 Plus 512GB", price: 26190000 },
    { label: "S25 Plus 256GB", price: 23190000 },
    { label: "S25 512GB", price: 22690000 },
    { label: "S25 256GB", price: 19690000 },
  ];
  const selectedCapacity = "S25 Ultra 256GB";

  const technicalSpecs = [
    { label: "Kích thước màn hình", value: "6.74 inches" },
    { label: "Công nghệ màn hình", value: "AMOLED" },
    {
      label: "Camera sau",
      value: "50 MP (chính), 64MP kính tiềm vọng, 8MP góc siêu rộng",
    },
    { label: "Camera trước", value: "32 MP, f/2.4" },
    { label: "Chipset", value: "Snapdragon 8 Plus Gen 1" },
    { label: "Công nghệ NFC", value: "Có" },
    { label: "Dung lượng RAM", value: "12 GB" },
    { label: "Bộ nhớ trong", value: "256 GB" },
    { label: "Pin", value: "4700 mAh" },
    { label: "Sạc nhanh", value: "SuperVOOC 100W" },
    { label: "Hệ điều hành", value: "Android 13" },
    { label: "Kích thước", value: "163.1 x 74.2 x 7.9 mm" },
    { label: "Trọng lượng", value: "196g" },
    { label: "Màu sắc", value: "Đen, Trắng, Xanh" },
    { label: "Bảo hành", value: "12 tháng chính hãng" },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bundleScrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [showBundleArrows, setShowBundleArrows] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      const newScrollLeft = container.scrollLeft - scrollAmount;
      
      if (newScrollLeft <= 0) {
        // Nếu đã ở đầu, cuộn đến cuối
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      const newScrollLeft = container.scrollLeft + scrollAmount;
      
      if (newScrollLeft >= container.scrollWidth - container.clientWidth) {
        // Nếu đã ở cuối, cuộn về đầu
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollBundleLeft = () => {
    if (bundleScrollRef.current) {
      const container = bundleScrollRef.current;
      const scrollAmount = container.clientWidth;
      const newScrollLeft = container.scrollLeft - scrollAmount;
      
      if (newScrollLeft <= 0) {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollBundleRight = () => {
    if (bundleScrollRef.current) {
      const container = bundleScrollRef.current;
      const scrollAmount = container.clientWidth;
      const newScrollLeft = container.scrollLeft + scrollAmount;
      
      if (newScrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Thông số kỹ thuật</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {technicalSpecs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span className="font-medium text-gray-700">
                      {spec.label}:
                    </span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold transition-transform duration-300 hover:-translate-y-1">
          {product?.ProductName}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Cột trái: Hình ảnh và thông tin cơ bản */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Hình ảnh sản phẩm */}
          <div className="border border-black/10 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300">
            <img
              className="w-full h-[400px] object-contain"
              src={fullpath}
              alt="Ảnh chính sản phẩm"
            />
          </div>
          
          {/* Thumbnail images */}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="aspect-square border border-black/10 rounded-lg overflow-hidden cursor-pointer hover:border-red-500 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                <img
                  className="w-full h-full object-contain"
                  src={fullpath}
                  alt={`Ảnh nhỏ ${index}`}
                />
              </div>
            ))}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="border border-black/10 p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Thông tin sản phẩm
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                Mới, đầy đủ phụ kiện từ nhà sản xuất
              </li>
              <li className="flex items-center gap-2">
                Màn hình, Cáp HDMI, Cáp DisplayPort, Tua vít (L), Cáp nguồn,
                Sách hướng dẫn
              </li>
              <li className="flex items-center gap-2">
                Bảo hành 36 tháng chính hãng, 1 đổi 1 trong 15 ngày đầu nếu có
                lỗi phần cứng do NSX
              </li>
              <li className="flex items-center gap-2">
                Gía sản phẩm đã bao gồm VAT
              </li>
            </ul>
          </div>

          {/* Phụ kiện mua kèm */}
          <div className="hidden lg:block border border-black/10 p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300">
            <div className="flex gap-2 mb-4 justify-center">
              <button className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold hover:bg-red-200 transition-colors duration-300">
                Mua kèm giá sốc
              </button>
              <button className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-300">
                Phụ kiện mua cùng
              </button>
            </div>
            {/* Desktop view with grid */}
            <div className="grid grid-cols-1 gap-4">
              {bundledItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-black/10 rounded-lg p-3 flex items-center gap-4 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-2">{item.title}</p>
                    <button className="bg-red-500 text-white text-sm px-4 py-1 rounded hover:bg-red-600 transition-colors duration-300">
                      Chọn sản phẩm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin chi tiết và mua hàng */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="border border-black/10 p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">
              {product?.ProductName}
              <span className="ml-2 text-sm bg-green-200 text-green-800 px-2 py-1 rounded">
                Còn Hàng
              </span>
            </h2>

            <div className="text-sm text-gray-600 space-x-2 mb-4">
              <span>
                Thương hiệu:{" "}
                <span className="text-red-600 font-semibold">TIROSS</span>
              </span>
              |<span>Loại: Khác</span>|
              <span>
                MSP: <span className="font-semibold text-red-600">TS9447</span>
              </span>
            </div>

            <div className="space-x-2 text-xl font-bold text-red-600 mb-4">
              {formatCurrency(2090000)}₫
              <span className="line-through text-gray-400 text-base font-normal">
                {formatCurrency(2500000)}₫
              </span>
            </div>

            {/* Countdown */}
            <div className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-4 py-2 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)] mb-4">
              <span className="font-bold">KẾT THÚC TRONG:</span>
              <div className="flex gap-1 text-center text-xs font-semibold">
                <div className="bg-white text-black px-2 py-1 rounded shadow-sm">00 Ngày</div>
                <div className="bg-white text-black px-2 py-1 rounded shadow-sm">09 Giờ</div>
                <div className="bg-white text-black px-2 py-1 rounded shadow-sm">00 Phút</div>
                <div className="bg-white text-black px-2 py-1 rounded shadow-sm">22 Giây</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              🔥 Đã bán <span className="text-red-500 font-bold">27</span> sản phẩm
            </div>

            {/* Dung lượng */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {capacities.map((item) => (
                <button
                  key={item.label}
                  className={`border px-4 py-2 rounded-lg text-sm text-left shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-300
                    ${
                      item.label === selectedCapacity
                        ? "border-red-500 text-red-600"
                        : "border-black/10 text-gray-700"
                    }`}
                >
                  <div>{item.label}</div>
                  <div className="text-xs">{formatCurrency(item.price)}</div>
                </button>
              ))}
            </div>

            {/* Số lượng */}
            <div className="mb-4">
              <span className="text-base block mb-2">Số Lượng Sản Phẩm</span>
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => setQuality((q) => Math.max(1, q - 1))}
                  className="w-6 h-6 flex justify-center items-center border border-black/10 rounded-2xl text-base hover:bg-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all duration-300"
                  aria-label="Giảm số lượng"
                >
                  -
                </button>
                <input
                  className="w-12 border border-black/10 rounded-2xl text-center text-sm shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                  type="number"
                  min={1}
                  value={quality}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value));
                    setQuality(val);
                  }}
                />
                <button
                  onClick={() => setQuality((q) => q + 1)}
                  className="w-6 h-6 flex justify-center items-center border border-black/10 rounded-2xl text-base hover:bg-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all duration-300"
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>
            </div>

            {/* Nút mua hàng */}
            <div className="flex flex-col gap-4">
              <button className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-xl shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] hover:bg-red-700 transition-all duration-300">
                CHỌN TRẢ GÓP 0%
                <div className="text-base font-normal">
                  Trả trước 0đ | Phụ phí 0đ
                </div>
              </button>

              <div className="flex gap-3">
                <button className="flex-1 bg-red-500 text-white h-20 min-h-[64px] rounded-lg font-bold text-xl shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] hover:bg-red-600 transition-all duration-300 flex flex-col items-center justify-center">
                  MUA NGAY
                  <span className="text-xs font-normal mt-1">
                    (Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)
                  </span>
                </button>
                <button className="w-20 h-20 min-h-[64px] border-2 border-red-400 bg-white text-red-500 rounded-lg flex items-center justify-center text-3xl hover:bg-gray-300 transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]">
                  <span role="img" aria-label="cart">🛒</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 text-white py-3 rounded-lg font-bold text-base hover:bg-blue-700 transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] flex flex-col items-center">
                  TRẢ GÓP 0%
                  <span className="text-xs font-normal">
                    (Trả trước chỉ từ 0đ)
                  </span>
                </button>
                <button className="bg-blue-500 text-white py-3 rounded-lg font-bold text-base hover:bg-blue-600 transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] flex flex-col items-center">
                  TRẢ GÓP 0% QUA THẺ
                  <span className="text-xs font-normal">
                    (Không phí chuyển đổi 3-6 tháng)
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Ưu đãi thêm */}
          <div className="border border-black/10 p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-3">Ưu đãi thêm</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Ưu đãi dành cho thành viên Smember</li>
              <li>✅ Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC</li>
              <li>✅ Giảm đến 1 triệu khi thanh toán qua thẻ tín dụng Vietbank</li>
              <li>✅ Giảm đến 1 triệu khi thanh toán qua thẻ Muadee by HDBank</li>
              <li>✅ Giảm ngay 800K khi trả góp qua thẻ tín dụng Techcombank</li>
              <li>✅ Mở thẻ VIB nhận E-Voucher đến 600K</li>
              <li>✅ Giảm đến 500.000đ khi thanh toán qua Kredivo</li>
            </ul>
          </div>
        </div>
      </div>
      {/* sản phẩm liên quan */}
      {/* <div>
        <div className="text-2xl font-bold text-center">Sản Phẩm Liên Quan</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {subProdct?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b py-4"
              >
                <CardProduct
                  id={item?.id}
                  productname={item?.productname}
                  Price={item?.Price}
                  pathimg={item?.pathimg}
                  productCode={item?.productcode}
                />
              </div>
            );
          })}
        </div>
      </div> */}
      {/* sản phẩm tương tự */}
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">SẢN PHẨM TƯƠNG TỰ</h2>

          {/* Mobile view with horizontal scroll */}
          <div 
            className="lg:hidden relative group"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
          >
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-opacity duration-300 ${
                showArrows ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Card 1 */}
              <div className="flex-none w-[280px] relative bg-white rounded-2xl shadow p-4 border border-black/20 snap-start">
                <div className="absolute -top-3 left-0">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                    Giảm 25%
                  </span>
                </div>
                <Image
                  src={sptt}
                  alt="sptt"
                  className="mx-auto h-28 object-contain"
                />
                <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                  1<small className="text-base">ms</small>
                </div>
                <div className="text-red-600 font-bold text-center text-base">
                  24 inch 100 Hz Full HD
                </div>
                <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                  Màn hình ASUS VU249CFE 24 inch
                </div>
                <div className="text-red-600 font-bold text-lg text-center mt-2">
                  {formatCurrency(2990000)}đ{" "}
                  <span className="text-gray-400 line-through text-base font-normal">
                    {formatCurrency(3990000)}đ
                  </span>
                </div>
                <div className="bg-gray-100 text-xs text-gray-700 rounded px-2 py-1 mt-2 text-center">
                  Tặng ly thủy tinh bọc da ASUS
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex-none w-[280px] relative bg-white rounded-2xl shadow p-4 border border-black/20 snap-start">
                <div className="absolute -top-3 left-0">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                    Giảm 6%
                  </span>
                </div>
                <Image
                  src={sptt}
                  alt=""
                  className="mx-auto h-28 object-contain"
                />
                <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                  5<small className="text-base">ms</small>
                </div>
                <div className="text-red-600 font-bold text-center text-base">
                  16 inch 60 Hz Full HD
                </div>
                <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                  Màn hình di động ASUS ZenScreen MB169C 16 inch
                </div>
                <div className="text-red-600 font-bold text-lg text-center mt-2">
                  {formatCurrency(3190000)}đ{" "}
                  <span className="text-gray-400 line-through text-base font-normal">
                    {formatCurrency(3390000)}đ
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    Trả góp 0%
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex-none w-[280px] relative bg-white rounded-2xl shadow p-4 border border-black/20 snap-start">
                <div className="absolute -top-3 left-0">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                    Giảm 14%
                  </span>
                </div>
                <Image
                  src={sptt}
                  alt="sptt"
                  className="mx-auto h-28 object-contain"
                />
                <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                  1<small className="text-base">ms</small>{" "}
                  <span className="text-gray-700 text-xs ml-2">sRGB 116%</span>
                </div>
                <div className="text-red-600 font-bold text-center text-base">
                  27 inch 120 Hz Full HD
                </div>
                <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                  Màn hình MSI Pro MP275 E2 27 inch
                </div>
                <div className="text-red-600 font-bold text-lg text-center mt-2">
                  {formatCurrency(2990000)}đ{" "}
                  <span className="text-gray-400 line-through text-base font-normal">
                    {formatCurrency(3490000)}đ
                  </span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="flex-none w-[280px] relative bg-white rounded-2xl shadow p-4 border border-black/20 snap-start">
                <div className="absolute -top-3 left-0">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                    Giảm 11%
                  </span>
                </div>
                <Image
                  src={sptt}
                  alt="sptt"
                  className="mx-auto h-28 object-contain"
                />
                <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                  1<small className="text-base">ms</small>
                </div>
                <div className="text-red-600 font-bold text-center text-base">
                  25 inch 180 Hz Full HD
                </div>
                <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                  Màn hình Gaming MSI G255F 25 inch
                </div>
                <div className="text-red-600 font-bold text-lg text-center mt-2">
                  {formatCurrency(3190000)}đ{" "}
                  <span className="text-gray-400 line-through text-base font-normal">
                    {formatCurrency(3590000)}đ
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    Trả góp 0%
                  </span>
                  <span className="flex items-center">
                    <span className="text-yellow-400 mr-1">★★★★★</span>
                    <span className="text-gray-400 text-sm flex items-center">
                      <svg
                        className="w-5 h-5 ml-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                      </svg>
                      Yêu thích
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-opacity duration-300 ${
                showArrows ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop view with grid */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="relative bg-white rounded-2xl shadow p-4 border border-black/20">
              <div className="absolute -top-3 left-0">
                <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                  Giảm 25%
                </span>
              </div>
              <Image
                src={sptt}
                alt="sptt"
                className="mx-auto h-28 object-contain"
              />
              <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                1<small className="text-base">ms</small>
              </div>
              <div className="text-red-600 font-bold text-center text-base">
                24 inch 100 Hz Full HD
              </div>
              <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                Màn hình ASUS VU249CFE 24 inch
              </div>
              <div className="text-red-600 font-bold text-lg text-center mt-2">
                {formatCurrency(2990000)}đ{" "}
                <span className="text-gray-400 line-through text-base font-normal">
                  {formatCurrency(3990000)}đ
                </span>
              </div>
              <div className="bg-gray-100 text-xs text-gray-700 rounded px-2 py-1 mt-2 text-center">
                Tặng ly thủy tinh bọc da ASUS
              </div>
              <div className="flex justify-between items-center mt-2">
                <span></span>
                <span className="text-gray-400 text-sm flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                  </svg>
                  Yêu thích
                </span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative bg-white rounded-2xl shadow p-4 border border-black/20">
              <div className="absolute -top-3 left-0">
                <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                  Giảm 6%
                </span>
              </div>
              <Image
                src={sptt}
                alt=""
                className="mx-auto h-28 object-contain"
              />
              <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                5<small className="text-base">ms</small>
              </div>
              <div className="text-red-600 font-bold text-center text-base">
                16 inch 60 Hz Full HD
              </div>
              <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                Màn hình di động ASUS ZenScreen MB169C 16 inch
              </div>
              <div className="text-red-600 font-bold text-lg text-center mt-2">
                {formatCurrency(3190000)}đ{" "}
                <span className="text-gray-400 line-through text-base font-normal">
                  {formatCurrency(3390000)}đ
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                  Trả góp 0%
                </span>
                <span className="text-gray-400 text-sm flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                  </svg>
                  Yêu thích
                </span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative bg-white rounded-2xl shadow p-4 border border-black/20">
              <div className="absolute -top-3 left-0">
                <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                  Giảm 14%
                </span>
              </div>
              <Image
                src={sptt}
                alt="sptt"
                className="mx-auto h-28 object-contain"
              />
              <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                1<small className="text-base">ms</small>{" "}
                <span className="text-gray-700 text-xs ml-2">sRGB 116%</span>
              </div>
              <div className="text-red-600 font-bold text-center text-base">
                27 inch 120 Hz Full HD
              </div>
              <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                Màn hình MSI Pro MP275 E2 27 inch
              </div>
              <div className="text-red-600 font-bold text-lg text-center mt-2">
                {formatCurrency(2990000)}đ{" "}
                <span className="text-gray-400 line-through text-base font-normal">
                  {formatCurrency(3490000)}đ
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white rounded-2xl shadow p-4 border border-black/20">
              <div className="absolute -top-3 left-0">
                <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-tl-2xl rounded-br-2xl">
                  Giảm 11%
                </span>
              </div>
              <Image
                src={sptt}
                alt="sptt"
                className="mx-auto h-28 object-contain"
              />
              <div className="text-yellow-400 text-2xl font-bold text-center mt-2">
                1<small className="text-base">ms</small>
              </div>
              <div className="text-red-600 font-bold text-center text-base">
                25 inch 180 Hz Full HD
              </div>
              <div className="text-gray-800 font-semibold text-center text-sm mt-1">
                Màn hình Gaming MSI G255F 25 inch
              </div>
              <div className="text-red-600 font-bold text-lg text-center mt-2">
                {formatCurrency(3190000)}đ{" "}
                <span className="text-gray-400 line-through text-base font-normal">
                  {formatCurrency(3590000)}đ
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                  Trả góp 0%
                </span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★★★★★</span>
                  <span className="text-gray-400 text-sm flex items-center">
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                    </svg>
                    Yêu thích
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Đặc điểm nổi bật + Nội dung chính */}
        <div className="lg:col-span-2 space-y-6">
          {/* Đặc điểm nổi bật */}
          <div className="bg-white shadow p-6 rounded-xl border border-black/20">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Đặc Điểm Nổi Bật Của{" "}
              {product?.ProductName || "OPPO Reno10 Pro+ 5G 12GB 256GB"}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Trải nghiệm hình ảnh sống động, sắc nét với màn AMOLED 6.74
                inch, tần số quét 120Hz.
              </li>
              <li>
                Hiệu năng mạnh mẽ với Snapdragon 8 Plus Gen 1, xử lý đa nhiệm
                mượt mà.
              </li>
              <li>
                Camera sau AI 50MP (chính), 64MP kính tiềm vọng, 8MP góc siêu
                rộng.
              </li>
              <li>
                Pin 4700mAh, hỗ trợ sạc nhanh SuperVOOC 100W, dùng thoải mái cả
                ngày.
              </li>
            </ul>
          </div>

          {/* Thông số kỹ thuật - Hiển thị trên mobile */}
          <div className="lg:hidden bg-white border border-black/20 shadow p-6 rounded-xl">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Thông số kỹ thuật
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Kích thước màn hình:</span>
                <span>6.74 inches</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Công nghệ màn hình:</span>
                <span>AMOLED</span>
              </div>
              <div>
                <div className="font-medium">Camera sau:</div>
                <div className="text-sm pl-2 mt-1">
                  Camera góc rộng: 50 MP
                  <br />
                  Kính tiềm vọng: 64 MP, PDAF, 5x optical zoom
                  <br />
                  Góc siêu rộng: 8 MP, f/2.2
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Camera trước:</span>
                <span>32 MP, f/2.4</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Chipset:</span>
                <span>Snapdragon 8 Plus Gen 1</span>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  showModal
                    ? "h-auto opacity-100"
                    : "h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Công nghệ NFC:</span>
                    <span>Có</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dung lượng RAM:</span>
                    <span>12 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Bộ nhớ trong:</span>
                    <span>256 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pin:</span>
                    <span>4700 mAh</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="text-blue-600 mt-4 text-sm font-medium hover:underline"
              onClick={() => setShowModal(true)}
            >
              Xem thêm chi tiết
            </button>
          </div>

          {/* Nội dung chính */}
          <div className="bg-gray-50 border border-black/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Nội dung chính
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-800">
              <li>Vì sao nên mua {product?.ProductName}?</li>
              <li>So sánh {product?.ProductName} với các dòng khác</li>
              <li>
                {product?.ProductName} có gì nổi bật?
                <ol className="list-decimal list-inside ml-6 text-sm text-gray-600 space-y-1">
                  <li>Snapdragon 8 Plus Gen 1, tần số quét 120Hz</li>
                  <li>Màn hình lớn 6.74 inch</li>
                </ol>
              </li>
            </ol>
            <div className="text-center mt-4">
              <button className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
                Xem thêm
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-6 bg-white border border-black/20 rounded-xl shadow-sm">
            {/* Tổng quan đánh giá */}
            <div className="flex flex-col items-center text-center">
              <h5 className="text-xl font-semibold">Đánh giá sản phẩm</h5>
              <div className="text-3xl font-bold text-orange-500">4.25</div>
              <div className="flex gap-1 mt-1 text-yellow-400">
                {/* Mock sao đánh giá */}
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>☆</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {resview?.length}
              </div>
            </div>

            {/* Danh sách đánh giá */}
            <div className="flex flex-col gap-6">
              {resview?.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 items-start">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={`${baseURL}${item?.Image}`}
                    alt="Người đánh giá"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item?.UserName}</span>
                      <span className="text-sm text-gray-500">
                        {item?.CreatedAt}
                      </span>
                    </div>
                    <p>{item?.Content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Form gửi đánh giá */}
          <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner pb-24">
            <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
              Hãy cho chúng tôi biết đánh giá của bạn
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên của bạn"
                  className="w-full px-4 py-2 border-2 border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Đánh giá
                </label>
                <select className="w-full px-4 py-2 border-2 border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>1 - Rất tệ</option>
                  <option>2 - Tệ</option>
                  <option>3 - Bình thường</option>
                  <option>4 - Tốt</option>
                  <option>5 - Rất tốt</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Chọn ảnh
                </label>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-red-700 file:text-white
                    hover:file:bg-red-800"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Nội dung
                </label>
                <textarea
                  rows={4}
                  placeholder="Nhập nội dung của bạn"
                  className="w-full px-4 py-2 border-2 border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded text-lg font-semibold"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/* Cột phải: Thông số kỹ thuật - Chỉ hiển thị trên desktop */}
        <div className="hidden lg:block bg-white border border-black/20 shadow p-6 rounded-xl h-fit">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Thông số kỹ thuật
          </h2>

          <div className="space-y-4 text-sm text-gray-700 border border-black/20 rounded-md p-4 flex flex-col items-center">
            {" "}
            {/* Thêm flex flex-col items-center */}
            <div className="flex justify-between">
              <span className="font-medium">Kích thước màn hình:</span>
              <span>6.74 inches</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Công nghệ màn hình:</span>
              <span>AMOLED</span>
            </div>
            <div>
              <div className="font-medium">Camera sau:</div>
              <div className="text-sm pl-2 mt-1">
                Camera góc rộng: 50 MP
                <br />
                Kính tiềm vọng: 64 MP, PDAF, 5x optical zoom
                <br />
                Góc siêu rộng: 8 MP, f/2.2
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Camera trước:</span>
              <span>32 MP, f/2.4</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Camera trước:</span>
              <span>32 MP, f/2.4</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Camera trước:</span>
              <span>32 MP, f/2.4</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Camera trước:</span>
              <span>32 MP, f/2.4</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Chipset:</span>
              <span>Snapdragon 8 Plus Gen 1</span>
            </div>
            <button
              className="text-blue-600 mt-4 text-sm font-medium hover:underline border border-black/20 rounded-md px-4 py-2"
              onClick={() => setShowModal(true)}
            >
              Xem thêm chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailUi;
