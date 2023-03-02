import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import allProductSlice from "../features/allProducts/allProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductReducer,
    cart: cartSlice,
    allProducts: allProductSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export default store;
export * from "../features/auth/authSlice";
