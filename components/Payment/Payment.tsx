"use client";
import Image from "next/image";
import Link from "next/link";

const Payment = () => {
  const orderItems = [
    {
      id: 1,
      name: "Smart Tivi Samsung 4K 75 inch Crystal UHD UA75DU7700 [75DU7700]",
      image: "/images/product1.jpg",
      quantity: 2,
      price: 100000,
    },
    {
      id: 2,
      name: "Smart Tivi Samsung 4K 75 inch Crystal UHD UA75DU7700 [75DU7700]",
      image: "/images/product2.jpg",
      quantity: 1,
      price: 150000,
    },
  ];

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
          Thanh toán thành công!
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-green-100 rounded-md p-4 mb-4 text-sm text-green-800">
            Cảm ơn bạn. Đơn hàng của bạn đã được thanh toán và xác nhận thành công.
          </div>

          {/* Thông tin sản phẩm */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Sản phẩm đã đặt</h2>
            <div className="flex flex-col gap-4">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="inline-flex items-center gap-4 p-3 bg-gray-50 rounded-lg w-full"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-700">Số lượng: {item.quantity}</p>
                      <p className="text-sm text-gray-700">
                        {item.price.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <span className="font-semibold">Mã đơn hàng:</span> 280
              </p>
              <p className="text-sm">
                <span className="font-semibold">Ngày:</span> 07/05/2025
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email:</span> nam1@gmail.com
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Tổng cộng:</span>{" "}
                {total.toLocaleString("vi-VN")}đ
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Phương thức thanh toán:</span>{" "}
                Chuyển khoản ngân hàng (hoặc COD,...)
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home button */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
