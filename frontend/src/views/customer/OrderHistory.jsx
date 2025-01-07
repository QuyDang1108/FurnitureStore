import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Typography, Button, Modal } from "antd";
import { get_order_history } from "../../store/Reducers/orderReducer";
import { useState } from "react";

const { Title, Text } = Typography;

const OrderHistory = () => {
  const { orderHistory } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(get_order_history(1));
    }
  }, [dispatch, userInfo]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <Text>{new Date(text).toLocaleDateString()}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "Pending":
            color = "gold";
            break;
          case "Shipped":
            color = "blue";
            break;
          case "Delivered":
            color = "green";
            break;
          case "Cancelled":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Total Products",
      dataIndex: "products",
      key: "products",
      render: (products) => <Text>{products.length}</Text>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 bg-gray-50 rounded-lg shadow-md">
      <Title level={3} className="text-center mb-6">
        Order History
      </Title>
      <Table
        columns={columns}
        dataSource={orderHistory}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {selectedOrder && (
        <Modal
          title={`Order Details (ID: ${selectedOrder.id})`}
          open={isModalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>
              Close
            </Button>,
          ]}
        >
          <div className="mb-4">
            <Title level={5}>Shipping Information</Title>
            <Text>
              <b>Address:</b> {selectedOrder.shippingInfo.address}
            </Text>
            <br />
            <Text>
              <b>Phone:</b> {selectedOrder.shippingInfo.phone}
            </Text>
          </div>
          <div>
            <Title level={5}>Products</Title>
            {selectedOrder.products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <Text>{product.name}</Text>
                <Text>x{product.quantity}</Text>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderHistory;
