"use client";

import { Checkbox, Input, Tabs } from "antd";
import ListOrderProduct from "../Product/ListOrderProduct";
// import "@/Styles/Payment.css"
import TabPickOnStore from "./TabPickOnStore";
import TabShipping from "./TabShipping";
import { useState } from "react";
import type { CheckboxProps } from "antd";
import { baseURL } from "@/Utils/Axios";

const listOrderProduct = [
  {
    id: "1",
    name: "Tai nghe Gaming chụp tai không dây Sony INZONE H5-Đen",
    price: 2590000,
    sale_price: 1000000,
    quantity: 2,
    img: `${baseURL}/uploads/images/Screenshot_22_0e52f52a.png`,
  },
  {
    id: "2",
    name: "Tai nghe Gaming chụp tai không dây Sony INZONE H5-Đen",
    price: 2590000,
    sale_price: 1000000,
    quantity: 2,
    img: `${baseURL}/uploads/images/Screenshot_22_0e52f52a.png`,
  },
];

const TabPaymentInfo = () => {
  const [companyInvoiceVisible, setCompanyInvoiceVisible] = useState(false);

  const hanldeOpenCompanyInvoice: CheckboxProps["onChange"] = (e) => {
    setCompanyInvoiceVisible(e.target.checked);
  };

  return (
    <>
      <div className="rounded-2xl p-5 border-[0.3px] border-gray-300 bg-white">
        <ListOrderProduct products={listOrderProduct} />
      </div>
      <div className="text-lg my-5 font-semibold uppercase">
        Thông tin khách hàng
      </div>
      <div className="rounded-2xl border-[0.3px] border-gray-300 p-5 bg-white">
        <div className="flex justify-between">
          <div className="text-lg">Quang Diệu</div>
          <div className="text-[16px] text-gray-500">0939638911</div>
        </div>
        <div className="flex flex-col gap-5 mt-3">
          <Input placeholder="Email" className="placeholder:text-lg" />
          <i className="text-gray-400">
            {" "}
            (*) Hóa đơn VAT sẽ được gửi qua email này
          </i>
        </div>
      </div>
      <div className="text-lg my-5 font-semibold uppercase">
        Thông tin nhận hàng
      </div>
      <div className="rounded-2xl border-[0.3px] border-gray-300 px-5 pb-5 bg-white">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Nhận tại của hàng",
              key: "1",
              children: <TabPickOnStore />,
            },
            {
              label: "Giao hàng tận nơi",
              key: "2",
              children: <TabShipping />,
            },
          ]}
          size="large"
          className="custom-tabs-delivery w-full"
        />
      </div>
      <div className="my-5">
        <Checkbox
          onChange={hanldeOpenCompanyInvoice}
          className="custom-checkbox !text-lg h-fit"
        >
          Yêu cầu xuất hoá đơn công ty
        </Checkbox>
      </div>
      {companyInvoiceVisible && (
        <div className="bg-white rounded-2xl p-5">
          <div className="text-gray-500 uppercase ml-3 text-small">
            tên công ty
          </div>
          <Input
            placeholder="Tên công ty"
            variant="underlined"
            className="placeholder:text-lg"
          />
          <div className="text-gray-500 uppercase ml-3 text-small mt-3">
            địa chỉ
          </div>
          <Input
            placeholder="Địa chỉ công ty"
            variant="underlined"
            className="placeholder:text-lg"
          />
          <div className="text-gray-500 uppercase ml-3 text-small mt-3">
            mã số thuế
          </div>
          <Input
            placeholder="Mã số thuế"
            variant="underlined"
            className="placeholder:text-lg"
          />
        </div>
      )}
    </>
  );
};

export default TabPaymentInfo;
