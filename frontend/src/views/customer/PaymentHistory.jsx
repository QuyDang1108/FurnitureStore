import React, { useState } from 'react';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([
        { id: 1, address: '123 Main St', price: '$100', status: 'Completed' },
        { id: 2, address: '456 Oak St', price: '$200', status: 'Completed' },
        { id: 3, address: '789 Pine St', price: '$150', status: 'Completed' },
        // Add more payment records as needed
    ]);

    const handleView = (id) => {
        // Handle the view action
        console.log(`View details for order ID: ${id}`);
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md'>
                <h1 className='text-[#d0d2d6] font-semibold text-lg'>Payment History</h1>
            </div>

            <div className='flex flex-wrap w-full'>
                <div className='w-full p-4'>
                    <div className='bg-white p-5 rounded-md shadow-md'>
                        <div className='flex flex-wrap'>
                            <div className='w-full'>
                                <h2 className='text-lg font-semibold mb-4'>Payments</h2>
                                <table className='min-w-full bg-white'>
                                    <thead>
                                        <tr>
                                            <th className='py-2 px-4 border-b border-gray-200'>Order ID</th>
                                            <th className='py-2 px-4 border-b border-gray-200'>Address</th>
                                            <th className='py-2 px-4 border-b border-gray-200'>Price</th>
                                            <th className='py-2 px-4 border-b border-gray-200'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map(payment => (
                                            <tr key={payment.id}>
                                                <td className='py-2 px-4 border-b border-gray-200'>{payment.id}</td>
                                                <td className='py-2 px-4 border-b border-gray-200'>{payment.address}</td>
                                                <td className='py-2 px-4 border-b border-gray-200'>{payment.price}</td>
                                                <td className='py-2 px-4 border-b border-gray-200'>
                                                    <button
                                                        onClick={() => handleView(payment.id)}
                                                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                                                    >
                                                        View
                                                    </button>
                                                </td>
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

export default PaymentHistory;