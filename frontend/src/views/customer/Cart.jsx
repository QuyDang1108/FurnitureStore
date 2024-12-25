import React, { useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';

const Cart = () => {
    const [searchValue, setSearchValue] = useState("");
    const [cart, setCart] = useState([
        { id: 1, name: "Product 1", image: "image1.jpg", price: 10, quantity: 1 },
        { id: 2, name: "Product 2", image: "image2.jpg", price: 20, quantity: 2 },
        { id: 3, name: "Product 3", image: "image3.jpg", price: 30, quantity: 1 },
    ]);

    const handleQuantityChange = (id, delta) => {
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const filteredCart = cart.filter(item => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const totalPrice = filteredCart.reduce((total, item) => total + item.price * item.quantity, 0);

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
                <button className="bg-green-500 p-2 rounded-md text-white">
                    Pay
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {filteredCart.map(item => (
                    <div key={item.id} className="border p-4 rounded-md relative flex flex-col md:flex-row items-center">
                        <img src={item.image} alt={item.name} className="w-full md:w-32 h-32 object-cover mb-2 md:mb-0 md:mr-4" />
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p className="text-gray-600">${item.price} each</p>
                            <div className="flex items-center mb-2">
                                <button
                                    onClick={() => handleQuantityChange(item.id, -1)}
                                    className="bg-gray-300 px-2 py-1 rounded-l-md"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                    className="w-12 text-center border-t border-b border-gray-300"
                                />
                                <button
                                    onClick={() => handleQuantityChange(item.id, 1)}
                                    className="bg-gray-300 px-2 py-1 rounded-r-md"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-gray-600">Total: ${item.price * item.quantity}</p>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-5 text-right">
                <h2 className="text-lg font-semibold">Total Price: ${totalPrice}</h2>
            </div>
        </div>
    );
};

export default Cart;