/**
 * This file contains a `AdminNavBar` component to display a choice between viewing allUsers or allProducts.
 */

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/store";
import { useNavigate, Link } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h1>Git-Clothes Admin Portal</h1>
      <nav>
        <Link to="/allUsers">All Users</Link>
        <Link to="/allProducts">All Products</Link>
        <button type="button" onClick={logoutAndRedirectHome}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminNavBar; 
