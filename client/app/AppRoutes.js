import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import Cart from "../features/cart/Cart";
import AllProducts from "../features/allProducts/allProducts";
import SingleProduct from "../features/singleProduct/singleProduct";
import AdminNavBar from "../features/admin/adminNavBar/adminNavBar";
import AllUsers from "../features/admin/allUsers/allUsers";
import SingleUser from "../features/admin/singleUser/singleuser";

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
          <Route path="/allProducts" element={<AllProducts/>}/>
          <Route path="/allProducts/:prodId" element={<SingleProduct />} />
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/allProducts/:prodId" element={<SingleProduct />} />
          <Route path="/admin" element={<AdminNavBar />} />
          <Route path="/allUsers" element={<AllUsers />} />
          {/**This is where we should add the ADMIN routes for /allUsers/:id, /allProducts, and /allProducts/:id */}
          <Route path="/allUsers/:userId" element={<SingleUser />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
