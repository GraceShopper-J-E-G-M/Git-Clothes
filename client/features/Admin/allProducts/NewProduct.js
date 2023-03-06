import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newProduct } from "../../allProducts/allProductSlice";
import { fetchAllProductsAsync } from "../../allProducts/allProductSlice";

const AddNewProduct = () => {
    const sizeArray = ["XS","S","M","L","XL","XXL"];
    const colorArray = ["Red", "Pink", "Plum", "Mustard", "Burgundy", "Forest Green", "Beige", "Olive", "Grey", "Black", "Brown", "Dark Brown", "Blue"];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //need state for storing edit
    const [prodName, setProdName] = useState("");
    const [prodQuantity, setprodQuantity] = useState(0);
    const [prodPrice, setProdPrice] = useState(0.00);
    const [prodSize, setProdSize] = useState("");
    const [prodColor, setProdColor] = useState("");
    const [prodImg, setProdImg] = useState("");

    return (
        <form className="addNew" onSubmit={(event) => {
            event.preventDefault();
            //create an updated ProductObj to send to backend
            const productObj = {
                prodName,
                prodQuantity,
                prodPrice,
                prodSize,
                prodColor,
                prodImg,
            }
            dispatch(newProduct(productObj));
            dispatch(fetchAllProductsAsync());
            //might need to fix route
            navigate("/api/products");
        }}>
            {/* Input Product Info */}
            <div className="inputRow">
                <p>Product Name:</p>
                <input onChange={(event) => {
                    setProdName(event.target.value)
                }}
                    value={prodName}></input>
            </div>
            <div className="inputRow">
                <p>Product Quantity:</p>
                <input onChange={(event) => {
                    setprodQuantity(event.target.value)
                }}
                    value={prodQuantity}></input>
            </div>
            <div className="inputRow">
                <p>Product Price:</p>
                <input onChange={(event) => {
                    setProdPrice(event.target.value)
                }}
                    value={prodPrice}></input>
            </div>
            {/* Product size drop down menu */}
            <select className="inputRow"
                    onChange={(event) => {
                        setProdSize(event.target.value)
                    }}
                    value={prodSize}>
                    {sizeArray.map((size) => (
                        <option value={size}>{size}</option>
                    ))}
            </select>
            {/* Product color drop down menu */}
            <select className="inputRow"
                    onChange={(event) => {
                        setProdColor(event.target.value)
                    }}
                    value={prodColor}>
                    {colorArray.map((color) => (
                        <option value={color}>{color}</option>
                    ))}
            </select>
            <div className="inputRow">
                <p>Image:</p>
                <input onChange={(event) => {
                    setProdImg(event.target.value)
                }}
                    value={prodImg}></input>
            </div>
            <br></br>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddNewProduct;


//note for Jessie: remember inthe admin single product feature - add a field for Quantity