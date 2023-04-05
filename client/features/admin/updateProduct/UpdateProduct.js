/**
 * This file contains an `UpdateProduct` component to display a form
 * for an admin to update a product.
 */

//Libraries
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Files
import {
  fetchSingleProduct,
  editProduct,
  selectSingleProduct,
} from "../../singleProduct/singleProductSlice";

/**
 * `UpdateProduct` component.
 */
const UpdateProduct = () => {
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
  const { prodId } = useParams();

  //Local state for storing an admin's edits.
  const [newProdName, setProdName] = useState("");
  const [newProdQuantity, setProdQuantity] = useState(0);
  const [newProdPrice, setProdPrice] = useState(0.0);
  const [newProdSize, setProdSize] = useState("XS");
  const [newProdColor, setProdColor] = useState("Red");
  const [newProdImg, setProdImg] = useState("");

  const product = useSelector(selectSingleProduct);
  const { prodName, prodQuantity, prodPrice, prodSize, prodColor, prodImg } =
    product;

  useEffect(() => {
    dispatch(fetchSingleProduct(prodId));
  }, [dispatch]);
  useEffect(() => {
    setProdName(prodName);
    setProdQuantity(prodQuantity);
    setProdPrice(prodPrice);
    setProdSize(prodSize);
    setProdColor(prodColor);
    setProdImg(prodImg);
  }, [product]);

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    //Create an updated ProductObj to send to backend
    const productObj = {
      id: prodId,
      prodName: newProdName,
      prodQuantity: newProdQuantity,
      prodPrice: newProdPrice,
      prodSize: newProdSize,
      prodColor: newProdColor,
      prodImg: newProdImg,
    };
    dispatch(editProduct(productObj));
    dispatch(fetchSingleProduct(prodId));
    navigate(`/allAdminProducts`);
  };

  return (
    <form id="updateProduct" onSubmit={(event) => handleUpdateProduct(event)}>
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
          type="text"
          name="productQuantity"
          value={newProdQuantity}
          onChange={(event) => setProdQuantity(event.target.value)}
        />
      </label>
      <label>
        Product Price:
        <input
          type="text"
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
      <button type="submit">Update</button>
      <Link to="/allAdminProducts">
        <button>Back to All Products</button>
      </Link>
    </form>
  );
};

export default UpdateProduct;
