import classes from "./Login.module.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";
import ErrorModal from "../components/UI/ErrorModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const [showModal, setshowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const dbUsersRef = collection(firestore, "users");
  const host = "http://192.168.1.5:3000/";

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(dbUsersRef);
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const closeErrorModal = () => setshowModal(false);

  const modalHandler = (title, message) => {
    setModalMessage(message);
    setModalTitle(title);
    setshowModal(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    for (const user of userList) {
      if (user.email === email && user.password === password) {
        localStorage.setItem("userData", JSON.stringify(user));
        window.location.replace(host);
        return;
      }
    }
    modalHandler("Oops!", "The email or password is incorrect.");
  };

  return (
    <>
      {showModal && (
        <ErrorModal
          title={modalTitle}
          message={modalMessage}
          clickHandler={closeErrorModal}
        />
      )}
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
