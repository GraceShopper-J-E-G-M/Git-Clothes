/**
 * This file contains a `Users` component to display a list of all users (at least their first and last names).
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers, fetchAllUsersAsync } from "./allUsersSlice";

//`Users` component lives here.
const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);

  console.log("allUsers", allUsers);
  const [loading, setLoading] = useState(true);

  //React dispatches a thunk to load initial data from /api/users.
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
    setLoading(false);
  }, [dispatch]);

  return loading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    <div>
      <Link to="/admin">
        <button>Back to admin portal</button>
      </Link>
      <ul id="users-list">
        {allUsers.map((user, i) => {
          return (
            <div key={`Inside all user view: ${i}`}>
              <li id="users-view-list-item">
                {/** Clicking on a user from the users view should navigate to show that user */}
                <Link id="link" to={`/users/${user.id}`}>
                  <span>{user.username}</span>
                </Link>
                <p> {user.email}</p>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllUsers;
