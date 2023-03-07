import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleUser,
  fetchSingleUser,
  editSingleUser,
} from "./singleuserSlice";

const UpdateUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  //state for storing edits
  const [newFirstName, setFirstName] = useState("");
  const [newLastName, setLastName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newUsername, setUsername ] = useState("");
  const [newPassword, setPassword ] = useState("");
  const [newRole, setRole ] = useState("");

  // fetch user
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedObject = {
        id: userId,
        username: newUsername,
        password: newPassword,
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        role: newRole,
    }
    console.log(updatedObject)
    await dispatch(editSingleUser(updatedObject));
    await dispatch(fetchSingleUser(userId));
    navigate(`/allUsers/${userId}/edit`);
  };

  return (
    <div>
      <h2>User's info not correct? Edit here!</h2>
      <form id="editUser-form" onSubmit={event => handleSubmit(event)}>
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
        <button type="submit"> Submit Changes </button>
        <Link to="/allUsers">
          <button> Back to All Users </button>
        </Link>
      </form>
    </div>
  );
};

export default UpdateUser;