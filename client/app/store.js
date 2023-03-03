import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import allProductsSlice from "../features/allProducts/allProductSlice";
import singleUserSlice from "../app/Admin/singleUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    cart: cartSlice,
    allProducts: allProductSlice,
    singleUser: singleUserSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export default store;
export * from "../features/auth/authSlice";
