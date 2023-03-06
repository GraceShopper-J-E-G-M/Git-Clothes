import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleUser, selectSingleUser } from "./singleuserSlice";
// import { UpdateUser } from "./editSingleUser";
 
const SingleUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSingleUser);
  const { userId } = useParams();

  // //Destructure the singleUser's information here, so it's cleaner in the return statement of the component.
  const { firstName, lastName, email, username, addresses, role, createdAt } =
    user;

  const [loading, setLoading] = useState();

  //React dispatches a thunk to load intital data from /api/users/:id.
  useEffect(() => {
    console.log(userId);
    dispatch(fetchSingleUser(userId));
    setLoading(false);
  }, [dispatch]);

  console.log("singleUser", user);
  return loading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    <div>
      {firstName && lastName ? (
        <h1>
          {lastName}, {firstName}
        </h1>
      ) : (
        <div>No name listed for this user.</div>
      )}
      <div>
        {email ? <p>Email: {email}</p> : <p>No email for this user.</p>}
      </div>
      <div>
        {username ? (
          <p>Username: {username}</p>
        ) : (
          <p>No username for this user.</p>
        )}
      </div>
      <div>
        {addresses ? (
          <div>
            Address: {addresses[0].line1}, {addresses[0].line2},{" "}
            <div>
              {addresses[0].city}, {addresses[0].state}, {addresses[0].zipcode}
            </div>
          </div>
        ) : (
          <p>No address for this user.</p>
        )}
      </div>
      <div>
        {createdAt ? (
          <p>Sign up date: {createdAt}</p>
        ) : (
          <p>This user doesn't exist.</p>
        )}
      </div>
      <div>
        {role ? (
          <p>Relation to Git-clothes: {role}</p>
        ) : (
          <p>No role for this user.</p>
        )}
      </div>
      <Link to="/editSingleUser">
        <button> Edit User </button>{" "}
      </Link>
      <Link to="/allUsers">
        <button>Back to All Users</button>
      </Link>
    </div>
  );
};

export default SingleUser;
