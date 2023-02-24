import classes from "./Register.module.css";
import React, { useState, useEffect } from "react";
import ErrorModal from "../components/UI/ErrorModal";
import handleSubmit from "../api/handles/handleSubmit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";

const Register = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [passStyle, setPassStyle] = useState({});
  const [rePassStyle, setRePassStyle] = useState({});

  const [showModal, setshowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  /* handles the state of the button */
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState({
    backgroundColor: "#007bff",
  });

  const [userList, setUserList] = useState([]);
  const dbUsersRef = collection(firestore, "users");
  const host = "http://192.168.1.5:3000/";
  

  /* it updates the list of users in case if you try to register with the same email twice */
  const [isUpdated, setIsUpdated] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(dbUsersRef);
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [isUpdated]);

  const buttonStateHandler = () => {
    setIsDisabled(true);
    setButtonColor({ backgroundColor: "darkgray" });

    setTimeout(() => {
      setIsDisabled(false);
      setButtonColor({ backgroundColor: "#007bff" });
    }, 7000);
  };
  /*  */

  useEffect(() => {
    if (password !== rePassword) {
      setPassStyle({ border: "solid 2px red" });
      setRePassStyle({ border: "solid 2px red" });
    } else {
      setPassStyle({});
      setRePassStyle({});
    }
  }, [password, rePassword]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { name, email, password, rePassword } = data;

    for (const user of userList) {
      if (user.email === email) {
        modalHandler(
          "Oops!",
          "That email already exists. Please use different email."
        );
        return;
      }
    }

    try {
      if (!email || !password || !rePassword || !name) {
        modalHandler("Ooops!", "Looks like you may have missed a field.");
        return;
      }

      if (password !== rePassword) {
        modalHandler("Ooops!", "Passwords doesn't match.");
        return;
      }

      if (password.length < 6) {
        modalHandler("Ooops!", "Password must be atleast 6 characters long.");
        return;
      }

      if (email.length < 6) {
        modalHandler("Ooops!", "Email must be atleast 6 characters long.");
        return;
      }

      if (name.length < 3) {
        modalHandler("Ooops!", "Name must be atleast 3 characters long.");
        return;
      }

      handleSubmit("users", { name, email, password });
      setIsUpdated(prev => !prev)
      e.target.reset();
      setPassword("");
      setRePassword("");
      buttonStateHandler();
      modalHandler("Done!", "You have registered successfully.");
      localStorage.setItem("userData", JSON.stringify({ name, email, password }));
    } catch (error) {
      modalHandler(
        "Error",
        "There was an error during registration! Please try again."
      );
      console.log(error);
    }
  };

  const closeErrorModal = () => {
    setshowModal(false);
    if(localStorage.getItem("userData")) {
        window.location.replace(host);
    }
};
  const modalHandler = (title, message) => {
    setModalMessage(message);
    setModalTitle(title);
    setshowModal(true);
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
      <h2 className={classes.header}>Join Music Library</h2>
      <form onSubmit={handleRegisterSubmit} className={classes.form}>
        <div className={classes["form-group"]}>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            style={passStyle}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="rePassword">Repeat Password</label>
          <input
            style={rePassStyle}
            name="rePassword"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            type="password"
          />
        </div>
        <button style={buttonColor} disabled={isDisabled} type="submit">
          Create Account
        </button>
      </form>
    </>
  );
};

export default Register;
