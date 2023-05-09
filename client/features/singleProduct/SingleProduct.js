/**
 * This file contains a `SingleProduct` component to display a single product based on id.
 */

//Libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

//Files
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";
import { addCartAsync } from "../cart/cartSlice";

/**
 * SingleProduct component.
 */
const SingleProduct = () => {
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

  //Local state to store a user's selections for color and size
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const product = useSelector(selectSingleProduct);
  const user = useSelector((state) => state.auth.me);

  const { prodName, prodPrice, prodSize, prodColor, prodImg } = product;

  useEffect(() => {
    dispatch(fetchSingleProduct(prodId));
  }, [dispatch]);

  useEffect(() => {
    setSelectedColor(prodColor);
    setSelectedSize(prodSize);
  }, [product]);

  const addToCart = async (event) => {
    event.preventDefault();
    const reqbody = {
      userId: user.id,
      prodId: product.id,
    };
    await dispatch(addCartAsync(reqbody));
    navigate("/cart");
  };

  return (
    <div>
      <section className="singleProductContainer">
        <img className="productImage" src={prodImg}></img>
        <form
          className="productDetails"
          onSubmit={(event) => {
            addToCart(event);
          }}
        >
          <p className="productName">{prodName}</p>
          <p className="productPrice">{`$ ${prodPrice}`}</p>

          {/* Drop down menu for selecting color */}
          <select
            className="productColorSelector"
            onChange={(event) => {
              setSelectedColor(event.target.value);
            }}
            value={selectedColor}
          >
            {colorArray.map((color) => (
              <option value={color}>{color}</option>
            ))}
          </select>

          {/* Drop down menu for selecting size */}
          <select
            className="productSizeSelector"
            onChange={(event) => {
              setSelectedSize(event.target.value);
            }}
            value={selectedSize}
          >
            {sizeArray.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
          {product.prodQuantity < 1 && <p>Out of Stock</p>}
          {product.prodQuantity >= 1 && (
            <button type="submit">Add to Cart</button>
          )}
          <button>
            <Link to="/allProducts">Back to all products</Link>
          </button>
        </form>
      </section>
    </div>
  );
};

export default SingleProduct;
