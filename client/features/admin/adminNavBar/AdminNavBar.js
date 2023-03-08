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
      <nav style={{ textAlign: 'center' }}>
        <Link className="portalBtn" to="/allUsers">All Users</Link>
        <Link className="portalBtn" to="/allAdminProducts">All Products</Link>
        <button type="button" onClick={logoutAndRedirectHome}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminNavBar; 
