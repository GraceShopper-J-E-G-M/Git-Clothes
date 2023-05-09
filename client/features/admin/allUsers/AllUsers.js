/**
 * This file contains a `Users` component to display a
 * list of all users (at least their first and last names).
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUsers,
  fetchAllUsersAsync,
  deleteUserById,
} from "./allUsersSlice";

//`Users` component lives here.
const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);

  const [loading, setLoading] = useState(true);

  //React dispatches a thunk to load initial data from /api/users.
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
    setLoading(false);
  }, [dispatch]);

  //`handleDeleteUser` dispatches a thunk to delete data at /api/users/:userId and filters the state in our redux accordingly.
  const handleDeleteUser = async (evt, userId) => {
    evt.preventDefault();
    dispatch(deleteUserById(userId));
    setLoading(false);
    navigate("/allUsers");
  };

  return loading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    <div >
      <div >
      <Link to="/admin">
        <button className= "portalBtn" > Back to admin portal</button>
      </Link>
      </div>
      <div className="allUsercontainer">
      <ol id="users-list">
        {allUsers.map((user, i) => {
          return (
            <div key={`Inside all user view: ${i}`}>
              <div className="allUserList" id="users-view-list-item">
                {/** Clicking on a user from the users view should navigate to show that user */}
                <Link id="link" to={`/allUsers/${user.id}`}>
                  <span>
                    {user.id}. {user.username}
                  </span>
                </Link>{"  "}
                {/* - [ ] In the users view, include an `X` button next to each user */}
                <span><button className="deleteBtn" onClick={(evt) => handleDeleteUser(evt, user.id)}>
                  X
                </button></span>
                <p>Email: {user.email}</p>
              </div>
            </div>
          )
        })}
      </ol>
      </div>
    </div>
  );
};

export default AllUsers;
