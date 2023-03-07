import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newProduct } from "../../allProducts/allProductSlice";
import { fetchAllProductsAsync } from "../../allProducts/allProductSlice";

const AddNewProduct = () => {
    const sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];
    const colorArray = ["Red", "Pink", "Plum", "Mustard", "Burgundy", "Forest Green", "Beige", "Olive", "Grey", "Black", "Brown", "Dark Brown", "Blue"];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //need state for storing edit
    const [newProdName, setProdName] = useState("");
    const [newProdQuantity, setProdQuantity] = useState(0);
    const [newProdPrice, setProdPrice] = useState(0.00);
    const [newProdSize, setProdSize] = useState("XS");
    const [newProdColor, setProdColor] = useState("Red");
    const [newProdImg, setProdImg] = useState("");

    const handleAddProduct = async (event) => {
        event.preventDefault();
        //create an updated ProductObj to send to backend
        const productObj = {
            prodName: newProdName,
            prodQuantity: newProdQuantity,
            prodPrice: newProdPrice,
            prodSize: newProdSize,
            prodColor: newProdColor,
            prodImg: newProdImg,
        };
        console.log(productObj);
        await dispatch(newProduct(productObj));
        setProdName("");
        setProdQuantity(0);
        setProdPrice(0.00);
        setProdSize("XS");
        setProdColor("Red");
        setProdImg("");
        await dispatch(fetchAllProductsAsync());
        navigate("/allAdminProducts");
    };

    return (
        <form onSubmit={event => handleAddProduct(event)}>
            <label>Product Name:
                <input type="text" name="productName" value={newProdName}
                    onChange={event => setProdName(event.target.value)} />
            </label>
            <label>Product Quantity:
                <input type="number" name="productQuantity" value={newProdQuantity}
                    onChange={event => setProdQuantity(event.target.value)} />
            </label>
            <label>Product Price:
                <input type="number" step="0.01" name="productPrice" value={newProdPrice}
                    onChange={event => setProdPrice(event.target.value)} />
            </label>
            <label>Product Size:
                <select name="prodSize"
                    onChange={(event) => setProdSize(event.target.value)}>
                    {sizeArray.map((size, index) => (
                        <option value={size} key={index}>{size}</option>
                    ))}
                </select>
            </label>
            <label>Product Color:
                <select name="prodColor"
                    onChange={(event) => setProdColor(event.target.value)}>
                    {colorArray.map((color, index) => (
                        <option value={color} key={index}>{color}</option>
                    ))}
                </select>
            </label>
            <label>Product Img:
                <input type="text" name="productImg" value={newProdImg}
                    onChange={event => setProdImg(event.target.value)} />
            </label>
            <br></br>
            <button type="submit">Update</button>
        </form>
    )
}

export default AddNewProduct;


//note for Jessie: remember inthe admin single product feature - add a field for Quantity