import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync } from "..allProducts/allProductSlice";
import { NavLink } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampusesAsync());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  return (
    <div>
      {/* <Link to='/products/add-product'><button>Add to Cart</button></Link> */}
      {products && products.length
        ? products.map((product) => (
            <NavLink
              to={`/products/${product.id}`}
              key={`All Products: ${product.id}`} >
            </NavLink>
          ))
        : null}
    </div>
  );
};

export default AllProducts;