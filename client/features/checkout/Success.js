//Libraries
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Files
import { fetchCheckoutCartAsync, selectCheckout } from "./checkoutSlice";

/**
 * Success component.
 */
const Success = () => {
  const { cartId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    const handleDispatch = async () => {
      if (user) {
        dispatch(fetchCheckoutCartAsync(cartId));
      }
    };
    handleDispatch();
  }, [dispatch, cartId]);

  const cart = useSelector(selectCheckout);

  const imgWidth = {
    width: "120px",
  };
  return (
    <div>
      <h3 className="mx-3">
        Thanks for shopping with us. Your order number: {cartId}
      </h3>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  {cart?.orderItems?.length > 0 && (
                    <div>
                      <p>Total items : {cart?.totalCartItems}</p>
                      <p>Total : ${cart?.totalCost}</p>
                      {cart?.orderItems?.map((orderItem) => {
                        return (
                          <div className="row" key={orderItem.id}>
                            <span className="border border-top-0"></span>
                            <div className="col-lg-3 col-md-12 mb-4 mt-3 mb-lg-0">
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
                              <p>OrderedQty : {orderItem.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Link className="mx-3" to={"/allProducts"}>
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
