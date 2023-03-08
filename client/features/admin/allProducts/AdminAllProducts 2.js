import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllProductsAsync, removeProduct, selectAllProducts } from "../../allProducts/allProductSlice";
import AddNewProduct from "./NewProduct";

const AdminAllProducts = () => {
    const products = useSelector(selectAllProducts);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    //fetch data 
    useEffect(() => {
        dispatch(fetchAllProductsAsync());
        setLoading(false);
    }, [dispatch]);

    const handleDeleteProduct = async (event, id) => {
        event.preventDefault();
        await dispatch(removeProduct(id));
        await dispatch(fetchAllProductsAsync());
        navigate("/allProducts");
    };

    return loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
    ) : (
        // flex row
        <div className="allDisplay">
            <Link to="/admin">
                <button>Back to admin portal</button>
            </Link>
            <section id="adminAllProducts">
                {products && products.length
                    ? products.map((product) => (
                        <div key={product.id.toString()} className="adminProduct">
                            <Link to={`/allProducts/${product.id}`}>
                                <h2>{product.id} {product.prodName}</h2>
                            </Link>
                            <p>{`Price: ${product.prodPrice}`}</p>
                            <button onClick={(event) => handleDeleteProduct(event, product.id)}>Delete Product</button>
                        </div>
                    ))
                    : null}
            </section>
            <AddNewProduct />
        </div>
    )
}

export default AdminAllProducts;