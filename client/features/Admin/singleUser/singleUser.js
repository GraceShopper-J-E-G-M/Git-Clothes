import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";

const SingleUser = ({ user }) => {
  const dispatch=useDispatch();
  const singleUser = useSelectorSingleUser();

  console.log("singleUser", singleUser);
  const [loading, setLoading] = useState();

  //React dispatches a thunk to load intital data from /api/users/:id.
  useEffect(() => {
    dispatch(fetchSingleUser());
    setLoading(false);
  }, [dispatch]);

  return loading ? (<p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
  <div>
    <h1>{user.firstName}, {user.lastName}</h1>
    <p>{user.email}</p>
    <p>{user.username}</p>
    <p>{user.password}</p>
    <p>{user.address}</p>
    <p>{user.userType}</p>
  </div>
  )
};

export default SingleUser;