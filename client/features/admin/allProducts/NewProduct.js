/**
 * This file contains a `AddNewProduct` component form for an admin to add a new product.
 */

//Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Files
import { newProduct } from "../../allProducts/allProductSlice";
import { fetchAllProductsAsync } from "../../allProducts/allProductSlice";

/**
 * AddNewProduct component.
 */
const AddNewProduct = () => {
  const sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];
  const colorArray = [
    "Red",
    "Pink",
    "Plum",
    "Mustard",
    "Burgundy",
    "Forest Green",
    "Beige",
    "Olive",
    "Grey",
    "Black",
    "Brown",
    "Dark Brown",
    "Blue",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Local state for storing an admin's edits to the form
  const [newProdName, setProdName] = useState("");
  const [newProdQuantity, setProdQuantity] = useState(0);
  const [newProdPrice, setProdPrice] = useState(0.0);
  const [newProdSize, setProdSize] = useState("XS");
  const [newProdColor, setProdColor] = useState("Red");
  const [newProdImg, setProdImg] = useState("");

  const handleAddProduct = (event) => {
    event.preventDefault();
    //Create an updated ProductObj to send to backend
    const productObj = {
      prodName: newProdName,
      prodQuantity: newProdQuantity,
      prodPrice: newProdPrice,
      prodSize: newProdSize,
      prodColor: newProdColor,
      prodImg: newProdImg,
    };
    dispatch(newProduct(productObj));
    setProdName("");
    setProdQuantity(0);
    setProdPrice(0.0);
    setProdSize("XS");
    setProdColor("Red");
    setProdImg("");
    dispatch(fetchAllProductsAsync());
    navigate("/allAdminProducts");
  };

  return (
    <form id="addNewProduct" onSubmit={(event) => handleAddProduct(event)}>
      <label>
        Product Name:
        <input
          type="text"
          name="productName"
          value={newProdName}
          onChange={(event) => setProdName(event.target.value)}
        />
      </label>
      <label>
        Product Quantity:
        <input
          type="number"
          name="productQuantity"
          value={newProdQuantity}
          onChange={(event) => setProdQuantity(event.target.value)}
        />
      </label>
      <label>
        Product Price:
        <input
          type="number"
          step="0.01"
          name="productPrice"
          value={newProdPrice}
          onChange={(event) => setProdPrice(event.target.value)}
        />
      </label>
      <label>
        Product Size:
        <select
          name="prodSize"
          onChange={(event) => setProdSize(event.target.value)}
        >
          {sizeArray.map((size, index) => (
            <option value={size} key={index}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <label>
        Product Color:
        <select
          name="prodColor"
          onChange={(event) => setProdColor(event.target.value)}
        >
          {colorArray.map((color, index) => (
            <option value={color} key={index}>
              {color}
            </option>
          ))}
        </select>
      </label>
      <label>
        Product Img:
        <input
          type="text"
          name="productImg"
          value={newProdImg}
          onChange={(event) => setProdImg(event.target.value)}
        />
      </label>
      <br></br>
      <button className="submitNewProduct" type="submit">
        Update
      </button>
    </form>
  );
};

export default AddNewProduct;

//note for Jessie: remember inthe admin single product feature - add a field for Quantity
