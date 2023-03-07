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

    const handleDeleteProduct = async (event) => {
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
    }

    return (
        <form className="update" onSubmit={(event) => handleDeleteProduct(event)}>
            {/* Single Product info */}
            <div className="inputRow">
                <p>Product Name:</p>
                <input 
                value={newProdName}
                onChange={(event) => {
                    setProdName(event.target.value)
                    console.log(newProdName);
                }}></input>
            </div>
            <div className="inputRow">
                <p>Product Quantity:</p>
                <input 
                value={newProdQuantity}
                onChange={(event) => {
                    setProdQuantity(event.target.value)
                }}></input>
            </div>
            <div className="inputRow">
                <p>Product Price:</p>
                <input 
                value={newProdPrice}
                onChange={(event) => {
                    setProdPrice(event.target.value)
                }}></input>
            </div>
            {/* Product size drop down menu */}
            <select className="inputRow"
                value={newProdSize}
                    onChange={(event) => {
                        setProdSize(event.target.value)
                    }}>
                    {sizeArray.map((size) => (
                        <option value={size}>{size}</option>
                    ))}
            </select>
            {/* Product color drop down menu */}
            <select className="inputRow"
                    value={newProdColor}
                    onChange={(event) => {
                        setProdColor(event.target.value)
                    }}>
                    {colorArray.map((color) => (
                        <option value={color}>{color}</option>
                    ))}
            </select>
            <div className="inputRow">
                <p>Image:</p>
                <input 
                value={newProdImg}
                onChange={(event) => {
                    setProdImg(event.target.value)
                }}></input>
            </div>
            <br></br>
            <button type="submit">Submit</button>
        </form>
    )
}

export default updateProduct;