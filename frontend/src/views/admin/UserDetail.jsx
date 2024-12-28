import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearMessage,
  get_user,
  update_user,
} from "../../store/Reducers/userReducer";
import toast from "react-hot-toast";

const UserDetail = () => {
  const dispatch = useDispatch();
  const { user, loader, errorMessage, success } = useSelector(
    (state) => state.users
  );

  const [status, setStatus] = useState(user.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const { id } = useParams();
  useEffect(() => {
    dispatch(get_user(id));
  }, [id]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(clearMessage());
  }, [success, errorMessage]);

  useEffect(() => {
    dispatch(update_user({ id, status }));
  }, [status]);

  const handleOpenModal = (status) => {
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const handleConfirmChange = () => {
    setStatus(newStatus);
    setIsModalOpen(false);
  };

  const handleCancelChange = () => {
    setIsModalOpen(false);
    setNewStatus("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Thông tin người dùng</h1>
          <span
            className={`px-3 py-1 rounded-full text-white ${
              status === "Hoạt động"
                ? "bg-green-500"
                : status === "Tạm ngưng"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Thông tin cá nhân */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-bold">Mã người dùng:</p>
            <p>KH0001</p>
          </div>
          <div>
            <p className="font-bold">Họ và tên:</p>
            <p>Nguyễn Văn A</p>
          </div>
          <div>
            <p className="font-bold">Email:</p>
            <p>nguyenvana@gmail.com</p>
          </div>
          <div>
            <p className="font-bold">Số điện thoại:</p>
            <p>0123 456 789</p>
          </div>
          <div>
            <p className="font-bold">Địa chỉ:</p>
            <p>123 Sushi Street, Hà Nội</p>
          </div>
          <div>
            <p className="font-bold">Ngày sinh:</p>
            <p>01/01/1990</p>
          </div>
          <div>
            <p className="font-bold">Giới tính:</p>
            <p>Nam</p>
          </div>
        </div>

        {/* Chỉnh sửa trạng thái */}
        <div className="bg-gray-50 p-4 rounded-md shadow-md">
          <h2 className="font-bold mb-4">Thay đổi trạng thái tài khoản</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleOpenModal("Hoạt động")}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Kích hoạt
            </button>
            <button
              onClick={() => handleOpenModal("Tạm ngưng")}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Tạm ngưng
            </button>
            <button
              onClick={() => handleOpenModal("Khóa")}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Khóa
            </button>
          </div>
        </div>
      </div>

      {/* Modal xác nhận */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Xác nhận thay đổi</h2>
            <p className="mb-4">
              Bạn có chắc muốn thay đổi trạng thái tài khoản sang{" "}
              <span className="font-bold">{newStatus}</span> không?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelChange}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
