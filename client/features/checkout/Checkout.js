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
import { useNavigate } from "react-router-dom";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
//import "react-phone-number-input/style.css";

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

  //const [cardNum, setCardNum] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleFormPayment = async (event) => {
    event.preventDefault();
    const error = payFormValidate(
      cardFirst,
      cardSec,
      cardThird,
      cardFourth,
      cvv,
      expiry
    );
    console.log("Error:", error);
    const cardNum = cardFirst + cardSec + cardThird + cardFourth;
    console.log("card:", cardNum);
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
    const error = shippingFormValidate(
      address1,
      address2,
      zipcode,
      state,
      city,
      phoneNumber
    );

    const reqbody = {
      line1: address1,
      line2: address2,
      zipcode: zipcode,
      state: state,
      city: city,
      phoneNumber: phoneNumber,
    };
    const cartId = cart.id;
    if (
      !error.hasOwnProperty("address1") &&
      !error.hasOwnProperty("address2") &&
      !error.hasOwnProperty("state") &&
      !error.hasOwnProperty("city") &&
      !error.hasOwnProperty("zipcode") &&
      !error.hasOwnProperty("phoneNumber")
    ) {
      await dispatch(addShippingAddressAsync({ cartId, reqbody }));
      await dispatch(fetchCartAsync(user));
      setForm(false);
    }
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
  const [shipFormError, setShipFormError] = useState({});

  const shippingFormValidate = (
    address1,
    address2,
    zipcode,
    state,
    city,
    phoneNumber
  ) => {
    const error = {};
    if (!address1) {
      error.address1 = "Address Line1 cant be blank";
    }
    if (!address2) {
      error.address2 = "Address Line2 cant be blank";
    }
    if (!state) {
      error.state = "State cant be blank";
    }
    if (!city) {
      error.city = "City cant be blank";
    }
    const zipRegex = /^[0-9]{5}$/;
    if (!zipcode.match(zipRegex)) {
      error.zipcode = "Not a valid zipcode";
    }
    if (!phoneNumber || phoneNumber.length > 16) {
      error.phoneNumber = "Phone number cant be blank";
    }
    setShipFormError(() => error);
    return error;
  };

  const payFormValidate = (
    cardFirst,
    cardSec,
    cardThird,
    cardFourth,
    cvv,
    expiry
  ) => {
    const error = {};
    //const cardRegex =/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    const cardRegex = /^[0-9]*$/;
    if (
      !cardFirst.match(cardRegex) ||
      !cardSec.match(cardRegex) ||
      !cardThird.match(cardRegex) ||
      !cardFourth.match(cardRegex) ||
      cardFirst.length !== 4 ||
      cardSec.length !== 4 ||
      cardThird.length !== 4 ||
      cardFourth.length !== 4
    ) {
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

  const [cardFirst, setCardFirst] = useState("");
  const [cardSec, setCardSec] = useState("");
  const [cardThird, setCardThird] = useState("");
  const [cardFourth, setCardFourth] = useState("");

  const phoneNumberStyle = {
    padding: "0px",
    margin: "0px",
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart items</h5>
              </div>
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
                  {
                    <div>
                      {form && (
                        <form
                          onSubmit={(event) => handleFormShippingAddress(event)}
                        >
                          <h3>Add New Shipping address:</h3>
                          <label htmlFor="addressLine1">Address Line1 : </label>
                          <input
                            type="text"
                            name="addressLine1"
                            value={address1}
                            placeholder="address line1"
                            onChange={(event) => {
                              setAddress1(event.target.value);
                              setShipFormError({});
                            }}
                          />
                          <p>{shipFormError.address1}</p>
                          <label htmlFor="addressLine2">Address Line2 : </label>
                          <input
                            type="text"
                            name="addressLine2"
                            value={address2}
                            placeholder="address line2"
                            onChange={(event) => {
                              setAddress2(event.target.value);
                              setShipFormError({});
                            }}
                          />
                          <p>{shipFormError.address2}</p>
                          <label htmlFor="zipcode">Zipcode : </label>
                          <input
                            type="text"
                            name="zipcode"
                            value={zipcode}
                            placeholder="zipcode"
                            onChange={(event) => {
                              setZipcode(event.target.value);
                              setShipFormError({});
                            }}
                          />
                          <p>{shipFormError.zipcode}</p>
                          <label htmlFor="state">State : </label>
                          <input
                            type="text"
                            name="state"
                            value={state}
                            placeholder="state"
                            onChange={(event) => {
                              setState(event.target.value);
                              setShipFormError({});
                            }}
                          />
                          <p>{shipFormError.state}</p>
                          <label htmlFor="city">City : </label>
                          <input
                            type="text"
                            name="city"
                            value={city}
                            placeholder="city"
                            onChange={(event) => {
                              setCity(event.target.value);
                              setShipFormError({});
                            }}
                          />
                          <p>{shipFormError.city}</p>
                          <label htmlFor="phoneNumber">Phone Number : </label>
                          {/* <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder="phoneNumber"
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setShipFormError({});
                  }}
                /> */}
                          <PhoneInput
                            defaultCountry="US"
                            value={phoneNumber}
                            placeholder="* (***)***-****"
                            onChange={setPhoneNumber}
                            style={phoneNumberStyle}
                          />
                          {phoneNumber ? (
                            isPossiblePhoneNumber(phoneNumber) ? undefined : (
                              <p>Invalid phone number</p>
                            )
                          ) : (
                            ""
                          )}
                          {!phoneNumber && <p>{shipFormError.phoneNumber}</p>}
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
                        <p>
                          Card :{" "}
                          {"************" +
                            cart.orderpayment.card?.substring(12)}
                        </p>
                        <p>Expiry year : {cart.orderpayment.expiryYear}</p>
                      </div>
                    ) : payment ? (
                      <div>
                        <p>
                          Card : {"************" + payment.card?.substring(12)}
                        </p>
                        <p>Expiry year : {payment.expiryYear}</p>
                        {!cart.orderpayment && (
                          <button type="button" onClick={handlePayment}>
                            Use
                          </button>
                        )}
                        {!cart.orderpayment && (
                          <button
                            type="button"
                            onClick={() => setPayForm(true)}
                          >
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
                  </div>
                  {payForm && (
                    <form onSubmit={(event) => handleFormPayment(event)}>
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        name="cardFirst"
                        value={cardFirst}
                        placeholder="****"
                        maxLength={4}
                        onChange={(event) => {
                          setCardFirst(event.target.value);
                          setPayFormError({});
                        }}
                      />{" "}
                      -
                      <input
                        type="text"
                        name="cardSec"
                        value={cardSec}
                        placeholder="****"
                        maxLength={4}
                        onChange={(event) => {
                          setCardSec(event.target.value);
                          setPayFormError({});
                        }}
                      />{" "}
                      -
                      <input
                        type="text"
                        name="cardThird"
                        value={cardThird}
                        placeholder="****"
                        maxLength={4}
                        onChange={(event) => {
                          setCardThird(event.target.value);
                          setPayFormError({});
                        }}
                      />{" "}
                      -
                      <input
                        type="text"
                        name="cardFourth"
                        value={cardFourth}
                        placeholder="****"
                        maxLength={4}
                        onChange={(event) => {
                          setCardFourth(event.target.value);
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
                        maxLength={3}
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
                        maxLength={5}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
