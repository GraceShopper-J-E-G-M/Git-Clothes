import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart } from "./cartSlice";
import { editOrderItemAsync, deleteOrderItemAsync } from "./orderItemSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  //console.log("User:", user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  const cart = useSelector(selectCart);
  console.log("After dispatch:", cart);

  const [qty, setQty] = useState(1);
  const handleUpdateQuantity = async (orderItemId, prodPrice) => {
    const reqBody = { qty, prodPrice };
    await dispatch(editOrderItemAsync({ orderItemId, reqBody }));
    await dispatch(fetchCartAsync(user));
  };

  const handleDelete = async (orderItemId) => {
    await dispatch(deleteOrderItemAsync(orderItemId));
    await dispatch(fetchCartAsync(user));
  };

  return (
    <div>
      {cart?.orderItems?.length > 0 ? (
        <div>
          <p>Total CartQty:{cart?.totalCartItems}</p>
          <p>Total CartCost:{cart?.totalCost}</p>
          {cart?.orderItems?.map((orderItem) => {
            return (
              <div key={orderItem.id}>
                <p>ProdName:{orderItem.product.prodName}</p>
                <input
                  type="number"
                  name="quantity"
                  onChange={(event) => setQty(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateQuantity(
                      orderItem.id,
                      orderItem.product.prodPrice
                    )
                  }
                >
                  Update
                </button>
                <p>ProdQty:{orderItem.quantity}</p>
                <p>ProdPrice:{orderItem.product.prodPrice}</p>
                <p>ProdTotal:{orderItem.total}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(orderItem.id)}
                >
                  Delete
                </button>
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        <div>There are no items in the cart</div>
      )}
    </div>
  );
};
export default Cart;
