import Image from "next/image";
import React from "react";
import LogoImage from "@/public/Image/komex-digital-logo_a39f6b3a05934b128b6b2e4e11ee89e1.webp";
import notificationImage from "@/public/Image/dathongbao_48067cd02fae41b68bf0294777c39c94_compact.png";
import zaloImage from "@/public/Image/zalo1.png";
import faceImage from "@/public/Image/facebook.png";
import tiktookImage from "@/public/Image/icon_left_icon_1.webp";
import youtubeImage from "@/public/Image/youtube.png";
import messImage from "@/public/Image/messenger-fb_8fcc524fbaad4b1195a150dc5e0575d7.webp";
import codImage1 from "@/public/Image/2_anhicon1.webp";
import codImage2 from "@/public/Image/2_anhicon2.webp";

const Footer = () => {
  return (
    <footer className=" hidden md:bg-black md:py-12 md:px-6 md:px-12 lg:px-24">
      {/* <section className=" py-4 border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg text-white d-flex row d-flex-center">
            Đăng kí nhận tin
          </h2>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 w-full md:w-80 bg-white text-black rounded-l"
            />
            <button className="text-white px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-r text-white font-semibold">
              <i className="fas fa-paper-plane mr-1"></i> Đăng ký
            </button>
          </div>
        </div>
      </section> */}
      <div className="bg-black text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg uppercase font-semibold whitespace-nowrap">
            ĐĂNG KÍ NHẬN TIN
          </div>
          <div className="flex items-center gap-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email"
              className="pl-10 pr-4 py-2 w-full bg-white text-black rounded-l outline-none"
            />
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-r text-white font-semibold whitespace-nowrap">
              <i className="fas fa-paper-plane mr-1"></i>
              Đăng ký
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://zalo.me/0922306268"
              className="bg-blue-500 p-1 rounded-md"
            >
              <Image
                src={zaloImage}
                className="w-8 cursor-pointer"
                alt="Zalo"
              />
            </a>
            <a href="" className="bg-black p-1 rounded-md">
              <Image
                src={tiktookImage}
                className="w-8 cursor-pointer"
                alt="TikTok"
              />
            </a>
            <a
              href="https://www.facebook.com/komexdigital"
              className="bg-blue-700 p-1 rounded-md"
            >
              <Image
                src={faceImage}
                className="w-8 cursor-pointer"
                alt="Facebook"
              />
            </a>
          </div>
        </div>
        <hr className="border-t border-white/30 mt-5" />
      </div>
      <div className="container mx-auto text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div className="mb-8 md:mb-0">
          <a href="#" className="flex items-center mb-4">
            <Image
              src={LogoImage}
              alt="Logo"
              height={50}
              width={200}
              className="w-32 mb-4"
            />
          </a>
          <p className="mb-3 font-semibold uppercase text-white">
            Công Ty Cổ Phần Komex Việt Nam
          </p>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-start gap-2">
              📍{" "}
              <span>
                Địa chỉ: Thôn Thạch Lỗi, Xã Thanh Xuân, Huyện Sóc Sơn, Hà Nội
              </span>
            </li>
            <li className="flex items-start gap-2">
              📞 <span>1900 0267</span>
            </li>
            <li className="flex items-start gap-2">
              ✉ <span>tmdt@komex.com.vn</span>
            </li>
            <li>MST: 0102675442</li>
            <li>Cấp ngày: 11/03/2008</li>
            <li>Nơi cấp: Phòng ĐKKD - Sở KH&ĐT TP Hà Nội</li>
          </ul>
          <a
            href="http://online.gov.vn/Home/WebDetails/117272"
            className="flex items-center mt-4"
          >
            <Image
              src={notificationImage}
              alt="Đã thông báo BCT"
              width={100}
              height={100}
              className="mt-5 w-28"
            />
          </a>

          {/* <!-- Social icons floating left & right --> */}
          <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex-col gap-4 hidden md:flex">
            <a href="https://www.tiktok.com/@komex.digital" rel="nofollow">
              <Image
                src={tiktookImage}
                className="w-8 cursor-pointer"
                alt="TikTok"
              />
            </a>
            <a href="https://www.facebook.com/komexdigital" rel="nofollow">
              <Image
                src={faceImage}
                className="w-8 cursor-pointer"
                alt="Facebook"
              />
            </a>
            <a href="https://www.youtube.com/@komexdigital" rel="nofollow">
              <Image
                src={youtubeImage}
                className="w-8 cursor-pointer"
                alt="YouTube"
              />
            </a>
          </div>
          <div className="fixed right-2 top-1/2 transform -translate-y-1/2 flex-col gap-4 hidden md:flex">
            <a href="https://www.messenger.com/t/komexdigital" rel="nofollow">
              <Image
                src={messImage}
                className="w-8 cursor-pointer"
                alt="Messenger"
              />
            </a>
            <a href="https://zalo.me/0922306268" rel="nofollow">
              <Image
                src={zaloImage}
                className="w-8 cursor-pointer"
                alt="Zalo"
              />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h6 className="font-bold mb-4 uppercase text-white text-sm">
            Danh mục nổi bật
          </h6>
          <ul className="space-y-2 text-white text-sm">
            <li className="mb-2">
              <a href="#" className="hover:text-red-500 transition">
                Đang Khuyến Mãi
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500 transition">
                Smart Tivi
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500 transition">
                Thiết Bị Gia Dụng
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500 transition">
                Robot Hút Bụi
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500 transition">
                Lọc Không Khí
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Quạt Thông Minh
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Điện Lạnh
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Camera Giám Sát
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Thiết bị sức khỏe
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Thiết Bị Tin Học
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h6 className="font-semibold text-white mb-4 uppercase">
            Hỗ trợ khách hàng
          </h6>
          <ul className="text-white text-sm">
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Hướng dẫn mua hàng
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Chính Sách Bảo Hành
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Chăm Sóc Khách Hàng
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Chính sách kiểm hàng
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Chính sách đổi trả
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Phương thức thanh toán
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Thông tin về vận chuyển
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                Chính sách bảo vệ thông tin của khách hàng
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h6 className="font-semibold text-white mb-4 uppercase">
            Tổng đài hỗ trợ
          </h6>
          <ul className="text-white text-sm">
            <li className="mb-2">
              <a href="#" className="hover:text-red-500">
                GỌI BẢO HÀNH 0928206268- 0922306268 (8h-17h)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                GỌI HỖ TRỢ KỸ THUẬT: 0862858466 (8h-17h)
              </a>
            </li>
          </ul>
          <h4 className="text-white uppercase font-bold mb-3">
            Phương Thức Thanh Toán
          </h4>
          <div className="flex gap-4">
            <a href="#">
              <Image src={codImage1} alt="COD 1" className="w-14" />
            </a>
            <a href="#">
              <Image src={codImage2} alt="COD 2" className="w-14" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-xs">
        © Copyright 2025 By Komex Digital.Powered by Komex Việt Nam.
      </div>
    </footer>
  );
};

export default Footer;
