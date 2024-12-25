import React, { useState } from 'react';

const ShippingInfo = () => {
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        orderValue: '',
        deliveryNote: '',
        acceptTerms: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setShippingInfo({
            ...shippingInfo,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!shippingInfo.acceptTerms) {
            alert('You must accept the terms and conditions to place the order.');
            return;
        }
        // Handle form submission logic here
        console.log('Shipping information submitted:', shippingInfo);
    };

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-lg font-semibold">Shipping Information</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={shippingInfo.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="orderValue" className="block text-sm font-medium text-gray-700">Order Value</label>
                    <input
                        type="text"
                        id="orderValue"
                        name="orderValue"
                        value={shippingInfo.orderValue}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="deliveryNote" className="block text-sm font-medium text-gray-700">Delivery Note</label>
                    <textarea
                        id="deliveryNote"
                        name="deliveryNote"
                        value={shippingInfo.deliveryNote}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            name="acceptTerms"
                            checked={shippingInfo.acceptTerms}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                            I accept the terms and conditions
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShippingInfo;