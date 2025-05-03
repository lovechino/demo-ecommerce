"use client";

import { Modal } from "antd";
import { IoMdHome } from "react-icons/io";
import { FaCcApplePay } from "react-icons/fa";

const PaymentMethodModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  return (
    <>
      <Modal
        open={isOpen}
        centered
        title="Chọn phương thức thanh toán"
        footer={
          <button className="shadow-top text-xl text-white w-full bg-[#E7072F] py-2 rounded">
            Xác nhận
          </button>
        }
        onCancel={closeModal}
      >
        <div>
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar px-3">
            <span className="text-lg uppercase">Khả dụng</span>
            <div className="flex gap-5 items-center border-[0.3px] border-gray-300 rounded-2xl p-3 mt-2 hover:bg-[#FFDADA]">
              <IoMdHome size={35} color="#E7072F" />
              <span className="text-xl font-semibold">
                Thanh toán tại cửa hàng
              </span>
            </div>
            <div className="flex gap-5 items-center border-[0.3px] border-gray-300 rounded-2xl p-3 mt-5 hover:bg-[#FFDADA]">
              <FaCcApplePay size={35} color="#E7072F" />
              <span className="text-xl font-semibold">Apple Pay</span>
            </div>
            <div className="flex gap-5 items-center border-[0.3px] border-gray-300 rounded-2xl p-3 mt-5 hover:bg-[#FFDADA]">
              <FaCcApplePay size={35} color="#E7072F" />
              <span className="text-xl font-semibold">Apple Pay</span>
            </div>
            <div className="flex gap-5 items-center border-[0.3px] border-gray-300 rounded-2xl p-3 mt-5 hover:bg-[#FFDADA]">
              <FaCcApplePay size={35} color="#E7072F" />
              <span className="text-xl font-semibold">Apple Pay</span>
            </div>
            <div className="flex gap-5 items-center border-[0.3px] border-gray-300 rounded-2xl p-3 mt-5 hover:bg-[#FFDADA]">
              <FaCcApplePay size={35} color="#E7072F" />
              <span className="text-xl font-semibold">Apple Pay</span>
            </div>
            <div className="flex gap-5 items-center border-[0.3px] border-gray-300 rounded-2xl p-3 mt-5 hover:bg-[#FFDADA]">
              <FaCcApplePay size={35} color="#E7072F" />
              <span className="text-xl font-semibold">Apple Pay</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PaymentMethodModal;
