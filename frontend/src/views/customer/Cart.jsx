import React, { useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { Input, Button, Table, Space, Typography, Checkbox } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Cart = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "image1.jpg",
      price: 10,
      quantity: 1,
      selected: false,
    },
    {
      id: 2,
      name: "Product 2",
      image: "image2.jpg",
      price: 20,
      quantity: 2,
      selected: false,
    },
    {
      id: 3,
      name: "Product 3",
      image: "image3.jpg",
      price: 30,
      quantity: 1,
      selected: false,
    },
  ]);
  const [selectAll, setSelectAll] = useState(false);

  const handleQuantityChange = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleSelectItem = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCart(cart.map((item) => ({ ...item, selected: !selectAll })));
  };

  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPrice = filteredCart.reduce(
    (total, item) =>
      total + item.price * item.quantity * (item.selected ? 1 : 0),
    0
  );
  const totalItems = filteredCart.filter((item) => item.selected).length;

  const columns = [
    {
      title: <Checkbox checked={selectAll} onChange={handleSelectAll} />,
      dataIndex: "selected",
      render: (text, record) => (
        <Checkbox
          checked={record.selected}
          onChange={() => handleSelectItem(record.id)}
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => (
        <img
          src={record.image}
          alt={record.name}
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => `$${text}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text, record) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleQuantityChange(record.id, -1)}
            size="small"
          />
          <Input
            value={text}
            readOnly
            style={{ width: 40, textAlign: "center" }}
            bordered={false}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleQuantityChange(record.id, 1)}
            size="small"
          />
        </Space>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (text, record) => `$${record.price * record.quantity}`,
    },
    {
      title: "Action",
      render: (text, record) => (
        <Button
          icon={<FaTrash />}
          onClick={() => handleRemoveItem(record.id)}
          type="text"
          danger
        />
      ),
    },
  ];

  return (
    <div className="px-2 lg:px-7 p-5 my-5 rounded shadow-md">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products"
            prefix={<FaSearch />}
            style={{ width: 250, marginRight: 16 }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Table
          columns={columns}
          dataSource={filteredCart}
          rowKey="id"
          pagination={false}
        />
      </div>

      <div className="mt-5 p-4 border border-gray-300 rounded-md bg-white">
        <div className="flex justify-between items-center mb-3">
          <Checkbox checked={selectAll} onChange={handleSelectAll}>
            Select All
          </Checkbox>
          <div>
            <Text>Total Items: {totalItems}</Text>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Text strong>Total Price: ${totalPrice}</Text>
          <Button type="primary" size="large">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
