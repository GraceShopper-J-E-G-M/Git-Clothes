import React from "react";
import { Link, useParams } from "react-router-dom";

const Success = () => {
  const { cartId } = useParams;
  return (
    <div>
      <p>Congrats!!!Your Order Id: {cartId} got placed</p>
      <Link to={"/home"}>Continue Shopping</Link>
    </div>
  );
};

export default Success;
