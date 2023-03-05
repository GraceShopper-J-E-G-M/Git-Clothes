import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddressAsync, selectAddress } from "./addressSlice";
import {
  fetchPaymentAsync,
  addPaymentAsync,
  selectPayment,
} from "./paymentSlice";
import {
  fetchCartAsync,
  updateCheckoutCartAsync,
  selectCart,
} from "../cart/cartSlice";
import { addShippingAddressAsync, selectShipping } from "./shippingSlice";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchAddressAsync(user));
      dispatch(fetchCartAsync(user));
      dispatch(fetchPaymentAsync(user));
    }
  }, [dispatch, user]);

  const addresses = useSelector(selectAddress);
  const cart = useSelector(selectCart);
  const payment = useSelector(selectPayment);
  const shipping = useSelector(selectShipping);
  let totalCostWithTax;
  console.log("In checkout address:", addresses);
  console.log("In checkout cart", cart);
  console.log("In checkout payment", payment);
  console.log("In checkout shipping", shipping);

  const calculateTotalCost = (totalcost) => {
    totalcost = Number(totalcost);
    totalCostWithTax = totalcost + totalcost * 0.05;
    return totalCostWithTax;
  };

  const [cardNum, setCardNum] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleFormPayment = (event) => {
    if (event) event.preventDefault();
    const reqbody = {
      card: cardNum,
      cvv,
      expiryYear: expiry,
    };
    const cartId = cart.id;
    dispatch(addPaymentAsync({ cartId, reqbody }));
  };

  const handlePayment = () => {
    const reqbody = {
      card: payment.card,
      cvv: payment.cvv,
      expiryYear: payment.expiryYear,
    };
    const cartId = cart.id;
    dispatch(addPaymentAsync({ cartId, reqbody }));
  };

  const handleShippingAddress = () => {
    const reqbody = {
      line1: addresses.line1,
      line2: addresses.line2,
      zipcode: addresses.zipcode,
      state: addresses.state,
      city: addresses.city,
      phoneNumber: addresses.phoneNumber,
    };
    const cartId = cart.id;
    dispatch(addShippingAddressAsync({ cartId, reqbody }));
  };

  const handlePlaceOrder = () => {
    const cartId = cart.id;
    const cartProdList = cartProdListandQty();
    const reqbody = {
      totalCostWithTax,
      cartId,
      cartProdList,
    };
    dispatch(updateCheckoutCartAsync(reqbody));
  };

  const cartProdListandQty = () => {
    const orderItems = cart.orderItems;
    const prodList = orderItems.map((orderItem) => {
      return {
        prodId: orderItem.productId,
        userQty: orderItem.quantity,
      };
    });
    return prodList;
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
          <button type="button" onClick={handleShippingAddress}>
            Use
          </button>
          <button type="button">Change Shipping Address</button>
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
        <div>
          <h3>Payment:</h3>
          <p>Card : {payment.card}</p>
          <p>Expiry year : {payment.expiryYear}</p>
          <button type="button" onClick={handlePayment}>
            Use
          </button>
        </div>
        <form onSubmit={(event) => handleFormPayment(event)}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            onChange={(event) => setCardNum(event.target.value)}
          />
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            name="cvv"
            onChange={(event) => setCvv(event.target.value)}
          />
          <label htmlFor="expiry">Expiry year</label>
          <input
            type="text"
            name="expiry"
            onChange={(event) => setExpiry(event.target.value)}
          />
          <button type="submit">save</button>
        </form>
      </div>
      <button type="button" onClick={handlePlaceOrder}>
        Place order
      </button>
    </div>
  );
};

export default Checkout;
