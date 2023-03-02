import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync } from "../cart/cartSlice";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const [inpUser, setInpUser] = useState(user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inpUser) {
      dispatch(fetchCartAsync(inpUser));
    }
  }, [dispatch, inpUser]);

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default Home;
