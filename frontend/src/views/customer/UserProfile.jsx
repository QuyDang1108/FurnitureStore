import React, { useState } from 'react';

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: 'John Doe',
        address: '123 Main St',
        phoneNumber: '123-456-7890',
        state: 'Active'
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('User information updated:', userInfo);
        setIsEditing(false);
    };

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-lg font-semibold">User Profile</h1>
                <button
                    onClick={handleEditToggle}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    {isEditing ? 'Cancel' : 'Edit Information'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={userInfo.state}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {isEditing && (
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Save Information
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UserProfile;