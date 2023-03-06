import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchSingleProduct, selectSingleProduct } from './singleProductSlice';
import { addCartAsync } from '../cart/cartSlice';



const SingleProduct = () => {
    const sizeArray = ["XS","S","M","L","XL","XXL"];
    const colorArray = ["Red", "Pink", "Plum", "Mustard", "Burgundy", "Forest Green", "Beige", "Olive", "Grey", "Black", "Brown", "Dark Brown", "Blue"];
    console.log(colorArray);

    const dispatch = useDispatch();
    const { prodId } = useParams();

    //need state for selecting color and size
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const product = useSelector(selectSingleProduct);
    console.log(product);

    const { prodName, prodPrice, prodSize, prodColor, prodImg } = product;

    useEffect(() => {
        dispatch(fetchSingleProduct(prodId));
    }, [dispatch]);

    // useEffect hook so the state doesn't cause an infinity loop
    useEffect(() => {
        setSelectedColor(prodColor);
        setSelectedSize(prodSize);
    }, [product])

    return (
        // container will be flex row
        <section className="singleProductContainer">
            <img className="productImage" src={prodImg}></img>
            <form className="productDetails"
                onSubmit={(event) => {
                    event.preventDefault();
                    // dispatch add to cart
                    // addCartAsync();
                }}>
                <p className="productName">{prodName}</p>
                <p className="productPrice">{`$ ${prodPrice}`}</p>

                {/* Drop down menu for selecting color */}
                <select className="productColorSelector"
                    onChange={(event) => {
                        setSelectedColor(event.target.value)
                    }}
                    value={selectedColor}>
                    {colorArray.map((color) => (
                        <option value={color}>{color}</option>
                    ))}
                </select>

                {/* Drop down menu for selecting size */}
                <select className="productSizeSelector"
                    onChange={(event) => {
                        setSelectedSize(event.target.value)
                    }}
                    value={selectedSize}>
                    {sizeArray.map((size) => (
                        <option value={size}>{size}</option>
                    ))}
                </select>

                <button type="submit">Add to Cart</button>
            </form>
        </section>
    )
}

export default SingleProduct;