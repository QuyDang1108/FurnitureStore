import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-3">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-700">{product.price}</p>
      <p className="text-gray-500">Quantity: {product.quantity}</p>
    </div>
  );
};

export default ProductCard;