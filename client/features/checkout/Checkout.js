import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Checkout = () => {
  const user = useSelector((state) => state.auth.me);
};

export default Checkout;
