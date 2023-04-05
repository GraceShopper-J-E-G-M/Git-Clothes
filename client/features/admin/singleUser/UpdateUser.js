/**
 * This file contains a `UpdateUser` component to display a form for an admin
 * to update a user.
 */

//Libraries
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Files
import {
  selectSingleUser,
  fetchSingleUser,
  editSingleUser,
} from "./singleUserSlice";

/**
 * UpdateUser component.
 */
const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  //Local state for storing an admin's edits
  const [newFirstName, setFirstName] = useState("");
  const [newLastName, setLastName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newUsername, setUsername] = useState("");
  const [newPassword, setPassword] = useState("");
  const [newRole, setRole] = useState("");

  const updateUser = useSelector(selectSingleUser);
  const { firstName, lastName, email, username, password, role } = updateUser;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  useEffect(() => {
    setUsername(updateUser.username ?? "");
    setPassword(updateUser.password ?? "");
    setFirstName(updateUser.firstName ?? "");
    setLastName(updateUser.lastName ?? "");
    setEmail(updateUser.email ?? "");
    setRole(updateUser.role ?? "");
    console.log(updateUser);
  }, [updateUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedObject = {
      id: userId,
      username: newUsername,
      password: newPassword,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      role: newRole,
    };
    dispatch(editSingleUser(updatedObject));
    dispatch(fetchSingleUser(userId));
    navigate(`/allUsers/${userId}/edit`);
  };

  return (
    <div className="editUserform">
      <h2>User's info not correct? Edit here!</h2>
      <form
        className="justTheForm"
        id="editUser-form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label htmlFor="firstName">First Name:</label>
        <input
          name="firstName"
          value={newFirstName}
          onChange={(evt) => setFirstName(evt.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          value={newLastName}
          onChange={(evt) => setLastName(evt.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          value={newEmail}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          value={newUsername}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          value={newPassword}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <div className="buttons">
          <button className="editUserBtn" type="submit">
            {" "}
            Submit Changes{" "}
          </button>
          <Link to="/allUsers">
            <button className="backToAdminBtn"> Back to All Users </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
