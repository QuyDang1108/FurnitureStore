import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Card, Input, Button, Select, Row, Col, Slider, Checkbox } from "antd";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearMessage,
  get_products,
} from "../../store/Reducers/productReducer";
import { toast } from "react-hot-toast";
const { Option } = Select;

const Shop = () => {
  const { products, errorMessage, loader } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_products());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(clearMessage());
  }, [errorMessage]);

  const [searchValue, setSearchValue] = useState("");
  const [sortAttribute, setSortAttribute] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedColor, setSelectedColor] = useState([]);

  const categories = ["Chair", "Table", "Sofa", "Bed", "Cabinet"];
  const materials = ["Wood", "Metal", "Plastic", "Glass", "Fabric"];
  const colors = ["Red", "Blue", "Green", "White", "Black"];
  const ratings = [5, 4, 3, 2, 1];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter(
      (product) =>
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.category)
    )
    .filter(
      (product) =>
        selectedMaterial.length === 0 ||
        selectedMaterial.includes(product.material)
    )
    .filter(
      (product) => selectedRating === null || product.rating >= selectedRating
    )
    .filter(
      (product) =>
        selectedColor.length === 0 || selectedColor.includes(product.color)
    )
    .sort((a, b) => {
      if (sortAttribute === "name") return a.name.localeCompare(b.name);
      if (sortAttribute === "price") return a.price - b.price;
      if (sortAttribute === "quantity") return a.quantity - b.quantity;
      return 0;
    });

  return (
    <div className="px-2 lg:px-7 p-5 bg-slate-100">
      {/* Bộ lọc */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <div>
          <h4 className="font-semibold">Price Range</h4>
          <Slider
            range
            defaultValue={[0, 5000000]}
            min={0}
            max={10000000}
            step={100000}
            onChange={(value) => setPriceRange(value)}
          />
          <p>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(priceRange[0])}{" "}
            -{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(priceRange[1])}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Category</h4>
          <Checkbox.Group
            options={categories}
            onChange={(values) => setSelectedCategory(values)}
          />
        </div>

        <div>
          <h4 className="font-semibold">Material</h4>
          <Checkbox.Group
            options={materials}
            onChange={(values) => setSelectedMaterial(values)}
          />
        </div>

        <div>
          <h4 className="font-semibold">Rating</h4>
          <Select
            placeholder="Select Rating"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedRating(value)}
            allowClear
          >
            {ratings.map((star) => (
              <Option key={star} value={star}>
                {`${star} Star${star > 1 ? "s" : ""}`}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <h4 className="font-semibold">Color</h4>
          <Checkbox.Group
            options={colors}
            onChange={(values) => setSelectedColor(values)}
          />
        </div>
      </div>

      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            addonAfter={<Button type="text" icon={<FaSearch />} />}
            style={{ width: 300 }}
          />
        </div>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <Select
            id="sort"
            value={sortAttribute}
            onChange={(value) => setSortAttribute(value)}
            style={{ width: 150 }}
          >
            <Option value="name">Name</Option>
            <Option value="price">Price</Option>
            <Option value="quantity">Quantity</Option>
          </Select>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <LazyProductCard key={product.id} product={product} />
        ))}
      </Row>
    </div>
  );
};

const LazyProductCard = ({ product }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();

  return (
    <Col xs={24} sm={12} md={8} lg={6} ref={ref}>
      {inView && (
        <Card
          hoverable
          cover={
            <img
              alt={product.name}
              src={product.image}
              style={{ height: 200, objectFit: "cover" }}
            />
          }
          onClick={() => navigate(`/customer/product/${product.id}`)}
        >
          <div style={{ textAlign: "start" }}>
            <h3
              style={{
                margin: "10px 0",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              {product.name}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#ff4d4f", // Màu đỏ nổi bật cho giá
                }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#555",
                  whiteSpace: "nowrap",
                }}
              >
                {`Stock: ${product.quantity}`}
              </p>
            </div>
          </div>
        </Card>
      )}
    </Col>
  );
};

export default Shop;
