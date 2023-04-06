/**
 * This file contains a `Home` component to display the Git-clothes landing page.
 */

//Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Files
import { fetchCartAsync } from "../cart/cartSlice";

/**
 * Home component.
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.me.role);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  return (
    <div>
      {role === "user" ? (
        <div>
          <h3 style={{ textAlign: "center" }}>Welcome, {username}</h3>
          <div style={{ textAlign: "center" }}>
            <button>
              <Link to="/allProducts">View all products</Link>
            </button>
            <button>
              <Link to="/cart">View my cart</Link>
            </button>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          Welcome to Git-Clothes Admin Portal!{" "}
        </h1>
      )}
    </div>
  );
};

export default Home;
