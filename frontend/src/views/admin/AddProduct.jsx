import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        salePercent: '',
        quantity: '',
        description: '',
        image: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setProduct({
            ...product,
            image: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission to add the product
        console.log("Product submitted:", product);
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md'>
                <h1 className='text-[#d0d2d6] font-semibold text-lg'>Add Product</h1>
            </div>

            <div className='flex flex-wrap w-full'>
                <div className='w-full p-4'>
                    <div className='bg-white p-5 rounded-md shadow-md'>
                        <form onSubmit={handleSubmit} className='flex flex-wrap'>
                            <div className='w-full lg:w-1/2 pr-2'>
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Product Name</label>
                                    <input
                                        className='px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full'
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={product.name}
                                        onChange={handleInputChange}
                                        placeholder='Product Name'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label className='flex justify-center items-center flex-col h-[313px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]' htmlFor='image'>
                                        <span><FaImage /></span>
                                        <span>Select Image</span>
                                    </label>
                                    <input
                                        className='hidden'
                                        type='file'
                                        id='image'
                                        name='image'
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            <div className='w-full lg:w-1/2 pl-2'>
                                <div className='mb-4'>
                                    <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price</label>
                                    <input
                                        className='px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full'
                                        type='text'
                                        id='price'
                                        name='price'
                                        value={product.price}
                                        onChange={handleInputChange}
                                        placeholder='Price'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='salePercent' className='block text-sm font-medium text-gray-700'>Sale Percent</label>
                                    <input
                                        className='px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full'
                                        type='text'
                                        id='salePercent'
                                        name='salePercent'
                                        value={product.salePercent}
                                        onChange={handleInputChange}
                                        placeholder='Sale Percent'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='quantity' className='block text-sm font-medium text-gray-700'>Quantity</label>
                                    <input
                                        className='px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full'
                                        type='text'
                                        id='quantity'
                                        name='quantity'
                                        value={product.quantity}
                                        onChange={handleInputChange}
                                        placeholder='Quantity'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                                    <textarea
                                        className='px-4 py-2 outline-none bg-white text-black border border-slate-700 rounded-md w-full'
                                        id='description'
                                        name='description'
                                        value={product.description}
                                        onChange={handleInputChange}
                                        placeholder='Description'
                                    />
                                </div>

                                <div className='mb-4'>
                                <button className='bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg 
                                    text-white rounded-md px-7 py-2 my-2'>
                                    Add Product
                                </button>
                                </div>
                            </div>

                            <div className='w-full'>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;