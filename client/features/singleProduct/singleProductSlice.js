import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchSingleProduct = createAsyncThunk("singleProduct", async (id) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSingleProduct.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectSingleProduct = (state) => {
    return state.singleProduct;
};

export default singleProductSlice.reducer;