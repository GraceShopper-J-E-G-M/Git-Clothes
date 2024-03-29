//Libraries
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

//Files
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import Cart from "../features/cart/Cart";
import AllProducts from "../features/allProducts/AllProducts";
import SingleProduct from "../features/singleProduct/SingleProduct";
import Checkout from "../features/checkout/Checkout";
import Success from "../features/checkout/Success";
import AdminNavBar from "../features/admin/adminNavBar/AdminNavBar";
import AllUsers from "../features/admin/allUsers/AllUsers";
import SingleUser from "../features/admin/singleUser/SingleUser";
import UpdateUser from "../features/admin/singleUser/UpdateUser";
import AdminAllProducts from "../features/admin/allProducts/AdminAllProducts";
import UpdateProduct from "../features/admin/updateProduct/UpdateProduct";

/**
 * AppRoutes component.
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.role === "admin");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {/**These are routes for a logged-in user. */}
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
        /**These are routes for a logged-out user. */
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
        </Routes>
      )}

      {/**These are routes for a logged-in ADMIN. */}
      {isLoggedIn && isAdmin ? (
        <Routes>
          <Route path="/admin" element={<AdminNavBar />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/allUsers/:userId" element={<SingleUser />} />
          <Route path="/allUsers/:userId/edit" element={<UpdateUser />} />
          <Route path="/allAdminProducts" element={<AdminAllProducts />} />
          <Route path="/allAdminProducts/:prodId" element={<UpdateProduct />} />
        </Routes>
      ) : null}
    </div>
  );
};

export default AppRoutes;
