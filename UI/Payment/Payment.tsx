import { IoMdArrowBack } from "react-icons/io";
import { Tabs } from "antd";
// import "@/Styles/Payment.css"
import TabPaymentInfo from "@/components/Payment/TabPaymentInfo";
import TabPayment from "@/components/Payment/TabPayment";

const PaymentPage = () => {
  return (
    <>
      <div className="flex justify-center bg-gray-100">
        <div className="flex flex-col w-[50%]">
          <div className="flex justify-between items-center my-5">
            <i>
              <IoMdArrowBack size={30} />
            </i>
            <div className="text-center text-xl font-semibold flex-1">
              Thông tin
            </div>
          </div>
          <div className="bg-gray-300 w-full h-[1px]"></div>
          <div className="flex justify-center mb-15">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: "1. THÔNG TIN",
                  key: "1",
                  children: <TabPaymentInfo />,
                },
                {
                  label: "2. THANH TOÁN",
                  key: "2",
                  children: <TabPayment />,
                },
              ]}
              size="large"
              className="custom-tabs-payment w-full"
            />
          </div>
          <div className="sticky bottom-0 bg-white p-5 rounded-xl shadow-top">
            <div className="flex justify-between">
              <div className="text-lg">Tổng tiền tạm tính</div>
              <div className="text-lg text-red-600">1000000đ</div>
            </div>
            <span className="py-3">Chưa gồm chiết khấu SMember</span>
            <div className="p-3 w-full text-center bg-red-700 rounded text-white">
              Tiếp tục
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
