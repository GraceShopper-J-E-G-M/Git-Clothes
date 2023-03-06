import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSingleProduct,
    editProduct,
    selectSingleProduct,
} from "../../singleProduct/singleProductSlice";
import { fetchAllProductsAsync } from "../../allProducts/allProductSlice";

const updateProduct = () => {
    const sizeArray = ["XS","S","M","L","XL","XXL"];
    const colorArray = ["Red", "Pink", "Plum", "Mustard", "Burgundy", "Forest Green", "Beige", "Olive", "Grey", "Black", "Brown", "Dark Brown", "Blue"];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { prodId } = useParams();

    //need state for storing edit
    const [newProdName, setProdName] = useState("");
    const [newProdQuantity, setProdQuantity] = useState(0);
    const [newProdPrice, setProdPrice] = useState(0.00);
    const [newProdSize, setProdSize] = useState("");
    const [newProdColor, setProdColor] = useState("");
    const [newProdImg, setProdImg] = useState("");

    //fetch product
    const product = useSelector(selectSingleProduct);
    const { prodName, prodQuantity, prodPrice, prodSize, prodColor, prodImg } = product;

    useEffect(() => {
        dispatch(fetchSingleProduct(prodId));
        dispatch(fetchAllProductsAsync());
    }, [dispatch]);

    // useEffect hook so the state doesn't cause an infinity loop
    useEffect(() => {
        setProdName(prodName);
        setProdQuantity(prodQuantity);
        setProdPrice(prodPrice);
        setProdSize(prodSize);
        setProdColor(prodColor);
        setProdImg(prodImg);
    }, [product])

    return (
        <form className="update" onSubmit={(event) => {
            event.preventDefault();
            //create an updated ProductObj to send to backend
            const productObj = {
                id: prodId,
                prodName: newProdName,
                prodQuantity: newProdQuantity,
                prodPrice: newProdPrice,
                prodSize: newProdSize,
                prodColor: newProdColor,
                prodImg: newProdImg,
            }
            console.log(productObj);
            dispatch(editProduct(productObj));
            dispatch(fetchSingleProduct(prodId));
            dispatch(fetchAllProductsAsync());
            //might need to fix route
            navigate(`/allProducts/${prodId}`);
        }}>
            {/* Single Product info */}
            <div className="inputRow">
                <p>Product Name:</p>
                <input onChange={(event) => {
                    setProdName(event.target.value)
                }}
                    value={newProdName}></input>
            </div>
            <div className="inputRow">
                <p>Product Quantity:</p>
                <input onChange={(event) => {
                    setProdQuantity(event.target.value)
                }}
                    value={newProdQuantity}></input>
            </div>
            <div className="inputRow">
                <p>Product Price:</p>
                <input onChange={(event) => {
                    setProdPrice(event.target.value)
                }}
                    value={newProdPrice}></input>
            </div>
            {/* Product size drop down menu */}
            <select className="inputRow"
                    onChange={(event) => {
                        setProdSize(event.target.value)
                    }}
                    value={newProdSize}>
                    {sizeArray.map((size) => (
                        <option value={size}>{size}</option>
                    ))}
            </select>
            {/* Product color drop down menu */}
            <select className="inputRow"
                    onChange={(event) => {
                        setProdColor(event.target.value)
                    }}
                    value={newProdColor}>
                    {colorArray.map((color) => (
                        <option value={color}>{color}</option>
                    ))}
            </select>
            <div className="inputRow">
                <p>Image:</p>
                <input onChange={(event) => {
                    setProdImg(event.target.value)
                }}
                    value={newProdImg}></input>
            </div>
            <br></br>
            <button type="submit">Submit</button>
        </form>
    )
}

export default updateProduct;