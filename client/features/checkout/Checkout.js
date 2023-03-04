import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddressAsync, selectAddress } from "./addressSlice";
import { fetchCartAsync, selectCart } from "../cart/cartSlice";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchAddressAsync(user));
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  const addresses = useSelector(selectAddress);
  const cart = useSelector(selectCart);
  console.log(cart);

  const calculateTotalCost = (totalcost) => {
    const totCostWithTax = Number(totalcost);
    return Number(totCostWithTax + totCostWithTax * 0.05);
  };

  return (
    <div>
      {addresses ? (
        <div>
          <h3>Shipping Address:</h3>
          <p>Address Line1 : {addresses.line1}</p>
          <p>Address Line2 : {addresses.line2}</p>
          <p>Zipcode : {addresses.zipcode}</p>
          <p>State : {addresses.state}</p>
          <p>City : {addresses.city}</p>
          <p>Phone Number : {addresses.phoneNumber}</p>
        </div>
      ) : (
        <p>There is no shipping address available</p>
      )}
      <div>
        <h3>Cart Total : {cart.totalCost}</h3>
        <p>Tax : 5%</p>
        <p>Checkout total : {calculateTotalCost(cart.totalCost)}</p>
        <p>{cart.totalCartItems} items added for checkout</p>
      </div>
      <div>
        <form>
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" name="cardNumber" />
          <label htmlFor="cvv">CVV</label>
          <input type="text" name="cvv" />
          <label htmlFor="expiry">Expiry year</label>
          <input type="text" name="expiry" />
          <button type="button">save</button>
        </form>
      </div>
      <button type="button">Place order</button>
    </div>
  );
};

export default Checkout;
