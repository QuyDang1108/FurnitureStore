import React, { useState } from 'react';

const ProductDetails = () => {
    const [product, setProduct] = useState({
        id: 1,
        image: 'image1.jpg',
        name: 'Product 1',
        sale: '10%',
        price: '$100',
        status: 'In Stock',
        remainingAmount: 20,
        description: 'This is a great product.',
        catalogue: 'Electronics'
    });

    const [reviews, setReviews] = useState([
        { id: 1, user: 'John Doe', comment: 'Great product!', rating: 5 },
        { id: 2, user: 'Jane Smith', comment: 'Good value for money.', rating: 4 },
        // Add more reviews as needed
    ]);

    const [relatedProducts, setRelatedProducts] = useState([
        { id: 2, name: 'Product 2', image: 'image2.jpg', price: '$150', catalogue: 'Electronics' },
        { id: 3, name: 'Product 3', image: 'image3.jpg', price: '$200', catalogue: 'Electronics' },
        // Add more related products as needed
    ]);

    const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 0 });

    const handleAddToCart = () => {
        // Handle add to cart action
        console.log('Add to cart:', product);
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleAddReview = () => {
        setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
        setNewReview({ user: '', comment: '', rating: 0 });
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md'>
                <h1 className='text-[#d0d2d6] font-semibold text-lg'>Product Details</h1>
            </div>

            <div className='flex flex-wrap w-full'>
                <div className='w-full p-4'>
                    <div className='bg-white p-5 rounded-md shadow-md'>
                        <div className='flex flex-wrap'>
                        <div className='w-full lg:w-1/2'>
                                    <img src={product.image} alt={product.name} className='w-full h-64 object-cover mb-4' />
                                </div>
                                <div className='w-full lg:w-1/2'>
                                    <h2 className='text-lg font-semibold mb-2'>{product.name}</h2>
                                    <p className='text-gray-600 mb-2'>Sale: {product.sale}</p>
                                    <p className='text-gray-600 mb-2'>Price: {product.price}</p>
                                    <p className='text-gray-600 mb-2'>Status: {product.status}</p>
                                    <p className='text-gray-600 mb-2'>Remaining Amount: {product.remainingAmount}</p>
                                    <p className='text-gray-600 mb-4'>{product.description}</p>
                                    <button
                                        onClick={handleAddToCart}
                                        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full p-4'>
                <div className='bg-white p-5 rounded-md shadow-md'>
                    <h2 className='text-lg font-semibold mb-4'>Customer Reviews</h2>
                    {reviews.map(review => (
                        <div key={review.id} className='mb-4'>
                            <p className='text-gray-600'><strong>{review.user}</strong>: {review.comment}</p>
                            <p className='text-gray-600'>Rating: {review.rating} / 5</p>
                        </div>
                    ))}
                    <div className='mt-4'>
                        <h3 className='text-lg font-semibold mb-2'>Add Your Review</h3>
                        <input
                            type='text'
                            name='user'
                            value={newReview.user}
                            onChange={handleReviewChange}
                            placeholder='Your Name'
                            className='border p-2 rounded-md w-full mb-2'
                        />
                        <textarea
                            name='comment'
                            value={newReview.comment}
                            onChange={handleReviewChange}
                            placeholder='Your Comment'
                            className='border p-2 rounded-md w-full mb-2'
                        />
                        <input
                            type='number'
                            name='rating'
                            value={newReview.rating}
                            onChange={handleReviewChange}
                            placeholder='Rating (0-5)'
                            className='border p-2 rounded-md w-full mb-2'
                            min='0'
                            max='5'
                        />
                        <button
                            onClick={handleAddReview}
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-full p-4'>
                <div className='bg-white p-5 rounded-md shadow-md'>
                    <h2 className='text-lg font-semibold mb-4'>Related Products</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {relatedProducts.map(product => (
                            <div key={product.id} className='border p-4 rounded-md'>
                                <img src={product.image} alt={product.name} className='w-full h-32 object-cover mb-2' />
                                <h3 className='text-lg font-semibold'>{product.name}</h3>
                                <p className='text-gray-600'>{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;