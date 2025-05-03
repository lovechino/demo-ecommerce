"use client";

import { Button, Checkbox, Input } from "antd";
import { useState } from "react";
import { IoMdHome, IoIosArrowForward } from "react-icons/io";
import PaymentMethodModal from "./PaymentMethodModal";
const TabPayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="rounded-2xl p-5 border-gray-300 bg-white">
        <div className="uppercase ml-3 text-small">mã giảm giá</div>
        <div className="flex justify-between gap-3">
          <Input
            placeholder="Nhập mã giảm giá (chỉ áp dụng 1 lần)"
            variant="underlined"
            className="placeholder:text-lg !text-lg"
          />
          <Button className="!text-lg !h-10" disabled>
            Áp dụng
          </Button>
        </div>
        <div className="flex justify-between mt-5">
          <span className="text-lg text-gray-500">Số lượng sản phẩm</span>
          <span className="text-lg">123</span>
        </div>
        <div className="flex justify-between mt-5">
          <span className="text-lg text-gray-500">Tiền hàng (tạm tính)</span>
          <span className="text-lg">11.290.000đ</span>
        </div>
        <div className="flex justify-between mt-5">
          <span className="text-lg text-gray-500">Phí vận chuyển</span>
          <span className="text-lg">Miễn phí</span>
        </div>
        <div className="bg-gray-300 w-full h-[1px] my-5"></div>
        <div className="flex justify-between mt-5">
          <span className="text-lg font-semibold">Tổng tiền (đã gồm VAT)</span>
          <span className="text-lg">11.290.000đ</span>
        </div>
      </div>
      <div className="text-lg my-5 font-semibold uppercase">
        Thông tin thanh toán
      </div>
      <div
        className="rounded-2xl p-5 border-gray-300 bg-white flex justify-between cursor-pointer"
        onClick={() => closeModal()}
      >
        <div className="flex gap-5 items-center">
          <IoMdHome size={35} color="#E7072F" />
          <span className="text-xl font-semibold">Thanh toán tại cửa hàng</span>
        </div>
        <div className="flex gap-1">
          <span className="text-xl font-semibold text-[#E7072F]">Thay đổi</span>
          <IoIosArrowForward size={30} color="#E7072F" />
        </div>
      </div>
      <div className="text-lg my-5 font-semibold uppercase">
        Thông tin nhận hàng
      </div>
      <div className="rounded-2xl p-5 border-gray-300 bg-white flex flex-col">
        <div className="flex justify-between mt-5">
          <span className="text-lg text-gray-500">Khách hàng</span>
          <span className="text-lg">Quang Diệu </span>
        </div>
        <div className="flex justify-between mt-5">
          <span className="text-lg text-gray-500">Số điện thoại</span>
          <span className="text-lg">0939638111</span>
        </div>
        <div className="flex justify-between mt-5">
          <span className="text-lg text-gray-500">Email</span>
          <span className="text-lg">hihi123@gmail.com</span>
        </div>
        <div className="flex justify-between mt-5">
          <span className="text-lg text-gray-500">Nhận hàng tại</span>
          <span className="text-lg">
            55B Trần Quang Khải, P. Tân Định, Q. 1
          </span>
        </div>
      </div>
      <PaymentMethodModal isOpen={isOpen} closeModal={closeModal} />
      <div className="my-5">
        <Checkbox className="custom-checkbox !text-lg h-fit">
          Bằng việc Đặt hàng, bạn đồng ý với <a href="#">Điều khoản sử dụng</a>{" "}
          của Komex.
        </Checkbox>
      </div>
    </>
  );
};

export default TabPayment;
