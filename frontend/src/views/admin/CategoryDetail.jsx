import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Button, Image, Input, Modal, Form } from "antd";
import {
  clearMessage,
  get_category,
  update_category,
  delete_category,
} from "../../store/Reducers/categoryReducer";
import toast from "react-hot-toast";

const { Meta } = Card;

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, loader, errorMessage, success } = useSelector(
    (state) => state.categories
  );

  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(get_category(id));
    return () => {
      dispatch(clearMessage());
    };
  }, [id]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (success) {
      toast.success("Update successful!");
    }
  }, [success, errorMessage]);

  const handleSave = (values) => {
    dispatch(update_category({ id, ...values }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Confirm Delete Category",
      content: "Are you sure you want to delete this category?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(delete_category(id));
        toast.success("Deleted successfully!");
        navigate("/categories");
      },
    });
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      {category ? (
        <Card
          hoverable
          style={{ width: 400 }}
          cover={<Image src={category.image} alt={category.name} />}
        >
          {isEditing ? (
            <Form
              form={form}
              initialValues={{ name: category.name, image: category.image }}
              onFinish={handleSave}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Name cannot be empty!" }]}
              >
                <Input placeholder="Category Name" />
              </Form.Item>
              <Form.Item
                name="image"
                rules={[
                  { required: true, message: "Image URL cannot be empty!" },
                ]}
              >
                <Input placeholder="Image URL" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <>
              <Meta
                title={<div className="text-xl font-bold">{category.name}</div>}
                description={
                  <div>
                    <p className="mt-2 text-gray-600">
                      This is the <strong>{category.name}</strong> category.
                    </p>
                  </div>
                }
              />
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsEditing(true)} type="primary">
                  Edit Category
                </Button>
              </div>
            </>
          )}
          <div className="mt-4 flex justify-end">
            <Button danger onClick={handleDelete}>
              Delete Category
            </Button>
          </div>
        </Card>
      ) : (
        <p>Category information not found.</p>
      )}
    </div>
  );
};

export default CategoryDetail;
