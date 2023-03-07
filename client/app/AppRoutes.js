import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import Cart from "../features/cart/Cart";
import AllProducts from "../features/allProducts/allProducts";
import SingleProduct from "../features/singleProduct/singleProduct";
import Checkout from "../features/checkout/Checkout";
import Success from "../features/checkout/Success";
import AdminNavBar from "../features/admin/adminNavBar/adminNavBar";
import AllUsers from "../features/admin/allUsers/allUsers";
import SingleUser from "../features/admin/singleUser/singleuser";
import UpdateUser from "../features/Admin/singleUser/editSingleUser";
import AdminAllProducts from "../features/Admin/allProducts/AdminAllProducts";
import UpdateProduct from "../features/admin/UpdateProduct/UpdateProduct";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.role === "admin");
  const dispatch = useDispatch();

  console.log("isAdmin", isAdmin);

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
          <Route path="/allProducts" element={<AllProducts />} />
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
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/allProducts/:prodId" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Success />} />
        </Routes>
      )}

      {/**This is where we should add the ADMIN routes for /allUsers, /allUsers/:id, /allProducts, and /allProducts/:id */}
      {isLoggedIn && isAdmin ? (
        <Routes>
          <Route path="/admin" element={<AdminNavBar />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/allUsers/:userId" element={<SingleUser />} />
          <Route path="/allUsers/:userId/edit" element={<UpdateUser />} />
          <Route path="/allProducts" element={<AdminAllProducts />} />
          <Route path="/allProducts/:prodId" element={<UpdateProduct />} />
        </Routes>
      ) : null}
    </div>
  );
};

export default AppRoutes;
