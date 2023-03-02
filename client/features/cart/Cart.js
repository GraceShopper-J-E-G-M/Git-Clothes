import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartAsync(userId));
  }, [dispatch]);

  const cart = useSelector(selectCart);
  console.log("After dispatch:", cart);
  const [userId, setUserId] = useState(3);

  return (
    <div>
      <div>
        <p>Total CartQty:{cart[0]?.TotalCartItems}</p>
        <p>Total CartCost:{cart[0]?.TotalCost}</p>
      </div>
      {cart[0]?.orderItems?.length > 0 ? (
        <div>
          {cart[0]?.orderItems?.map((orderItem) => {
            return (
              <div key={orderItem.id}>
                <p>ProdName:{orderItem.product.prodName}</p>
                <p>ProdQty:{orderItem.quantity}</p>
                <p>ProdPrice:{orderItem.product.prodPrice}</p>
                <p>ProdTotal:{orderItem.total}</p>
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
