import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";
import { newProduct } from "../allProducts/allProductSlice";
import { addCartAsync } from "../cart/cartSlice";

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

  //need state for selecting color and size
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const product = useSelector(selectSingleProduct);
  const user = useSelector((state) => state.auth.me);

  const { prodName, prodQuantity, prodPrice, prodSize, prodColor, prodImg } =
    product;

  useEffect(() => {
    dispatch(fetchSingleProduct(prodId));
  }, [dispatch]);

  // useEffect hook so the state doesn't cause an infinity loop
  useEffect(() => {
    setSelectedColor(prodColor);
    setSelectedSize(prodSize);
  }, [product]);

  const addToCart = async (event) => {
    event.preventDefault();
    // const productObj = {
    //   id: prodId,
    //   prodName,
    //   prodQuantity,
    //   prodPrice,
    //   prodSize: selectedSize,
    //   prodColor: selectedColor,
    //   prodImg,
    // }
    // console.log(productObj);
    // await dispatch(editProduct(productObj));
    const reqbody = {
      userId: user.id,
      prodId: product.id,
      // selectedColor,
      // selectedSize,
    };
    await dispatch(addCartAsync(reqbody));
    navigate("/cart");
  };

  return (
    // container will be flex row
    <div>
      <section className="singleProductContainer">
        <img className="productImage" src={prodImg}></img>
        <form
          className="productDetails"
          onSubmit={(event) => {
            //event.preventDefault();
            addToCart(event);
            // dispatch add to cart
            // addCartAsync();
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
