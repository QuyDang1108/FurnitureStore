import authReducer from "./Reducers/authReducer";
import productsReducer from "./Reducers/productReducer";
import cartReducer from "./Reducers/cartReducer";
import ordersReducer from "./Reducers/orderReducer";
import usersReducer from "./Reducers/userReducer";
import reviewsReducer from "./Reducers/reviewReducer";
import categoriesReducer from "./Reducers/categoryReducer";
import statReducer from "./Reducers/statReducer";

const rootReducer = {
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  users: usersReducer,
  reviews: reviewsReducer,
  categories: categoriesReducer,
  stat: statReducer,
};

export default rootReducer;
