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
import Success from "./Success";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const navigate = useNavigate();

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

  const handleFormPayment = async (event) => {
    event.preventDefault();
    const error = validate(cardNum, cvv, expiry);
    console.log("Error:", error);
    const reqbody = {
      card: cardNum,
      cvv,
      expiryYear: expiry,
    };
    const cartId = cart.id;
    if (
      !error.hasOwnProperty("cardNum") &&
      !error.hasOwnProperty("cvv") &&
      !error.hasOwnProperty("expiry")
    ) {
      await dispatch(addPaymentAsync({ cartId, reqbody }));
      await dispatch(fetchCartAsync(user));
      setPayForm(false);
    }
  };

  const handleFormShippingAddress = async (event) => {
    event.preventDefault();
    setForm(false);
    const reqbody = {
      line1: address1,
      line2: address2,
      zipcode: zipcode,
      state: state,
      city: city,
      phoneNumber: phoneNumber,
    };
    const cartId = cart.id;
    await dispatch(addShippingAddressAsync({ cartId, reqbody }));
    await dispatch(fetchCartAsync(user));
  };

  const handlePayment = async () => {
    const reqbody = {
      card: payment.card,
      cvv: payment.cvv,
      expiryYear: payment.expiryYear,
    };
    const cartId = cart.id;
    await dispatch(addPaymentAsync({ cartId, reqbody }));
    await dispatch(fetchCartAsync(user));
  };

  const handleShippingAddress = async () => {
    const reqbody = {
      line1: addresses.line1,
      line2: addresses.line2,
      zipcode: addresses.zipcode,
      state: addresses.state,
      city: addresses.city,
      phoneNumber: addresses.phoneNumber,
    };
    const cartId = cart.id;
    await dispatch(addShippingAddressAsync({ cartId, reqbody }));
    await dispatch(fetchCartAsync(user));
  };

  const handlePlaceOrder = async () => {
    const cartId = cart.id;
    const cartProdList = cartProdListandQty();
    const reqbody = {
      totalCostWithTax,
      cartId,
      cartProdList,
    };
    dispatch(updateCheckoutCartAsync(reqbody));
    navigate(`/confirmation/${cartId}`);
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

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [form, setForm] = useState(false);
  const [payForm, setPayForm] = useState(false);
  const [payFormError, setPayFormError] = useState({});

  const validate = (cardNum, cvv, expiry) => {
    const error = {};
    //const cardRegex =/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    if (!cardNum.match(cardRegex)) {
      error.cardNum = "Not a valid card format";
    }
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const monthAndYear = expiry.split("/");
    const month = Number(monthAndYear[0]);
    const year = Number(monthAndYear[1]);
    if (year < 23 || (year == 23 && month < 3)) {
      error.expiry = "expired card";
    }

    if (!expiry.match(expiryRegex)) {
      error.expiry = "Not a valid year";
    }
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvv.match(cvvRegex)) {
      error.cvv = "Not a valid cvv";
    }
    setPayFormError(() => error);
    console.log("Inside validation:", error);
    console.log("payFormError:", payFormError);
    return error;
  };

  return (
    <div>
      <div>
        {cart.shipping ? (
          <div>
            <h3>Shipping Address:</h3>
            <p>Address Line1 : {cart.shipping.line1}</p>
            <p>Address Line2 : {cart.shipping.line2}</p>
            <p>Zipcode : {cart.shipping.zipcode}</p>
            <p>State : {cart.shipping.state}</p>
            <p>City : {cart.shipping.city}</p>
            <p>Phone Number : {cart.shipping.phoneNumber}</p>
          </div>
        ) : addresses ? (
          <div>
            <h3>Shipping Address:</h3>
            <p>Address Line1 : {addresses.line1}</p>
            <p>Address Line2 : {addresses.line2}</p>
            <p>Zipcode : {addresses.zipcode}</p>
            <p>State : {addresses.state}</p>
            <p>City : {addresses.city}</p>
            <p>Phone Number : {addresses.phoneNumber}</p>
            {!cart.shipping?.id && (
              <button type="button" onClick={handleShippingAddress}>
                Use
              </button>
            )}
            {!cart.shipping?.id && (
              <button type="button" onClick={() => setForm(true)}>
                Change Shipping Address
              </button>
            )}
          </div>
        ) : (
          <div>
            <p>There is no shipping address available</p>
            <button type="button" onClick={() => setForm(true)}>
              Add Shipping Address
            </button>
          </div>
        )}
        {/* {addresses ? (
          <div>
            {!cart.shipping ? (
              <div>
                <h3>Shipping Address:</h3>
                <p>Address Line1 : {addresses.line1}</p>
                <p>Address Line2 : {addresses.line2}</p>
                <p>Zipcode : {addresses.zipcode}</p>
                <p>State : {addresses.state}</p>
                <p>City : {addresses.city}</p>
                <p>Phone Number : {addresses.phoneNumber}</p>
                {!cart.shipping?.id && (
                  <button type="button" onClick={handleShippingAddress}>
                    Use
                  </button>
                )}
                {!cart.shipping?.id && (
                  <button type="button" onClick={() => setForm(true)}>
                    Change Shipping Address
                  </button>
                )}
              </div>
            ) : (
              <div>
                <h3>Shipping Address:</h3>
                <p>Address Line1 : {cart.shipping.line1}</p>
                <p>Address Line2 : {cart.shipping.line2}</p>
                <p>Zipcode : {cart.shipping.zipcode}</p>
                <p>State : {cart.shipping.state}</p>
                <p>City : {cart.shipping.city}</p>
                <p>Phone Number : {cart.shipping.phoneNumber}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>There is no shipping address available</p>
            <button type="button" onClick={() => setForm(true)}>
              Add Shipping Address
            </button>
          </div>
        )} */}
        {
          <div>
            {form && (
              <form onSubmit={(event) => handleFormShippingAddress(event)}>
                <h3>Add New Shipping address:</h3>
                <label htmlFor="addressLine1">Address Line1 : </label>
                <input
                  type="text"
                  name="addressLine1"
                  onChange={(event) => setAddress1(event.target.value)}
                />
                <label htmlFor="addressLine2">Address Line2 : </label>
                <input
                  type="text"
                  name="addressLine2"
                  onChange={(event) => setAddress2(event.target.value)}
                />
                <label htmlFor="zipcode">Zipcode : </label>
                <input
                  type="text"
                  name="zipcode"
                  onChange={(event) => setZipcode(event.target.value)}
                />
                <label htmlFor="state">State : </label>
                <input
                  type="text"
                  name="state"
                  onChange={(event) => setState(event.target.value)}
                />
                <label htmlFor="city">City : </label>
                <input
                  type="text"
                  name="city"
                  onChange={(event) => setCity(event.target.value)}
                />
                <label htmlFor="phoneNumber">Phone Number : </label>
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <button type="submit">save</button>
              </form>
            )}
          </div>
        }
      </div>
      <div>
        <p>Cart Total : {cart.totalCost}</p>
        <p>Tax : 5%</p>
        <h3>Checkout total : {calculateTotalCost(cart.totalCost)}</h3>
        <p>{cart.totalCartItems} items added for checkout</p>
      </div>
      <div>
        <div>
          <h3>Payment:</h3>
          {cart.orderpayment ? (
            <div>
              <p>Card : {cart.orderpayment.card}</p>
              <p>Expiry year : {cart.orderpayment.expiryYear}</p>
            </div>
          ) : payment ? (
            <div>
              <p>Card : {payment.card}</p>
              <p>Expiry year : {payment.expiryYear}</p>
              {!cart.orderpayment && (
                <button type="button" onClick={handlePayment}>
                  Use
                </button>
              )}
              {!cart.orderpayment && (
                <button type="button" onClick={() => setPayForm(true)}>
                  Change Payment
                </button>
              )}
            </div>
          ) : (
            <div>
              <p>There is no payment available</p>
              <button type="button" onClick={() => setPayForm(true)}>
                Add New Payment
              </button>
            </div>
          )}
          {/* {payment ? (
            <div>
              {!cart.orderpayment ? (
                <div>
                  <p>Card : {payment.card}</p>
                  <p>Expiry year : {payment.expiryYear}</p>
                  {!cart.orderpayment && (
                    <button type="button" onClick={handlePayment}>
                      Use
                    </button>
                  )}
                  {!cart.orderpayment && (
                    <button type="button" onClick={() => setPayForm(true)}>
                      Change Payment
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <p>Card : {cart.orderpayment.card}</p>
                  <p>Expiry year : {cart.orderpayment.expiryYear}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>There is no payment available</p>
              <button type="button" onClick={() => setPayForm(true)}>
                Add New Payment
              </button>
            </div>
          )} */}
        </div>
        {payForm && (
          <form onSubmit={(event) => handleFormPayment(event)}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardNum}
              placeholder="5***-****-****-****"
              onChange={(event) => {
                setCardNum(event.target.value);
                setPayFormError({});
              }}
            />
            <p>{payFormError.cardNum}</p>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              value={cvv}
              placeholder="***"
              onChange={(event) => {
                setCvv(event.target.value);
                setPayFormError({});
              }}
            />
            <p>{payFormError.cvv}</p>
            <label htmlFor="expiry">Expiry year</label>
            <input
              type="text"
              name="expiry"
              value={expiry}
              placeholder="MM/YY"
              onChange={(event) => {
                setExpiry(event.target.value);
                setPayFormError({});
              }}
            />
            <p>{payFormError.expiry}</p>
            <button type="submit">save</button>
          </form>
        )}
      </div>
      <button type="button" onClick={handlePlaceOrder}>
        Place order
      </button>
    </div>
  );
};

export default Checkout;
