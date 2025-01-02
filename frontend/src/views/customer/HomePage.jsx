import React from 'react';
import ProductCard from '../util/ProductCard';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import '../../carousel.css'; 
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const featuredProducts = [
  { id: 1, name: "Product 1", image: "image1.jpg", price: "$10", quantity: 5 },
  { id: 2, name: "Product 2", image: "image2.jpg", price: "$20", quantity: 3 },
  { id: 3, name: "Product 3", image: "image3.jpg", price: "$30", quantity: 8 },
  { id: 4, name: "Product 4", image: "image4.jpg", price: "$40", quantity: 2 },
];

const newArrivals = [
  { id: 5, name: "Product A", image: "imageA.jpg", price: "$50", quantity: 6 },
  { id: 6, name: "Product B", image: "imageB.jpg", price: "$60", quantity: 1 },
  { id: 7, name: "Product C", image: "imageC.jpg", price: "$70", quantity: 4 },
  { id: 8, name: "Product D", image: "imageD.jpg", price: "$80", quantity: 7 },
];

const Homepage = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        <div>
          <img src="/images/carousel-1.jpg" alt="Featured 1" />
          <Link to="/customer/product-list" className="legend">
            <button className="bg-blue-700 text-white font-bold py-4 px-8 rounded">
              Shop Now
            </button>
          </Link>
        </div>
        <div>
          <img src="/images/carousel-2.jpg" alt="Featured 2" />
          <Link to="/customer/product-list" className="legend">
            <button className="bg-blue-700 text-white font-bold py-4 px-8 rounded">
              Shop Now
            </button>
          </Link>
        </div>
      </Carousel>
      <section className="mb-5">
        <h2 className="text-xl font-bold mb-3">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-bold mb-3">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-bold mb-3">Feedback</h2>
        <div className="max-w-lg mx-auto">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your feedback here..."
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Homepage;