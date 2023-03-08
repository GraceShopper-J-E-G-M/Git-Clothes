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
    return totalCostWithTax.toFixed(2);
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
      cardName,
      cvv,
      expiry
    );
    console.log("Error:", error);
    const cardNum = cardFirst + cardSec + cardThird + cardFourth;
    console.log("card:", cardNum);
    const reqbody = {
      card: cardNum,
      cardName,
      cvv,
      expiryYear: expiry,
    };
    const cartId = cart.id;
    if (
      !error.hasOwnProperty("cardNum") &&
      !error.hasOwnProperty("cvv") &&
      !error.hasOwnProperty("expiry") &&
      !error.hasOwnProperty("cardName")
    ) {
      await dispatch(addPaymentAsync({ cartId, reqbody }));
      if (user.id) {
        await dispatch(fetchCartAsync(user));
      }
      setPayForm(false);
    }
  };

  const handleFormShippingAddress = async (event) => {
    event.preventDefault();
    const error = shippingFormValidate(
      firstName,
      lastName,
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
      firstName,
      lastName,
      zipcode,
      state,
      city,
      phoneNumber,
    };
    const cartId = cart.id;
    if (
      !error.hasOwnProperty("address1") &&
      !error.hasOwnProperty("address2") &&
      !error.hasOwnProperty("state") &&
      !error.hasOwnProperty("city") &&
      !error.hasOwnProperty("zipcode") &&
      !error.hasOwnProperty("phoneNumber") &&
      !error.hasOwnProperty("firstName") &&
      !error.hasOwnProperty("lastName")
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
      cardName: payment.cardName,
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
      firstName: cart.user.firstName,
      lastName: cart.user.lastName,
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
    const orderPaymentId = cart.orderpayment.id;
    const reqbody = {
      totalCostWithTax,
      cartId,
      cartProdList,
      orderPaymentId,
    };
    await dispatch(updateCheckoutCartAsync(reqbody));
    await dispatch(fetchCartAsync(user));
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const shippingFormValidate = (
    firstName,
    lastName,
    address1,
    address2,
    zipcode,
    state,
    city,
    phoneNumber
  ) => {
    const error = {};
    if (!firstName) {
      error.firstName = "FirstName cant be blank";
    }
    if (!lastName) {
      error.lastName = "LastName cant be blank";
    }
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

    console.log(error);
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
    cardName,
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
    const expiryRegex = /^(0[1-9]|1[0-2])\/+([0-9]{2})$/;
    const monthAndYear = expiry.split("/");
    const month = Number(monthAndYear[0]);
    const year = Number(monthAndYear[1]);

    if (!expiry.match(expiryRegex)) {
      error.expiry = "Not a valid year";
    }

    if (year < 23 || (year == 23 && month < 3)) {
      error.expiry = "expired card";
    }

    const cvvRegex = /^[0-9]{3}$/;
    if (!cvv.match(cvvRegex)) {
      error.cvv = "Not a valid cvv";
    }
    if (!cardName) {
      error.cardName = "cardName cant be blank";
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
  const [cardName, setCardName] = useState("");

  const phoneNumberStyle = {
    padding: "0px",
    margin: "0px",
  };

  const cardNumWidth = {
    maxWidth: "100px",
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Checkout</h5>
              </div>
              <div>
                <div>
                  {cart.shipping ? (
                    <div>
                      <h3 className="mx-3 my-3">Shipping Address:</h3>
                      <p className="mx-3">
                        Name :{" "}
                        {cart?.shipping?.firstName +
                          " " +
                          cart?.shipping?.lastName}
                      </p>
                      <p className="mx-3">
                        Address Line1 : {cart.shipping.line1}
                      </p>
                      <p className="mx-3">
                        Address Line2 : {cart.shipping.line2}
                      </p>
                      <p className="mx-3">Zipcode : {cart.shipping.zipcode}</p>
                      <p className="mx-3">State : {cart.shipping.state}</p>
                      <p className="mx-3">City : {cart.shipping.city}</p>
                      <p className="mx-3">
                        Phone Number : {cart.shipping.phoneNumber}
                      </p>
                    </div>
                  ) : addresses ? (
                    <div>
                      <h3 className="mx-3 my-3">Shipping Address:</h3>
                      <p className="mx-3">
                        Name :{" "}
                        {cart?.user?.firstName + " " + cart?.user?.lastName}
                      </p>
                      <p className="mx-3">Address Line1 : {addresses.line1}</p>
                      <p className="mx-3">Address Line2 : {addresses.line2}</p>
                      <p className="mx-3">Zipcode : {addresses.zipcode}</p>
                      <p className="mx-3">State : {addresses.state}</p>
                      <p className="mx-3">City : {addresses.city}</p>
                      <p className="mx-3">
                        Phone Number : {addresses.phoneNumber}
                      </p>
                      {!cart.shipping?.id && (
                        <button
                          type="button"
                          className="btn btn-primary mb-4 mx-3"
                          onClick={handleShippingAddress}
                        >
                          Use
                        </button>
                      )}
                      {!cart.shipping?.id && (
                        <button
                          type="button"
                          className="btn btn-primary mb-4"
                          onClick={() => setForm(true)}
                        >
                          Change Shipping Address
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text mx-3 my-3">
                        There is no shipping address available
                      </p>
                      <button
                        type="button"
                        className="btn btn-primary mb-4 mx-3"
                        onClick={() => setForm(true)}
                      >
                        Add Shipping Address
                      </button>
                    </div>
                  )}
                  {
                    <section className="py-5 px-5">
                      <div>
                        {form && (
                          <form
                            className="border"
                            onSubmit={(event) =>
                              handleFormShippingAddress(event)
                            }
                          >
                            <h3 className="mx-2 my-2">
                              Add New Shipping address:
                            </h3>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="firstName">
                                FirstName :
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                className="form-control"
                                placeholder="firstName"
                                onChange={(event) => {
                                  setFirstName(event.target.value);
                                  setShipFormError({});
                                }}
                              />
                              <p className="text-danger-emphasis">
                                {shipFormError.firstName}
                              </p>
                            </div>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="firstName">
                                LastName :
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                className="form-control"
                                placeholder="lastName"
                                onChange={(event) => {
                                  setLastName(event.target.value);
                                  setShipFormError({});
                                }}
                              />
                              <p className="text-danger-emphasis">
                                {shipFormError.lastName}
                              </p>
                            </div>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="addressLine1"
                              >
                                Address Line1 :{" "}
                              </label>
                              <input
                                type="text"
                                name="addressLine1"
                                value={address1}
                                className="form-control"
                                placeholder="address line1"
                                onChange={(event) => {
                                  setAddress1(event.target.value);
                                  setShipFormError({});
                                }}
                              />
                              <p className="text-danger-emphasis">
                                {shipFormError.address1}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="addressLine2"
                              >
                                Address Line2 :{" "}
                              </label>
                              <input
                                type="text"
                                name="addressLine2"
                                className="form-control"
                                value={address2}
                                placeholder="address line2"
                                onChange={(event) => {
                                  setAddress2(event.target.value);
                                  setShipFormError({});
                                }}
                              />
                              <p className="text-danger-emphasis">
                                {shipFormError.address2}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label className="form-label" htmlFor="zipcode">
                                Zipcode :{" "}
                              </label>
                              <input
                                type="text"
                                name="zipcode"
                                className="form-control"
                                value={zipcode}
                                placeholder="zipcode"
                                onChange={(event) => {
                                  setZipcode(event.target.value);
                                  setShipFormError({});
                                }}
                              />
                              <p className="text-danger-emphasis">
                                {shipFormError.zipcode}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label className="form-label" htmlFor="state">
                                State :{" "}
                              </label>
                              <input
                                type="text"
                                name="state"
                                className="form-control"
                                value={state}
                                placeholder="state"
                                onChange={(event) => {
                                  setState(event.target.value);
                                  setShipFormError({});
                                }}
                              />
                              <p className="text-danger-emphasis">
                                {shipFormError.state}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label className="form-label" htmlFor="city">
                                City :{" "}
                              </label>
                              <input
                                type="text"
                                name="city"
                                className="form-control"
                                value={city}
                                placeholder="city"
                                onChange={(event) => {
                                  setCity(event.target.value);
                                  setShipFormError({});
                                }}
                              />
                              <p className="text-danger-emphasis">
                                {shipFormError.city}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="phoneNumber"
                              >
                                Phone Number :{" "}
                              </label>
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
                                isPossiblePhoneNumber(
                                  phoneNumber
                                ) ? undefined : (
                                  <p className="text-danger-emphasis">
                                    Invalid phone number
                                  </p>
                                )
                              ) : (
                                ""
                              )}
                              {!phoneNumber && (
                                <p className="text-danger-emphasis">
                                  {shipFormError.phoneNumber}
                                </p>
                              )}
                            </div>

                            <button
                              type="submit"
                              className="btn btn-primary mb-4 mx-2"
                            >
                              save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary mb-4"
                              onClick={() => setForm(false)}
                            >
                              cancel
                            </button>
                          </form>
                        )}
                      </div>
                    </section>
                  }
                </div>
                <div>
                  <p className="text mx-3 my-3">
                    Cart Total : ${cart.totalCost}
                  </p>
                  <p className="text mx-3 my-3">Tax : 5%</p>
                  <h3 className="text mx-3 my-3">
                    Checkout total : ${calculateTotalCost(cart.totalCost)}
                  </h3>
                  <p className="text mx-3 my-3">
                    {cart.totalCartItems} items added for checkout
                  </p>
                </div>
                <div>
                  <div>
                    <h3 className="text mx-3 my-3">Payment:</h3>
                    {cart.orderpayment ? (
                      <div>
                        <p className="mx-3">
                          Card :
                          {"************" +
                            cart.orderpayment.card?.substring(12)}
                        </p>
                        <p className="mx-3">
                          Expiry year : {cart.orderpayment.expiryYear}
                        </p>
                      </div>
                    ) : payment ? (
                      <div>
                        <p className="mx-3">
                          Card : {"************" + payment.card?.substring(12)}
                        </p>
                        <p className="mx-3">
                          Expiry year : {payment.expiryYear}
                        </p>
                        {!cart.orderpayment && (
                          <button
                            className="btn btn-primary mx-3 my-3"
                            type="button"
                            onClick={handlePayment}
                          >
                            Use
                          </button>
                        )}
                        {!cart.orderpayment && (
                          <button
                            className="btn btn-primary mx-3 my-3"
                            type="button"
                            onClick={() => setPayForm(true)}
                          >
                            Change Payment
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text mx-3 my-3">
                          There is no payment available
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary mb-4 mx-3"
                          onClick={() => setPayForm(true)}
                        >
                          Add New Payment
                        </button>
                      </div>
                    )}
                  </div>
                  {payForm && (
                    <section className="py-5 px-5">
                      <div>
                        <h3 className="mx-2 my-2">Add New Payment details:</h3>
                        <form
                          className="border"
                          onSubmit={(event) => handleFormPayment(event)}
                        >
                          <div className="mb-3">
                            <label className="form-label" htmlFor="cardNumber">
                              Card Number
                            </label>
                            <div className="d-flex">
                              <input
                                type="text"
                                name="cardFirst"
                                className="form-control"
                                value={cardFirst}
                                style={cardNumWidth}
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
                                style={cardNumWidth}
                                className="form-control"
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
                                style={cardNumWidth}
                                className="form-control"
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
                                style={cardNumWidth}
                                className="form-control"
                                placeholder="****"
                                maxLength={4}
                                onChange={(event) => {
                                  setCardFourth(event.target.value);
                                  setPayFormError({});
                                }}
                              />
                            </div>
                            <p className="text-danger-emphasis">
                              {payFormError.cardNum}
                            </p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="cvv">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={cvv}
                              style={cardNumWidth}
                              className="form-control"
                              placeholder="***"
                              maxLength={3}
                              onChange={(event) => {
                                setCvv(event.target.value);
                                setPayFormError({});
                              }}
                            />
                            <p className="text-danger-emphasis">
                              {payFormError.cvv}
                            </p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="expiry">
                              Name on Card:
                            </label>
                            <input
                              type="text"
                              name="cardName"
                              value={cardName}
                              className="form-control"
                              placeholder="Name on card"
                              onChange={(event) => {
                                setCardName(event.target.value);
                                setPayForm({});
                              }}
                            />
                            <p className="text-danger-emphasis">
                              {payFormError.cardName}
                            </p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="expiry">
                              Expiry year
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              value={expiry}
                              style={cardNumWidth}
                              className="form-control"
                              placeholder="MM/YY"
                              maxLength={5}
                              onChange={(event) => {
                                setExpiry(event.target.value);
                                setPayFormError({});
                              }}
                            />
                            <p className="text-danger-emphasis">
                              {payFormError.expiry}
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary mx-2 mb-2"
                          >
                            save
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary mb-2"
                            onClick={() => setPayForm(false)}
                          >
                            cancel
                          </button>
                        </form>
                      </div>
                    </section>
                  )}
                </div>
                {cart.shipping && cart.orderpayment ? (
                  <button
                    type="button"
                    className="btn btn-primary mx-3 my-3"
                    onClick={handlePlaceOrder}
                  >
                    Place order
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
