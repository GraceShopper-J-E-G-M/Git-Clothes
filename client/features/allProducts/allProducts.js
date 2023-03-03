import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAsync, selectAllProducts } from "..allProducts/allProductSlice";
// import { useParams, NavLink } from "react-router-dom";
import singleProduct from "../singleProduct/singleProduct";

const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  // const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  
  return (
    <div className='allProductsContainer'>
      {/* <Link to='/products/add-product'><button>Add to Cart</button></Link> */}
      <h1> All Products </h1>
      <div className= "products"> 
        {products.map((product)=> {
          return (
            <singleProduct key= {product.id} id = {product.id} product = {product}/>
          )
        })}
      </div>
      {/* {products && products.length
        ? products.map((product) => (
            <NavLink
              to={`/products/${product.id}`}
              key={`All Products: ${product.id}`} >
            </NavLink>
          ))
        : null} */}
    </div>
  );
};

export default AllProducts;