"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/Image/z5947605114220_b2cfd591298cd5a7b10cccb76d349c61_1024x1024.webp";

const categories = [
  { icon: "📱", label: "Điện thoại, Tablet", anchor: "#dien-thoai" },
  { icon: "💻", label: "Laptop", anchor: "#laptop" },
  { icon: "🎧", label: "Âm thanh, Mic thu âm", anchor: "#am-thanh" },
  { icon: "⌚", label: "Đồng hồ, Camera", anchor: "#dong-ho" },
  { icon: "🏠", label: "Đồ gia dụng", anchor: "#do-gia-dung" },
  { icon: "👜", label: "Phụ kiện", anchor: "#phu-kien" },
  { icon: "💻", label: "PC, Màn hình, Máy in", anchor: "#pc" },
  { icon: "📺", label: "Tivi", anchor: "#tivi" },
];

const banners = [
  {
    src: "https://file.hstatic.net/200000637881/file/z5947605114220_b2cfd591298cd5a7b10cccb76d349c61_1024x1024.jpg",
    alt: "Galaxy M55",
    href: "#galaxy-m55",
  },
  {
    src: "https://file.hstatic.net/200000637881/file/z5947605114220_b2cfd591298cd5a7b10cccb76d349c61_1024x1024.jpg",
    alt: "iPad Air",
    href: "#ipad-air",
  },
  {
    src: "https://file.hstatic.net/200000637881/file/z5947605114220_b2cfd591298cd5a7b10cccb76d349c61_1024x1024.jpg",
    alt: "iPad Air",
    href: "#ipad-air",
  },
  {
    src: "https://file.hstatic.net/200000637881/file/z5947605114220_b2cfd591298cd5a7b10cccb76d349c61_1024x1024.jpg",
    alt: "Laptop Sale",
    href: "#laptop-sale",
  },
];

const Hero = () => {
  return (
    <section className=" hidden md:px-4 md:py-5 md:bg-gray-50 md:flex md:justify-center md:items-start md:gap-6 md:h-500px">
      {/* Sidebar */}
      <aside className="w-56 bg-white p-5 shadow-sm space-y-5 ">
        <ul className="space-y-3 text-sm">
          {categories.map((item) => (
            <li key={item.label}>
              <Link
                href={item.anchor}
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 h-500px rounded-md text-sm transition"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex gap-4 px-6">
        <div className="flex-1 relative">
          <Image
            src={heroImage}
            alt="Banner"
            className="rounded-lg shadow-lg object-cover"
            width={1000}
            height={100}
            priority
          />
        </div>
        {/* banner phụ bên phải */}
        <div className="w-52 space-y-3  pr-2 h-full flex flex-col justify-start">
          {banners.map((banner, index) => (
            <a key={index} href={banner.href}>
              <Image
                src={banner.src}
                alt={banner.alt}
                width={300}
                height={100}
                className="rounded shadow hover:scale-105 transition-transform mt-2"
              />
            </a>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Hero;
