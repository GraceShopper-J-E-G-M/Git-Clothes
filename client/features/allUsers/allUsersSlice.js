/**
 * A users slice to manage users in the Redux store.
 */
// This is where I configure all of my Redux logic for the `users` slice of my state.

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * `fetchUsersAsync` GETS data at /api/users and returns all users.
 */

export const fetchUsersAsync = createAsyncThunk(
    "users/fetchAll", async () => {
        try {
            const {data} = await axios.get("http://localhost:8080/api/users");
        } catch (error) {
            console.log(error);
        }
    }
);

//Here I invoke the createSlice function, and pass it an object with all of my state details.

export const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        //For now, all our data is aync so my logic does not go here, but in the extraReducers.
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAsync.fulfilled, (state, {payload}) => payload)
    }
});

//*This is a function I will pass to useSelect in my `Users` component, to read values from my specific slice of my redux store.
export const selectUsers = (state) => state.users;

//*I need to export the reducer from my slice, and add it to my configureStore function in client/app/store.js.
export default usersSlice.reducer;
