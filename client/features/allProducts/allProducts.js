import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAsync, selectAllProducts } from "./allProductSlice";
import SingleProduct from "../singleProduct/singleProduct";

const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  // const { productId } = useParams();
  console.log('allProducts', allProducts);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return (
    <div className="allProductsContainer">
      <Link to="/admin">
        <button>Back to admin portal</button>
      </Link>
      <h1> All Products </h1>
      <div className="products">
        {allProducts.map((product) => {
          return (
            // <SingleProduct key={product.id} id={product.id} product={product} />
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
