import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import AllUsers from "../features/allUsers/allUsers";
import Cart from "../features/cart/Cart";
import allProducts from "../features/allProducts/allProducts";
import SingleProduct from "../features/singleProduct/singleProduct";
import Checkout from "../features/checkout/Checkout";
import Success from "../features/checkout/Success";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation/:cartId" element={<Success />} />
          <Route path="/products/:prodId" element={<SingleProduct />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Success />} />
          <Route path="/products/:prodId" element={<SingleProduct />} />
        </Routes>
      )}
      {/* <Routes>
        <Route path="/products/:prodId" element={<SingleProduct />} />
      </Routes> */}
    </div>
  );
};

export default AppRoutes;
