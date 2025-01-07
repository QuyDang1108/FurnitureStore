import React, { useEffect, useState } from "react";
import { FaImage, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  add_product,
  clearMessage,
} from "./../../store/Reducers/productReducer";
import { toast } from "react-hot-toast";
import { get_categories } from "./../../store/Reducers/categoryReducer";
import { get_materials } from "./../../store/Reducers/materialReducer";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    materialId: "",
    origin: "",
    size: "",
    description: "",
    images: [],
    stock: 0,
  });
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);
  const [isMaterialFocused, setIsMaterialFocused] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [materialName, setMaterialName] = useState("");

  const { categories } = useSelector((state) => state.categories);
  const { materials } = useSelector((state) => state.materials);

  useEffect(() => {
    dispatch(get_categories());
    dispatch(get_materials());
  }, []);

  useEffect(() => {
    setFilteredCategories(categories);
    setFilteredMaterials(materials);
  }, [categories, materials]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, success, errorMessage } = useSelector(
    (state) => state.products
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    if (name === "categoryId") {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (name === "materialId") {
      setFilteredMaterials(
        materials.filter((material) =>
          material.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setProduct((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_product(product));
  };

  useEffect(() => {
    if (success) {
      toast.success("Product added successfully");
      dispatch(clearMessage());
      navigate("/admin/products");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
  }, [success, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Add Product</h1>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full p-4">
          <div className="bg-white p-5 rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-wrap">
              {/* Left Column */}
              <div className="w-full lg:w-1/2 pr-2">
                {/* Name */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    className="px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full"
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                  />
                </div>

                {/* Images */}
                <div className="mb-4">
                  <label
                    className="flex justify-center items-center flex-col h-[313px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]"
                    htmlFor="images"
                  >
                    <span>
                      <FaImage />
                    </span>
                    <span>Select Images</span>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    onChange={handleImageChange}
                  />
                  {/* Image Preview */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product?.images?.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full lg:w-1/2 pl-2">
                {/* Price */}
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    className="px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full"
                    type="text"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                  />
                </div>

                {/* Category */}
                <div className="mb-4 relative">
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <div className="flex items-center border border-slate-700 rounded-md">
                    <span className="px-2 text-gray-500">
                      <FaSearch />
                    </span>
                    <input
                      className="px-4 py-2 outline-none bg-white text-black w-full"
                      type="text"
                      id="categoryId"
                      name="categoryId"
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                        setFilteredCategories(
                          categories?.filter((category) =>
                            category?.name
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                          )
                        );
                      }}
                      placeholder="Search Category"
                      onFocus={() => setIsCategoryFocused(true)}
                      onBlur={() =>
                        setTimeout(() => setIsCategoryFocused(false), 100)
                      }
                    />
                  </div>
                  {isCategoryFocused && filteredCategories?.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto z-10">
                      {filteredCategories.map((category) => (
                        <li
                          key={category.id}
                          onClick={() => {
                            setProduct({
                              ...product,
                              categoryId: category.id,
                            });
                            setCategoryName(category.name);
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Material */}
                <div className="mb-4 relative">
                  <label
                    htmlFor="materialId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Material
                  </label>
                  <div className="flex items-center border border-slate-700 rounded-md">
                    <span className="px-2 text-gray-500">
                      <FaSearch />
                    </span>
                    <input
                      className="px-4 py-2 outline-none bg-white text-black w-full"
                      type="text"
                      id="materialId"
                      name="materialId"
                      value={materialName}
                      onChange={(e) => {
                        setMaterialName(e.target.value);
                        setFilteredMaterials(
                          materials?.filter((material) =>
                            material?.name
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                          )
                        );
                      }}
                      placeholder="Search Material"
                      onFocus={() => setIsMaterialFocused(true)}
                      onBlur={() =>
                        setTimeout(() => setIsMaterialFocused(false), 100)
                      }
                    />
                  </div>
                  {isMaterialFocused && filteredMaterials?.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto z-10">
                      {filteredMaterials?.map((material) => (
                        <li
                          key={material.id}
                          onClick={() => {
                            setProduct({
                              ...product,
                              materialId: material.id,
                            });
                            setMaterialName(material.name);
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {material.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Origin */}
                <div className="mb-4">
                  <label
                    htmlFor="origin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Origin
                  </label>
                  <input
                    className="px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full"
                    type="text"
                    id="origin"
                    name="origin"
                    value={product.origin}
                    onChange={handleInputChange}
                    placeholder="Origin"
                  />
                </div>

                {/* Size */}
                <div className="mb-4">
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Size
                  </label>
                  <input
                    className="px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full"
                    type="text"
                    id="size"
                    name="size"
                    value={product.size}
                    onChange={handleInputChange}
                    placeholder="Size"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    className="px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stock
                  </label>
                  <input
                    className="px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full"
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    placeholder="Stock"
                  />
                </div>

                {/* Add Product Button */}
                <div className="mb-4">
                  <button
                    className="bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg 
                                    text-white rounded-md px-7 py-2 my-2"
                  >
                    Add Product
                  </button>
                </div>
              </div>

              <div className="w-full"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
