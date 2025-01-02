import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../util/ProductCard';

const Filter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [sortAttribute, setSortAttribute] = useState("name");
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 1000,
        colors: [],
        origin: "",
        materials: [],
        catalogues: []
    });

    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", image: "image1.jpg", price: 10, color: "Red", origin: "Domestic", material: "Wood", catalogue: "Bed" },
        { id: 2, name: "Product 2", image: "image2.jpg", price: 20, color: "Blue", origin: "Foreign", material: "Plastic", catalogue: "Table" },
        { id: 3, name: "Product 3", image: "image3.jpg", price: 30, color: "Green", origin: "Domestic", material: "Fabric", catalogue: "Chair" },
        { id: 4, name: "Product 4", image: "image4.jpg", price: 40, color: "Yellow", origin: "Foreign", material: "Metal", catalogue: "Lock" },
        { id: 5, name: "Product 5", image: "image5.jpg", price: 50, color: "Black", origin: "Domestic", material: "Wood", catalogue: "Bed" },
        { id: 6, name: "Product 6", image: "image6.jpg", price: 60, color: "White", origin: "Foreign", material: "Plastic", catalogue: "Table" },
        { id: 7, name: "Product 7", image: "image7.jpg", price: 70, color: "Gray", origin: "Domestic", material: "Fabric", catalogue: "Chair" },
        { id: 8, name: "Product 8", image: "image8.jpg", price: 80, color: "Red", origin: "Foreign", material: "Metal", catalogue: "Lock" },
    ]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: checked
                    ? [...prevFilters[name], value]
                    : prevFilters[name].filter(item => item !== value)
            }));
        } else {
            setFilters({
                ...filters,
                [name]: value
            });
        }
    };

    const filteredProducts = products.filter(product => {
        return (
            product.price >= filters.minPrice &&
            product.price <= filters.maxPrice &&
            (filters.colors.length === 0 || filters.colors.includes(product.color)) &&
            (filters.origin === "" || product.origin === filters.origin) &&
            (filters.materials.length === 0 || filters.materials.includes(product.material)) &&
            (filters.catalogues.length === 0 || filters.catalogues.includes(product.catalogue))
        );
    });

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

            <div className="flex">
                <div className="w-1/4 p-4 bg-white rounded-md shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price Range</label>
                        <div className="flex items-center">
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                className="border p-2 rounded-md w-1/2 mr-2"
                                placeholder="Min Price"
                            />
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                className="border p-2 rounded-md w-1/2"
                                placeholder="Max Price"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Color</label>
                        {["Red", "Green", "Blue", "Yellow", "Gray", "White", "Black"].map(color => (
                            <div key={color} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={color}
                                    name="colors"
                                    value={color}
                                    checked={filters.colors.includes(color)}
                                    onChange={handleFilterChange}
                                    className="mr-2"
                                />
                                <label htmlFor={color} className="text-sm text-gray-700">{color}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Origin</label>
                        {["Domestic", "Foreign"].map(origin => (
                            <div key={origin} className="flex items-center">
                                <input
                                    type="radio"
                                    id={origin}
                                    name="origin"
                                    value={origin}
                                    checked={filters.origin === origin}
                                    onChange={handleFilterChange}
                                    className="mr-2"
                                />
                                <label htmlFor={origin} className="text-sm text-gray-700">{origin}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Material</label>
                        {["Wood", "Plastic", "Fabric", "Metal"].map(material => (
                            <div key={material} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={material}
                                    name="materials"
                                    value={material}
                                    checked={filters.materials.includes(material)}
                                    onChange={handleFilterChange}
                                    className="mr-2"
                                />
                                <label htmlFor={material} className="text-sm text-gray-700">{material}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Catalogue</label>
                        {["Bed", "Table", "Chair", "Lock"].map(catalogue => (
                            <div key={catalogue} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={catalogue}
                                    name="catalogues"
                                    value={catalogue}
                                    checked={filters.catalogues.includes(catalogue)}
                                    onChange={handleFilterChange}
                                    className="mr-2"
                                />
                                <label htmlFor={catalogue} className="text-sm text-gray-700">{catalogue}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-3/4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;