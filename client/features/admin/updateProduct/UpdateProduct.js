import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSingleProduct,
    editProduct,
    selectSingleProduct,
} from "../../singleProduct/singleProductSlice";

const UpdateProduct = () => {
    const sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];
    const colorArray = ["Red", "Pink", "Plum", "Mustard", "Burgundy", "Forest Green", "Beige", "Olive", "Grey", "Black", "Brown", "Dark Brown", "Blue"];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { prodId } = useParams();

    //need state for storing edit
    const [newProdName, setProdName] = useState("");
    const [newProdQuantity, setProdQuantity] = useState(0);
    const [newProdPrice, setProdPrice] = useState(0.00);
    const [newProdSize, setProdSize] = useState("XS");
    const [newProdColor, setProdColor] = useState("Red");
    const [newProdImg, setProdImg] = useState("");

    //fetch product
    const product = useSelector(selectSingleProduct);
    const { prodName, prodQuantity, prodPrice, prodSize, prodColor, prodImg } = product;

    useEffect(() => {
        dispatch(fetchSingleProduct(prodId));
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

    const handleUpdateProduct = async (event) => {
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
        await dispatch(editProduct(productObj));
        await dispatch(fetchSingleProduct(prodId));
        //might need to fix route
        navigate(`/allAdminProducts`);
    }

    return (
        <form onSubmit={event => handleUpdateProduct(event)}>
            <label>Product Name:
                <input type="text" name="productName" value={newProdName}
                    onChange={event => setProdName(event.target.value)} />
            </label>
            <label>Product Quantity:
                <input type="text" name="productQuantity" value={newProdQuantity}
                    onChange={event => setProdQuantity(event.target.value)} />
            </label>
            <label>Product Price:
                <input type="text" name="productPrice" value={newProdPrice}
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
            <Link to="/allAdminProducts">
                <button>Back to All Products</button>
            </Link>
        </form>
    )
}

export default UpdateProduct;