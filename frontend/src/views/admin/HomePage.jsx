import React, { useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import ProductCard from '../util/ProductCard';

const HomePage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [sortAttribute, setSortAttribute] = useState("name");
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", image: "image1.jpg", price: "$10", quantity: 5 },
        { id: 2, name: "Product 2", image: "image2.jpg", price: "$20", quantity: 3 },
        { id: 3, name: "Product 3", image: "image3.jpg", price: "$30", quantity: 8 },
        { id: 4, name: "Product 4", image: "image4.jpg", price: "$40", quantity: 2 },
        { id: 5, name: "Product 5", image: "image5.jpg", price: "$50", quantity: 6 },
        { id: 6, name: "Product 6", image: "image6.jpg", price: "$60", quantity: 1 },
        { id: 7, name: "Product 7", image: "image7.jpg", price: "$70", quantity: 4 },
        { id: 8, name: "Product 8", image: "image8.jpg", price: "$80", quantity: 7 },
    ]);

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search..."
                        className="border p-2 rounded-l-md"
                    />
                    <button className="bg-blue-500 p-2 rounded-r-md text-white">
                        <FaSearch />
                    </button>
                </div>
                <div>
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select
                        id="sort"
                        value={sortAttribute}
                        onChange={(e) => setSortAttribute(e.target.value)}
                        className="border p-2 rounded-md"
                    >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="quantity">Quantity</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.id} className="relative">
                        <ProductCard product={product} />
                        <button
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md"
                        onClick={() => handleDelete(product.id)}
                        >
                        <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;