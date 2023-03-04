import classes from "./Register.module.css";
import React, { useState, useEffect } from "react";
import ErrorModal from "../components/UI/ErrorModal";
import handleSubmit from "../api/handles/handleSubmit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";

const Register = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPassMatch, setIsPassMatch] = useState(false);
  const [isPassSixSymbol, setIsPassSixSymbol] = useState(false);
  const [isRePassSixSymbol, setIsRePassSixSymbol] = useState(false);

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

  /* shows red border if passwords doesn't match */

  useEffect(() => {
    password.length < 6 ? setIsPassSixSymbol(true) : setIsPassSixSymbol(false);
    rePassword.length < 6
      ? setIsRePassSixSymbol(true)
      : setIsRePassSixSymbol(false);

    if (password !== rePassword) {
      setIsPassMatch(true);
      setPassStyle({ border: "solid 2px red" });
      setRePassStyle({ border: "solid 2px red" });
    } else {
      if (!(password.length < 6) && !(rePassword.length < 6)) {
        setPassStyle({ border: "solid 2px green" });
        setRePassStyle({ border: "solid 2px green" });
      }
      setIsPassMatch(false);
    }

    if (!password || !rePassword) {
      setPassStyle({});
      setRePassStyle({});
      setIsPassMatch(false);
      setIsPassSixSymbol(false);
      setIsRePassSixSymbol(false);
    }
  }, [password, rePassword]);
  /*  */

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

    const idGenerator = Math.random().toString(36).substring(2);
    try {
      const dataToUpload = { name, email, password, ownerId: idGenerator };

      handleSubmit("users", dataToUpload);
      setIsUpdated((prev) => !prev);
      e.target.reset();
      setPassword("");
      setRePassword("");
      buttonStateHandler();
      localStorage.setItem("userData", JSON.stringify(dataToUpload));
      modalHandler("Done!", "You have registered successfully.");
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
    const userCheck = localStorage.getItem("userData");
    if (userCheck) {
      window.location.replace("/");
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
          {isPassSixSymbol && (
            <p className={classes.passwordmatch_p}>
              Password must be atleast 6 symbols.
            </p>
          )}
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
          {isRePassSixSymbol && (
            <p className={classes.passwordmatch_p}>
              Password must be atleast 6 symbols.
            </p>
          )}
          {isPassMatch && (
            <p className={classes.passwordmatch_p}>Passwords doesn't match.</p>
          )}
        </div>
        <button style={buttonColor} disabled={isDisabled} type="submit">
          Create Account
        </button>
      </form>
    </>
  );
};

export default Register;
