import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import allProductSlice from "../features/allProducts/allProductSlice";
import addressSlice from "../features/checkout/addressSlice";
import orderItemSlice from "../features/cart/orderItemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductReducer,
    cart: cartSlice,
    allProducts: allProductSlice,
    address: addressSlice,
    orderItem: orderItemSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
