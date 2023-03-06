import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllProductsAsync, removeProduct, selectAllProducts } from "../../allProducts/allProductSlice";
import AddNewProduct from "./NewProduct";

const AdminAllProducts = () => {
    const products = useSelector(selectAllProducts);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Need to fix navigate and links
    return (
        // flex row
        <div className="allDisplay">
            <section id="adminAllProducts">
                {products && products.length
                    ? products.map((product) => (
                        <div className="adminProduct" key={product.prodId}>
                            <Link to={`/api/products/${product.prodId}`}>
                                <h2>{product.prodName}</h2>
                            </Link>
                                <p>{`Price: ${product.prodPrice}`}</p>
                                <button onClick={() => {
                                    dispatch(removeProduct(product.prodId));
                                    dispatch(fetchAllProductsAsync());
                                    navigate("/api/products");
                                }}>Delete Student</button>
                        </div>
                    ))
                    : null}
            </section>
            <AddNewProduct />
        </div>
    )
}

export default AdminAllProducts;