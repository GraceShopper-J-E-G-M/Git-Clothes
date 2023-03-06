import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // updateSingleUser,
  selectSingleUser,
  fetchSingleUser,
  editSingleUser
} from "./singleUserSlice";

const UpdateUser = () => {
  const [newFirstName, setFirstName] = useState("");
  const [newLastName, setLastName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newUsername, setUsername ] = useState("");
  const [newPassword, setPassword ] = useState("");
  const [newRole, setRole ] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [newAddress, setAddress ] = useState("");

  const dispatch = useDispatch();
  const updateUser = useSelector(selectSingleUser);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { firstName, lastName, email, address, username, password, role } = updateUser;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  useEffect(() => {
    setFirstName(updateUser.firstName ?? "");
    setLastName(updateUser.lastName ?? "");
    setEmail(updateUser.email ?? "");
    setUsername(updateUser.username ?? "");
    setPassword(updateUser.password ?? "");
    // setImageUrl(updateUser.imageUrl ?? ""); are we doing images for user? 
    setAddress(updateUser.address ?? "");
    setRole(updateUser.role ?? "");
  }, [updateUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      updateSingleUser({
        firstName,
        lastName,
        email,
        // imageUrl,
        address,
        username,
        password,
      })
    );
    navigate(`/user/${userId}`);
  };

  return (
    <div>
      <h2>Information not correct? Let's change it!</h2>
      <form id="editUser-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          name="firstName"
          value={firstName}
          onChange={(evt) => setFirstName(evt.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          value={lastName}
          onChange={(evt) => setLastName(evt.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />

        {/* <label htmlFor="imageUrl">ImageUrl:</label> */}
        {/* <input */}
          {/* name="imageUrl"
          value={imageUrl}
          onChange={(evt) => setImageUrl(evt.target.value)}
        /> */}

        <label htmlFor="address">Address:</label>
        <input
          name="Street"
          value={street}
          onChange={(evt) => setAddress(evt.target.value)}
        />

        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default UpdateUser;