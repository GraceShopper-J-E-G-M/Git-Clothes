import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAsync, selectAllProducts } from "./allProductSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  // const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  
  return (
    <div className='allProductsContainer'>
      <h1> All Products </h1>
      <div className= "products"> 
        {products.map((product)=> {
          return (
            <singleProduct key= {product.id} id = {product.id} product = {product}/>
          )
        })}
      </div>
    </div>
  );
};

export default AllProducts;