import React, { useEffect } from "react";
import ProductCard from "../util/ProductCard";
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";
import "../../carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  get_featured_products,
  get_new_arrivals,
} from "../../store/Reducers/productReducer";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { featuredProducts, newArrivals } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(get_featured_products());
    dispatch(get_new_arrivals());
  }, [dispatch]);

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
      <section className="m-5 pt-5">
        <h2 className="text-xl font-bold mb-3">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="m-5 pt-5">
        <h1 className="text-xl font-bold mb-3">New Arrivals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="m-5 pt-5">
        <h1 className="text-xl font-bold mb-3">Feedback</h1>
        <div className="max-w-lg mx-auto">
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="feedback"
              >
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
