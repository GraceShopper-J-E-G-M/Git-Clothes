import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { fetchCartAsync, selectCart } from "../cart/cartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.me);
  const cart = useSelector(selectCart);
  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchCartAsync(user));
  //   }
  // }, [dispatch, user]);
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  // const addToCart = async () => {
  //   const reqbody = {
  //     userId: 101,
  //     prodId: 11,
  //     //quantity: 2,
  //   };
  //   await dispatch(addCartAsync(reqbody));
  //   navigate("/cart");
  // };

  const [cartStatus, setCartStatus] = useState("");
  console.log("Cart Status in Nav:", cart.status);
  return (
    <div>
      <Link to="/allProducts"><h1>Git-Clothes</h1></Link>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button
              type="button"
              className="mx-3 btn btn-primary"
              onClick={logoutAndRedirectHome}
            >
              Logout
            </button>

            {(!cart ||
              cart?.totalCartItems === 0 ||
              cart.status === "Completed") && (
              <button
                onClick={() => navigate("/cart")}
                className="mx-3 btn btn-primary"
              >
                <i className="bi bi-bag mx-3">0</i>
              </button>
            )}
            {cart.totalCartItems > 0 && cart.status === "Pending" && (
              <button
                onClick={() => navigate("/cart")}
                className="mx-3 btn btn-primary"
              >
                <i className="bi bi-bag-check-fill mx-3">
                  {cart.totalCartItems}
                </i>
              </button>
            )}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
