import React from "react";

const OrderDetail = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold mb-4">Order Details</h1>

        {/* Thông tin chung */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-md">
            <p>
              <span className="font-bold">Order ID:</span> #12345
            </p>
            <p>
              <span className="font-bold">Customer ID:</span> KH0001
            </p>
            <p>
              <span className="font-bold">Status:</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded ml-2 text-sm">
                Confirmed
              </span>
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-md">
            <p>
              <span className="font-bold">Date:</span> 2024-12-01
            </p>
            <p>
              <span className="font-bold">Address:</span> 123 Sushi Street
            </p>
            <p>
              <span className="font-bold">Total:</span> $123.45
            </p>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product ID</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">P001</td>
              <td className="py-2 px-4 border-b text-center">2</td>
              <td className="py-2 px-4 border-b text-center">$12.99</td>
              <td className="py-2 px-4 border-b text-center">$25.98</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">P002</td>
              <td className="py-2 px-4 border-b text-center">1</td>
              <td className="py-2 px-4 border-b text-center">$9.99</td>
              <td className="py-2 px-4 border-b text-center">$9.99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
