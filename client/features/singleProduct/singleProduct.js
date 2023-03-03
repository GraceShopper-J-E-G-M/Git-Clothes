import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchSingleProduct, selectSingleProduct } from './singleProductSlice';
import { fetchProductsAsync } from '../allProducts/allProductSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { prodId } = useParams();

    //need state for selecting color and size
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const product = useSelector(selectSingleProduct);
    const { prodName, prodQuantity, prodPrice, prodSize, prodColor, prodImg } = product;

    const colorArray = prodColor;
    console.log(colorArray);

    useEffect(() => {
        dispatch(fetchSingleProduct(prodId));
        // dispatch(fetchProductsAsync());
    }, [dispatch]);

    // useEffect hook so the state doesn't cause an infinity loop
    useEffect(() => {
        setSelectedColor("red");
        setSelectedSize("XS");
    }, [product])

    return (
        // container will be flex row
        <section className="singleProductContainer">
            <img className="productImage" src={prodImg}></img>
            <form className="productDetails"
                onSubmit={(event) => {
                    event.preventDefault();
                    // dispatch add to cart
                }}>
                <p className="productName">{prodName}</p>
                <p className="productPrice">{`$ ${prodPrice}`}</p>
                <p>{prodColor}</p>
                <p>{selectedColor}</p>

                {/* Drop down menu for selecting color */}
                <select className="productColorSelector"
                    onChange={(event) => {
                        setSelectedColor(event.target.value)
                    }}
                    value={selectedColor}>
                    {prodColor?.map((color) => {
                        <option value={color}>{color}</option>
                    })}
                </select>

                {/* Drop down menu for selecting size */}
                <select className="productSizeSelector"
                    onChange={(event) => {
                        setSelectedSize(event.target.value)
                    }}
                    value={selectedSize}>
                    {prodSize?.map((size) => {
                        <option value={size}>{size}</option>
                    })}
                </select>

                <button type="submit">Add to Cart</button>
            </form>
        </section>
    )
}

export default SingleProduct;
