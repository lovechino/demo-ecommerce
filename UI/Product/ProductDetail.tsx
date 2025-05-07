"use client";

import { GetProductById, getReviewProducts } from "@/Apis/Product";
// import CardProduct from "@/components/Product/Card";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { baseURL } from "@/Utils/Axios";
import { Product, ProductType } from "@/Utils/type";
import { useEffect, useState } from "react";
import Image from "next/image";
import sptt from "@/public/Image/WhatsApp Image 2025-05-05 at 16.55.07_d9bf088d.jpg";
import { addItem } from "@/Redux/cart";
// import { addItem } from "@/Redux/cart";

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
  const packingArray = product?.Packing?.split(" x ") || [];
  const bundledItems = [
    {
      Image:
        "https://cdn.tgdd.vn/Products/Images/5698/299348/arm-humanmotion-h1pro-thumb-600x600.png",
      title: "Giảm 100K khi mua kèm giá treo Hum..."
    },
    {
      img: "https://cdn.tgdd.vn/Products/Images/5698/299350/arm-xiaomi-mi-display-1c-thumb-600x600.png",
      title: "Giảm 100K khi mua kèm giá đỡ..."
    },
    {
      img: "https://cdn.tgdd.vn/Products/Images/5698/299349/arm-northbayou-f80-thumb-600x600.png",
      title: "Giảm 100K khi mua kèm giá treo Nort..."
    }
  ];
  const capacities = [
    { label: "S25 Ultra 1TB", price: 36490000 },
    { label: "S25 Ultra 512GB", price: 32690000 },
    { label: "S25 Ultra 256GB", price: 29890000 },
    { label: "S25 Plus 512GB", price: 26190000 },
    { label: "S25 Plus 256GB", price: 23190000 },
    { label: "S25 512GB", price: 22690000 },
    { label: "S25 256GB", price: 19690000 }
  ];
  const selectedCapacity = "S25 Ultra 256GB";

  const technicalSpecs = [
    { label: "Kích thước màn hình", value: "6.74 inches" },
    { label: "Công nghệ màn hình", value: "AMOLED" },
    {
      label: "Camera sau",
      value: "50 MP (chính), 64MP kính tiềm vọng, 8MP góc siêu rộng"
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
    { label: "Bảo hành", value: "12 tháng chính hãng" }
  ];

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
        <h1 className="text-3xl font-bold">{product?.ProductName}</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
        {/* Hình ảnh */}
        <div className="w-full lg:w-1/2">
          <div className="border border-black/20 rounded-lg overflow-hidden shadow-sm mb-4 flex justify-center">
            <img
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto"
              src={fullpath}
              alt="Ảnh chính sản phẩm"
            />
          </div>
          <div className="grid grid-cols-5 gap-2 mb-4 border-black/20">
            <img
              className="w-full h-auto cursor-pointer border border-black/20 rounded"
              src={fullpath}
              alt="Ảnh nhỏ 1"
            />
            <img
              className="w-full h-auto cursor-pointer border border-black/20 rounded"
              src={fullpath}
              alt="Ảnh nhỏ 2"
            />
            <img
              className="w-full h-auto cursor-pointer border border-black/20 rounded"
              src={fullpath}
              alt="Ảnh nhỏ 3"
            />
            <img
              className="w-full h-auto cursor-pointer border border-black/20 rounded"
              src={fullpath}
              alt="Ảnh nhỏ 4"
            />
            <img
              className="w-full h-auto cursor-pointer border border-black/20 rounded"
              src={fullpath}
              alt="Ảnh nhỏ 5"
            />
          </div>
          {/* Thông tin sản phẩm */}
          <div className="col-span-1 border border-black/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Thông tin sản phẩm</h3>
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
          <div className=" flex flex-col gap-6 p-4 bg-white rounded-xl shadow-md">
            {/* Gợi ý phụ kiện mua kèm */}
            <div>
              <div className="flex gap-2 mb-4">
                <button className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                  Mua kèm giá sốc
                </button>
                <button className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                  Phụ kiện mua cùng
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {bundledItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-black/20 rounded-lg p-3 flex flex-col items-center text-center shadow-sm"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-24 h-24 object-contain mb-3"
                    />
                    <p className="text-sm text-gray-800 mb-3 line-clamp-2">
                      {item.title}
                    </p>
                    <button className="bg-red-500 text-white text-sm px-4 py-1 rounded hover:bg-red-600">
                      Chọn sản phẩm
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-700 font-semibold text-base">
                  Tạm tính:{" "}
                  <span className="text-red-600 text-lg font-bold">
                    {formatCurrency(Number(product?.Price))}đ
                  </span>
                  <div className="text-xs italic text-gray-500">
                    (Tiết kiệm 0đ)
                  </div>
                </div>
                <button
                  className="bg-pink-500 text-white px-6 py-2 rounded font-bold hover:cursor-pointer hover:bg-pink-600"
                  onClick={() =>
                    dispatch(
                      addItem({
                        id: product?.Id,
                        productname: product?.ProductName,
                        Price: product?.Price,
                        pathimg: product?.Image,
                        qualitiy: quality,
                        maxQuantity: 10
                      })
                    )
                  }
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-left">
            {product?.ProductName}
            <span className="ml-2 text-sm bg-green-200 text-green-800 px-2 py-1 rounded">
              Còn Hàng
            </span>
          </h2>

          <div className="text-sm text-gray-600 space-x-2">
            <span>
              Thương hiệu:{" "}
              <span className="text-red-600 font-semibold">TIROSS</span>
            </span>
            |<span>Loại: Khác</span>|
            <span>
              MSP: <span className="font-semibold text-red-600">TS9447</span>
            </span>
          </div>
          <div className="space-x-2 text-xl font-bold text-red-600">
            {formatCurrency(2090000)}₫
            <span className="line-through text-gray-400 text-base font-normal">
              {formatCurrency(2500000)}₫
            </span>
          </div>
          {/* Countdown */}
          <div className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-4 py-2 rounded flex items-center justify-between">
            <span className="font-bold">KẾT THÚC TRONG:</span>
            <div className="flex gap-1 text-center text-xs font-semibold">
              <div className="bg-white text-black px-2 py-1 rounded">
                00 Ngày
              </div>
              <div className="bg-white text-black px-2 py-1 rounded">
                09 Giờ
              </div>
              <div className="bg-white text-black px-2 py-1 rounded">
                00 Phút
              </div>
              <div className="bg-white text-black px-2 py-1 rounded">
                22 Giây
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            🔥 Đã bán <span className="text-red-500 font-bold">27</span> sản
            phẩm
          </div>
          {/* Dung lượng */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {capacities.map((item) => (
              <button
                key={item.label}
                className={`border px-4 py-2 rounded-lg text-sm text-left
              ${
                item.label === selectedCapacity
                  ? "border-red-500 text-red-600"
                  : "border-gray-300 text-gray-700"
              }`}
              >
                <div>{item.label}</div>
                <div className="text-xs">{formatCurrency(item.price)}</div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {/* 5 sao */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="..." />
              </svg>
            </div>
            {/* <span className="text-sm text-gray-600">(5 đánh giá)</span> */}
          </div>

          {/* <div className="text-2xl font-bold text-red-500">
            {product?.Price} vnđ
          </div> */}

          <div className="flex gap-4">
            {packingArray.map((item: string, index: number) => (
              <button
                key={index}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 my-4">
            <button
              onClick={() => setQuality((q) => Math.max(1, q - 1))}
              className="w-6 h-6 flex justify-center items-center border rounded text-base hover:bg-gray-100"
              aria-label="Giảm số lượng"
            >
              -
            </button>
            <input
              className="w-12 border rounded text-center text-sm"
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
              className="w-6 h-6 flex justify-center items-center border rounded text-base hover:bg-gray-100"
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>

          {/* <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded">
            Thêm vào giỏ hàng
          </button> */}

          <div className="pt-4">
            <h3 className="font-semibold">Đặc điểm nổi bật</h3>
            <p className="text-gray-700">Sản phẩm tuyệt vời cho sức khỏe.</p>
          </div>
          {/* Tiết kiệm + ưu đãi sinh viên */}
          <div className="text-sm text-red-600">
            Tiết kiệm thêm đến <b>93.000đ</b> cho Smember <br />
            Ưu đãi cho Học sinh - sinh viên, Giảng viên - giáo viên đến{" "}
            <b>155.000đ</b>
          </div>

          {/* Nút chọn trả góp 0% */}
          <button className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700">
            CHỌN TRẢ GÓP 0% <br />
            <span className="text-sm font-normal">
              Trả trước 0đ | Phụ phí 0đ
            </span>
          </button>

          {/* Nút mua ngay + thêm vào giỏ */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    id: product?.Id,
                    productname: product?.ProductName,
                    Price: product?.Price,
                    pathimg: product?.Image,
                    qualitiy: quality,
                    maxQuantity: 10
                  })
                )
              }
              className="flex-1 bg-red-500 text-white py-1.5 md:py-2 lg:py-3 rounded hover:bg-red-600 hover:cursor-pointer"
            >
              <span className="text-sm md:text-base lg:text-lg font-bold">
                MUA NGAY
              </span>
              <br />
              <span className="text-[10px] md:text-xs lg:text-sm font-normal">
                (Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)
              </span>
            </button>
            <button className="p-1.5 md:p-2 lg:p-3 border rounded text-red-500 hover:bg-gray-100">
              <span className="text-lg md:text-xl lg:text-2xl">🛒</span>
            </button>
          </div>

          {/* Trả góp 0% - 2 kiểu */}
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
              TRẢ GÓP 0% <br />
              <span className="text-xs">(Trả trước chỉ từ 0đ)</span>
            </button>
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm">
              TRẢ GÓP 0% QUA THẺ <br />
              <span className="text-xs">(Không phí chuyển đổi 3-6 tháng)</span>
            </button>
          </div>
          {/* Ưu đãi thêm */}
          <div className="border border-black/20 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3">Ưu đãi thêm</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Ưu đãi dành cho thành viên Smember</li>
              <li>✅ Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC</li>
              <li>
                ✅ Giảm đến 1 triệu khi thanh toán qua thẻ tín dụng Vietbank
              </li>
              <li>
                ✅ Giảm đến 1 triệu khi thanh toán qua thẻ Muadee by HDBank
              </li>
              <li>
                ✅ Giảm ngay 800K khi trả góp qua thẻ tín dụng Techcombank
              </li>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
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
