import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import allProductSlice from "../features/allProducts/allProductSlice";
import allUsersReducer from "../features/allUsers/allUsersSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductReducer,
    cart: cartSlice,
    allProducts: allProductSlice,
    allUsers: allUsersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export default store;
export * from "../features/auth/authSlice";
