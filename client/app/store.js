import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import allProductsSlice from "../features/allProducts/allProductSlice";
import addressSlice from "../features/checkout/addressSlice";
import orderItemSlice from "../features/cart/orderItemSlice";
import singleUserSlice from "../features/admin/singleUser/singleuserSlice";
import allUsersReducer from "../features/admin/allUsers/allUsersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    cart: cartSlice,
    allProducts: allProductsSlice,
    address: addressSlice,
    orderItem: orderItemSlice,
    singleUser: singleUserSlice,
    allUsers: allUsersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
