import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync } from "../cart/cartSlice";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default Home;
