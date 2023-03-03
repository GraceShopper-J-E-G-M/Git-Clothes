import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { selectSingleProduct } from './singleProductSlice';

const singleProduct = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();

    //need state for selecting color and size
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    const product = useSelector(selectSingleProduct);
    const { prodName, prodQuantity, prodPrice, prodSize, prodColor, prodImg } = product;

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
        //change if erica name the line below differently
        dispatch(fetchAllProductsAsync());
    }, [dispatch]);

    //useEffect hook so the state doesn't cause an infinity loop
    useEffect(() => {
        setColor(prodColor);
        setSize(prodSize);
    },[product])

    return (
        //container will be flex row
        <section className="singleProductContainer">
            <img className="productImage" src={prodImg}></img>
            <div className="productDetails">
                <p>{prodName}</p>
                <p>{prodPrice}</p>

                <select className="productColorSelector" 
                onChange={(event) => {
                    setColor(event.target.value)
                }}
                value={prodColor}>
                    {prodColor.map((color) => {
                        <option value={color}>{color}</option>
                    })}
                </select>

                <select className="productSizeSelector" 
                onChange={(event) => {
                    setSize(event.target.value)
                }}
                value={prodSize}>
                    {prodSize.map((size) => {
                        <option value={size}>{size}</option>
                    })}
                </select>
                <button onClick={() => {

                }}>Add to Cart</button>
            </div>
        </section>
    )
}

export default singleProduct;

//Q: maybe also set the size attribute in product model to be array or Sequelize.ENUM
//Q: how do we handle cart? Don't we need a cart state as a global state in the app.js
    // a useEffect() hook that update cart state when it detects any changes in cart