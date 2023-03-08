import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProductsAsync, selectAllProducts } from "./allProductSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  // const { productId } = useParams();
  console.log("allProducts", allProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <h2> All Products </h2>
      <div className="allProductsContainer">
        <div className="products">
          {allProducts.map((product, i) => {
            return (
              <div key={`inside the all products view ${i}`}>
                <Link to={`/allProducts/${product.id}`}>
                  <h2>{product.prodName}</h2>
                <img src={product.prodImg} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
