import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchCartAsync } from "../cart/cartSlice";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.me.role);
  console.log(role);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  return (
    <div>
      {role === "user" ? (
        <div>
          <h3>Welcome, {username}</h3>
          <button>
            <Link to="/allProducts">View all products</Link>
          </button>
          <button>
            <Link to="/cart">View my cart</Link>
          </button>
        </div>
      ) : (
        <h1 style={{ textAlign: 'center' }}>Welcome to Git-Clothes Admin Portal! </h1>
      )}
    </div>
  );
};

export default Home;
