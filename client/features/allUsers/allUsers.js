/**
 * This file contains a `Users` component to display a list of all users (at least their first and last names).
 */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUsers,
  fetchAllUsersAsync,
  deleteUsersById,
} from "../allUsers/allUsersSlice";

//`Users` component lives here.
const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    //React dispatches a thunk to load initial data from /api/users.
    useEffect(()=> {
        dispatch(fetchAllUsersAsync());
        setLoading(false);
    }, [dispatch]);

    return loading ? (
        <p style={{textAlign: "center"}}>Loading...</p>
    ) : (
        <ul id="users-list">
            {users.map((user, i) => {
                return (
                    <div key={`Inside all user view: ${i}`}>
                        <li id="users-view-list-item">
                            {/** Clicking on a user from the users view should navigate to show that user */}
                            <Link id="link" to={`/users/${user.id}`}>
                            <span>user.lastName, user.firstName</span>
                            </Link>
                        </li>
                    </div>
                )
            })}
        </ul>
    );
};
