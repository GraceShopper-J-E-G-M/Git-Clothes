import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart } from "./cartSlice";
import {
  editOrderItemAsync,
  deleteOrderItemAsync,
  selectOrderItem,
} from "./orderItemSlice";
import { useNavigate, Link } from "react-router-dom";

import Checkout from "../checkout/Checkout";

/* This component is used to display cart with orderItems */
const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  const cart = useSelector(selectCart);
  const orderItem = useSelector(selectOrderItem);

  const [qty, setQty] = useState(1);

  /* This function is used to update quantity in the cart */
  const handleUpdateQuantity = async (orderItemId, prodPrice) => {
    const reqBody = { qty, prodPrice };
    await dispatch(editOrderItemAsync({ orderItemId, reqBody }));
    await dispatch(fetchCartAsync(user));
  };

  /* This function is used to delete the product in the cart */
  const handleDelete = async (orderItemId) => {
    await dispatch(deleteOrderItemAsync(orderItemId));
    await dispatch(fetchCartAsync(user));
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart items</h5>
                <p className="text-danger-emphasis">
                    Note: This app is a Capstone Project. Orders will not
                    actually be sent to Store
                  </p>
              </div>
              <div className="card-body">
                <div>
                  {orderItem.name === "Error" && (
                    <p className="text-danger-emphasis">{orderItem.message}</p>
                  )}
                  {cart?.orderItems?.length > 0 ? (
                    <div>
                      <p>Total items: {cart?.totalCartItems}</p>
                      <p>Pre-Tax Order Total: ${cart?.totalCost}</p>
                      {cart?.orderItems?.map((orderItem) => {
                        return (
                          <div className="row" key={orderItem.id}>
                            <span className="border border-top-0 mb-3"></span>
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                              <div
                                className="bg-image hover-overlay hover-zoom ripple rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={orderItem.product.prodImg}
                                  className="w-100"
                                  alt={orderItem.product.prodName}
                                />
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                              <p>
                                <Link
                                  to={`/allProducts/${orderItem.product.id}`}
                                >
                                  <strong>{orderItem.product.prodName}</strong>
                                </Link>
                              </p>
                              
                              <button
                                type="button"
                                className="btn btn-danger btn-sm me-1 mb-2"
                                data-mdb-toggle="tooltip"
                                onClick={() => handleDelete(orderItem.id)}
                                title="Remove item"
                              >
                                Delete
                                
                              </button>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                              <div
                                className="d-flex mb-4 flex-column align-items-end"
                            
                              >
                                <input
                                  type="number"
                                  name="quantity"
                                  className="mb-2"
                                  onChange={(event) =>
                                    setQty(event.target.value)
                                  }
                                />
                                {qty >= 0 &&
                                  (qty == 0 ? (
                                    <button
                                      type="button"
                                      className="btn btn-primary mb-4 d-block ms-4"
                                      onClick={() => handleDelete(orderItem.id)}
                                    >
                                      Update
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-primary mb-4"
                                      onClick={() =>
                                        handleUpdateQuantity(
                                          orderItem.id,
                                          orderItem.product.prodPrice
                                        )
                                      }
                                    >
                                      Update
                                    </button>
                                  ))}
                                <p className="text-start text-md-center">
                                  <strong>
                                    ${orderItem.product.prodPrice}
                                  </strong>
                                </p>
                              </div>
                            </div>

                            <p>ProdQty : {orderItem.quantity}</p>

                            <p>
                              ProdTotal : <strong>${orderItem.total}</strong>
                            </p>

                            <br />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>There are no items in the cart</div>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary mb-4 mx-3"
                    onClick={() => {
                      navigate("/allProducts");
                    }}
                  >
                    Back to Shopping
                  </button>
                  {cart?.orderItems?.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-primary mb-4"
                      onClick={() => {
                        navigate("/checkout");
                      }}
                    >
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Cart;
