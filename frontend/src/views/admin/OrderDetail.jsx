import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearMessage, get_order } from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";

const OrderDetail = () => {
  const dispatch = useDispatch();

  const { order, success, errorMessage } = useSelector((state) => state.orders);
  const { id } = useParams();

  useEffect(() => {
    dispatch(get_order(id));
    return () => {
      dispatch(clearMessage());
    };
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(clearMessage());
  }, [success, errorMessage]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold mb-4">Order Details</h1>

        {/* Thông tin chung */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="mb-4">
              <span className="font-bold">Order ID:</span> {order.orderId}
            </p>
            <p className="mb-4">
              <span className="font-bold">Customer ID:</span> {order.customerId}
            </p>
            <p className="mb-4">
              <span className="font-bold">Status:</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded ml-2 text-sm">
                {order.status}
              </span>
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="mb-4">
              <span className="font-bold">Date:</span> {order.createdDate}
            </p>
            <p className="mb-4">
              <span className="font-bold">Address:</span> {order.address}
            </p>
            <p className="mb-4">
              <span className="font-bold">Total:</span> {order.totalAmount}
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
            {order.products &&
              order.products.map((product) => (
                <tr key={product.productId}>
                  <td className="py-2 px-4 border-b text-center">
                    {product.productId}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {product.amount}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {product.price}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {product.amount * product.price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
