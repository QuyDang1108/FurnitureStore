import React, { useState } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak St', status: 'Inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', address: '789 Pine St', status: 'Active' },
        // Add more customers as needed
    ]);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md'>
                <h1 className='text-[#d0d2d6] font-semibold text-lg'>Customer List</h1>
            </div>

            <div className='flex flex-wrap w-full'>
                <div className='w-full p-4'>
                    <div className='bg-white p-5 rounded-md shadow-md'>
                        <div className='flex flex-wrap'>
                            <div className='w-full'>
                                <h2 className='text-lg font-semibold mb-4'>Customers</h2>
                                <table className='min-w-full bg-white'>
                                    <thead>
                                        <tr>
                                            <th className='py-2 px-4 border-b border-gray-200'>Name</th>
                                            <th className='py-2 px-4 border-b border-gray-200'>Email</th>
                                            <th className='py-2 px-4 border-b border-gray-200'>Address</th>
                                            <th className='py-2 px-4 border-b border-gray-200'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map(customer => (
                                            <tr key={customer.id}>
                                                <td className='py-2 px-4 border-b border-gray-200'>{customer.name}</td>
                                                <td className='py-2 px-4 border-b border-gray-200'>{customer.email}</td>
                                                <td className='py-2 px-4 border-b border-gray-200'>{customer.address}</td>
                                                <td className='py-2 px-4 border-b border-gray-200'>{customer.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;