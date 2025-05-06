"use client";
import {
  deCreaseItem,
  inCreaseItem,
  removeItem,
  updateQuantity,
} from "@/Redux/cart";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { CartIntemType } from "@/Utils/type";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
// import emptyCart from "@/public/Image/tải xuống.jpg";

// Giả lập user đăng nhập
const user = {
  name: "Nguyễn Văn A",
  phone: "0912345678",
  email: "nguyenvana@email.com",
};

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState<CartIntemType[]>([]);
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  console.log("items", items);
  // Loading state cho cập nhật số lượng/xóa sản phẩm
  const [loading, setLoading] = useState(false);

  // Tổng số lượng sản phẩm đã chọn
  const selectedTotalQuantity = useMemo(() => {
    return selectedItems.reduce((total, item) => total + item.qualitiy, 0);
  }, [selectedItems]);

  // Mã giảm giá
  const [coupon, setCoupon] = useState("KEEPWARM");
  const [couponStatus, setCouponStatus] = useState<null | "success" | "error">(
    null
  );
  const [couponMessage, setCouponMessage] = useState("");

  const handleApplyCoupon = () => {
    setLoading(true);
    setTimeout(() => {
      if (coupon.trim().toUpperCase() === "KEEPWARM") {
        setCouponStatus("success");
        setCouponMessage("Mã giảm giá đã được áp dụng!");
      } else {
        setCouponStatus("error");
        setCouponMessage("Mã giảm giá không hợp lệ!");
      }
      setLoading(false);
    }, 800);
  };

  // Phương thức thanh toán (radio)
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const paymentMethods = [
    "Thanh toán khi nhận hàng",
    "Ví MOMO",
    "Thanh toán qua ZaloPay",
    "Ví điện tử VNPAY",
  ];

  const handleItemCheckboxChange = (item: CartIntemType) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems([...items]);
      console.log("đã chọn tất cả sản phẩm");
    } else {
      setSelectedItems([]);
    }
  };

  const isItemSelected = (item: CartIntemType) => {
    return selectedItems.some((selectedItem) => selectedItem.id === item.id);
  };

  // Tính tổng tiền của các sản phẩm đã chọn
  const selectedTotalAmount = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + item.Price * item.qualitiy,
      0
    );
  }, [selectedItems]);

  // Hàm lấy số lượng tối đa cho sản phẩm
  const getMaxQuantity = (item: CartIntemType): number => {
    return item.maxQuantity ?? 10;
  };

  // Hàm tăng số lượng sản phẩm, kiểm tra tồn kho
  const handleIncrease = (item: CartIntemType) => {
    const max = getMaxQuantity(item);
    if (item.qualitiy < max) {
      dispatch(inCreaseItem(item));
    } else {
      alert(`Số lượng tối đa cho sản phẩm này là ${max}`);
    }
  };

  // Xóa nhiều sản phẩm cùng lúc
  const handleRemoveSelected = () => {
    selectedItems.forEach((item) => dispatch(removeItem(item.id)));
    setSelectedItems([]);
  };

  // Lưu selectedItems vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  // Khi load trang, lấy lại selectedItems từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedCartItems");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSelectedItems(parsed);
      } catch {}
    }
    // eslint-disable-next-line
  }, []);

  // Khi user đã đăng nhập, tự động điền thông tin khách hàng
  useEffect(() => {
    if (user) {
      const nameInput = document.getElementById(
        "customerName"
      ) as HTMLInputElement;
      const phoneInput = document.getElementById(
        "customerPhone"
      ) as HTMLInputElement;
      const emailInput = document.getElementById(
        "customerEmail"
      ) as HTMLInputElement;
      if (nameInput) nameInput.value = user.name;
      if (phoneInput) phoneInput.value = user.phone;
      if (emailInput) emailInput.value = user.email;
    }
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row p-4 lg:p-8 gap-8">
        {/* Left section */}
        <section className="flex-1 space-y-8">
          {/* CoolCash Box */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
              Join CoolClub để nhận nhiều ưu đãi hơn
            </button>
            <div className="text-center text-sm text-gray-600">
              <p>
                Tham gia <strong>CoolClub</strong> để nhận ngay{" "}
                <strong>voucher -15%</strong> cho đơn hàng đầu tiên và hàng ngàn
                ưu đãi khác!
              </p>
              <Link href="#" className="text-blue-500 underline block mt-2">
                Tìm hiểu thêm
              </Link>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>

            {/* Customer Info */}
            <div className="space-y-4">
              {/* Name and Phone */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm">Họ và tên</label>
                  <div className="flex gap-2">
                    <select
                      className="border rounded-lg p-2"
                      defaultValue={"none"}
                    >
                      <option value="anh">Anh</option>
                      <option value="chi">Chị</option>
                      <option value="none">Anh/Chị</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên của bạn"
                      className="border rounded-lg p-2 flex-1"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm">Số điện thoại</label>
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-gray-100 rounded-lg">+84</span>
                    <input
                      type="number"
                      placeholder="Nhập số điện thoại"
                      className="border rounded-lg p-2 flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="Nhập email để theo dõi đơn hàng"
                  className="border rounded-lg p-2 w-full"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col md:flex-row gap-4">
                <select className="border rounded-lg p-2 flex-1">
                  <option>--Chọn Tỉnh/Thành phố--</option>
                </select>
                <select className="border rounded-lg p-2 flex-1">
                  <option>--Chọn Quận/Huyện--</option>
                </select>
                <select className="border rounded-lg p-2 flex-1">
                  <option>--Chọn Phường/Xã--</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <input
                  type="text"
                  placeholder="Ghi chú thêm cho đơn hàng"
                  className="border rounded-lg p-2 w-full"
                />
              </div>

              {/* Contact Others */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="callWithOtherPerson" />
                  <label htmlFor="callWithOtherPerson">
                    Gọi cho người khác
                  </label>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="male" />
                      <label htmlFor="male">Nam</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="female" />
                      <label htmlFor="female">Nữ</label>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="border rounded-lg p-2"
                    />
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="border rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold">Hình thức thanh toán</h2>

            {/* Payment options */}
            <div className="space-y-4">
              {paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 border rounded-lg"
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <label className="flex items-center gap-2">
                    <img
                      src={`https://mcdn.coolmate.me/image/October2024/mceclip${idx}_${
                        idx === 1 ? 171 : idx === 2 ? 6 : idx === 3 ? 81 : 42
                      }.png`}
                      className="w-8 h-8"
                      alt="payment"
                    />
                    {method}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm">
            Chính sách đổi trả và hoàn tiền{" "}
            <Link href="#" className="text-blue-500 underline">
              tại đây
            </Link>
            .
          </p>
        </section>

        {/* Right section */}
        <section className="flex-1 space-y-6">
          {/* Cart Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Giỏ hàng</h2>

            {/* Tổng số sản phẩm đã chọn */}
            {selectedItems.length > 0 && (
              <div className="mb-2 text-blue-600 font-semibold">
                Đã chọn {selectedTotalQuantity} sản phẩm
              </div>
            )}

            {/* Xóa nhiều sản phẩm đã chọn */}
            {selectedItems.length > 0 && (
              <div className="mb-2">
                <button
                  onClick={handleRemoveSelected}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Xóa các sản phẩm đã chọn
                </button>
              </div>
            )}

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                {/* <Image
                  src={emptyCart}
                  alt="empty cart"
                  className="w-32 h-32 mb-4"
                /> */}
                <em className="text-gray-400 mb-2">
                  Giỏ hàng của bạn đang trống\nBắt đầu mua sắm thôi!
                </em>
                <Link
                  href="/"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="chkAllItems"
                            onChange={handleCheckAll}
                            checked={
                              selectedItems.length === items.length &&
                              items.length > 0
                            }
                          />
                          <label htmlFor="chkAllItems">Tất cả sản phẩm</label>
                        </div>
                      </th>
                      <th className="p-3">ĐVT</th>
                      <th className="p-3">Số lượng</th>
                      <th className="p-3">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isItemSelected(item)}
                              onChange={() => handleItemCheckboxChange(item)}
                            />
                            {/* <img src="" alt="" className="w-16 h-16 bg-gray-200" /> */}
                            <div>
                              <Link href="#" className="font-semibold">
                                {item.productname}
                              </Link>
                              <div className="text-sm text-gray-500">
                                Thuộc tính sản phẩm
                              </div>
                              <div className="text-sm">{item.Price}</div>
                              {isItemSelected(item) && (
                                <div className="mt-2 text-sm text-blue-500">
                                  Thông tin chi tiết sản phẩm {item.productname}
                                  {/* Hiển thị thêm thông tin sản phẩm ở đây */}
                                </div>
                              )}
                              <button
                                onClick={() => dispatch(removeItem(item.id))}
                                className="text-red-500 text-xs mt-1"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">Đơn vị tính</td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              disabled={item.qualitiy <= 1}
                              onClick={() => dispatch(deCreaseItem(item))}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-lg font-semibold hover:bg-gray-100"
                            >
                              -
                            </button>

                            <input
                              type="number"
                              min="1"
                              value={item.qualitiy}
                              onChange={(e) =>
                                dispatch(
                                  updateQuantity({
                                    ...item,
                                    qualitiy: Number(e.target.value),
                                  })
                                )
                              }
                              className="w-12 h-8 text-center border border-gray-300 rounded"
                            />

                            <button
                              onClick={() => handleIncrease(item)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-lg font-semibold hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <p className="text-center">
                            {item.Price * item.qualitiy}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <em className="block text-sm text-gray-500 mt-4">
              Có <strong>15</strong> người khác cũng đang xem giỏ hàng này
            </em>
          </div>

          {/* Coupons */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              {[1, 2, 3].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border p-4 rounded-lg"
                >
                  <div>
                    <div className="font-semibold">KEEPWARM</div>
                    <div className="text-sm">
                      Tặng 1 đôi vớ khi mua đơn từ 299K
                    </div>
                    <div className="text-xs text-gray-500">HSD: 30/11/2024</div>
                  </div>
                  <input type="radio" name="coupon-select" />
                </div>
              ))}
            </div>
          </div>

          {/* Discount Actions */}
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div>
              Xóa mã giảm giá <b>KEEPWARM</b>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border p-2 rounded-lg"
                placeholder="Nhập mã giảm giá"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleApplyCoupon}
                disabled={loading}
              >
                Áp dụng
              </button>
            </div>
          </div>
          {couponStatus === "success" && (
            <p className="text-green-600 text-sm mt-1">{couponMessage}</p>
          )}
          {couponStatus === "error" && (
            <p className="text-red-600 text-sm mt-1">{couponMessage}</p>
          )}

          {/* Loading spinner */}
          {loading && (
            <div className="flex justify-center items-center my-2">
              <svg
                className="animate-spin h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              <span className="ml-2">Đang xử lý...</span>
            </div>
          )}

          {/* Pricing Info */}
          <div className="bg-white p-6 rounded-lg shadow space-y-2">
            <div className="flex justify-between">
              <p>Tạm tính</p>
              <p className="text-right">Giá tạm tính</p>
            </div>
            <div className="flex justify-between">
              <p>Giảm giá</p>
              <p>0đ</p>
            </div>
            <div className="flex justify-between">
              <p>Phí vận chuyển</p>
              <p>Miễn phí</p>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <p>Tổng cộng</p>
              <p>{selectedTotalAmount} VNĐ</p>{" "}
              {/* Hiển thị tổng tiền sản phẩm đã chọn */}
            </div>
          </div>
        </section>
      </div>

      {/* Payment Actions */}
      <div className="bg-white shadow p-6 mt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="https://www.coolmate.me/images/COD.svg" className="w-8" />
            <p>
              <strong>COD</strong> Thanh toán khi nhận hàng
            </p>
          </div>
          <div className="flex flex-col text-sm">
            <p>Voucher</p>
            <p>
              <strong>KEEPWARM</strong> Tặng ...
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {!user && (
            <Link href="/login" className="text-blue-500 underline">
              Đăng nhập
            </Link>
          )}
          <div className="flex flex-col items-end">
            <div className="font-semibold">
              Tổng tiền:{" "}
              <span className="text-blue-600">{selectedTotalAmount} VNĐ</span>{" "}
              {/* Hiển thị tổng tiền sản phẩm đã chọn */}
            </div>
          </div>
          <Link href={`/Cart/Payment`} className="w-full md:w-auto">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Thanh toán
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartPage;
