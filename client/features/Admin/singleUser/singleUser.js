import React from "react";

const singleUser = ({ user }) => {
  <div>
    <h1>{user.firstName}, {user.lastName}</h1>
    <p>{user.email}</p>
    <p>{user.username}</p>
    <p>{user.password}</p>
    <p>{user.address}</p>
    <p>{user.userType}</p>
  </div>
};

export default singleUser;