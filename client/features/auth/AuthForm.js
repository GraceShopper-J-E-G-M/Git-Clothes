import { copyDone } from "pg-protocol/dist/messages";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const handleUserSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (username === "ADMIN") {
      navigate("/admin");
    }
    dispatch(authenticate({ username, password, method: formName }));
  };

  // //On admin submit, naviage to /users endpoint and display `allUsers` component.
  // const handleAdminSubmit = (evt) => {
  //   evt.preventDefault();
  //   const code = evt.target.adminCode.value;
  //   if (code === "code*") {
  //     console.log("Submit Admin!");
  //     navigate(`/admin`)
  //   }
  // };

  // const handleRoleChange = (evt) => {
  //   if (evt.target.value === "Admin") {
  //     setAdmin(true);
  //   } else {
  //     setAdmin(false);
  //   }
  // };

  //We want this function to act like the sign up function `PUT` thunk, except a temp User instance is created with attribute `guest`.
  const continueAsGuest = (evt) => {
    evt.preventDefault();
    console.log("continue as guest");
    dispatch(
      authenticate({ username: "guest", password: "guestpwd", method: "guest" })
    );
    navigate(`/allProducts`);
  };

  return (
    <div>
      {/* <span>
        <label htmlFor="role">
          <small>Select your role</small>
        </label>
        <select onChange={handleRoleChange} className="selectRole">
          <option value="User">User</option>
          {/* <option value="Guest">Guest</option> */}
      {/* <option value="Admin">Admin</option>
        </select>
      </span> */}
      {/*the component will show this form if `admin` role is selected*/}
      {admin ? (
        <form onSubmit={handleAdminSubmit}>
          <div>
            <label htmlFor="admin">
              <small>
                Welcome, admin! Please enter your admin passcode to continue.
              </small>
            </label>
            <input name="adminCode" type="text" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
        </form>
      ) : (
        <div>
          {/*the component will show this form if `user` role is selected*/}
          <form onSubmit={handleUserSubmit} name={name}>
            <div>
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input name="username" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && <div> {error} </div>}
          </form>
          <div className="guest">
            <small>
              Don't have an account?
              <button onClick={continueAsGuest}>Continue as a guest</button>
              or <Link to="/signup">Sign Up</Link>
            </small>
          </div>
        </div>
      )}
      <Link to="/admin">Admin</Link>
    </div>
  );
};

export default AuthForm;
