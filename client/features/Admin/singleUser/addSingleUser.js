// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addUserAsync } from "../singleUser/singleUserSlice";

// const AddUser = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [createdAt, setCreatedAt] = useState("");


//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(addUserAsync({ firstName, lastName, email, username, password, address, role, createdAt }));
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setAddress("");
//     setUsername("");
//     setPassword("");
//     setRole("");
//     setCreatedAt("");
//     navigate("/user");
//   };
//   return (
//     <div>
//       <h2>Add User</h2>
//       <form id="addUser-form" onSubmit={handleSubmit}>
//         <label htmlFor="firstName"> First Name:</label>
//         <input
//           name="firstName"
//           value={firstName}
//           onChange={(evt) => setFirstName(evt.target.value)}
//         />

//         <label htmlFor="lastName">Last Name:</label>
//         <input
//           name="lastName"
//           value={lastName}
//           onChange={(evt) => setLastName(evt.target.value)}
//         />

//         <label htmlFor="address">Address:</label>
//         <input
//           name="address"
//           value={address}
//           onChange={(evt) => setAddress(evt.target.value)}
//         />

//         <label htmlFor="username">Username:</label>
//         <input
//           name="username"
//           value={username}
//           onChange={(evt) => setUsername(evt.target.value)}
//         />

//         <label htmlFor="password">password:</label>
//         <input
//           name="password"
//           value={password}
//           onChange={(evt) => setPassword(evt.target.value)}
//         />

//         <label htmlFor="role">Role:</label>
//         <input
//           name="role"
//           value={role}
//           onChange={(evt) => setRole(evt.target.value)}
//         />
//         {/* // do i create one for createdAt? */}
//         <button type="submit">Add User</button>
//       </form>
//     </div>
//   );
// };

// export default AddUser;