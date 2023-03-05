import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAsync, selectAllProducts } from "./allProductSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return (
    <div className="allProductsContainer">
      <h1> All Products </h1>
      <div className="products">
        {allProducts.map((product) => {
          return (
            <div>
              <h2>{product.prodName}</h2>
              <img src={product.prodImg} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
