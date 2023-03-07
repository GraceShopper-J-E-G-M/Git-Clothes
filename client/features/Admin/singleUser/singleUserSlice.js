import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk(
  "singleUser",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      console.log("data", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const editSingleUser = createAsyncThunk(
  "allUsers/edit",
  async ({ id, username, password, firstName, address, lastName, email, role }) => {
    try {
      const { data } = await axios.put(`/api/allUsers/${id}/edit`, {
        username,
        password,
        firstName,
        lastName,
        address,
        email,
        role,
      });
      console.log("After axios put");
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// adding new user
// export const addUserAsync = createAsyncThunk(
//   "users/addUser",
//   async ({ username, password, firstName, address, lastName, email, role }) => {
//     try {
//       const { data } = await axios.post(`/api/users/addSingleUser`, {
//         username,
//         password,
//         firstName,
//         lastName,
//         address,
//         email,
//         role,
//       });
//       console.log("After axios put");
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

export const singleUserSlice = createSlice({
  name: "singleUser",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, { payload }) => payload);
    builder.addCase(editSingleUser.fulfilled, (state, action) => {
      return action.payload;
    // builder.addCase(addUserAsync.fulfilled, (state, action) => {
    //   return action.payload;
    })
    },
    });
// });

export const selectSingleUser = (state) => {
  return state.singleUser;
};

export default singleUserSlice.reducer;
