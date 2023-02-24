import classes from "./Login.module.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const dbUsersRef = collection(firestore, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(dbUsersRef);
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    userList.forEach((user) => {
      if (user.email === email && user.password === password) {
        localStorage.setItem("userData", user);
      }
    });
  };

  return (
    <>
      <h2 className={classes.header}>Log In to Music Library</h2>
      <form onSubmit={handleLoginSubmit} className={classes.form}>
        <div className={classes["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
