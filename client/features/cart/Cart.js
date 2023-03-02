import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const [inpUser, setInpUser] = useState(user);

  useEffect(() => {
    if (inpUser) {
      dispatch(fetchCartAsync(inpUser));
    }
  }, [dispatch, inpUser]);

  const cart = useSelector(selectCart);
  console.log("After dispatch:", cart);

  return (
    <div>
      {cart[0]?.orderItems?.length > 0 ? (
        <div>
          <p>Total CartQty:{cart[0]?.totalCartItems}</p>
          <p>Total CartCost:{cart[0]?.totalCost}</p>
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
