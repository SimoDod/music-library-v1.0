import { Link, Outlet } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Icon from "../UI/Icon";
import classes from "./NavBar.module.css";
import SearchTool from "./SearchTool";
import ErrorModal from "../UI/ErrorModal";

const NavBar = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));

  /* handles the  resize of the screen dinamically. Removes and adds different type of the home buttons */
  const handleResize = () => {
    if (window.innerWidth <= 678) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });
  /*  */

  /* handles error modal  */
  const closeErrorModal = () => setshowModal(false);
  const modalHandler = (title, message) => {
    setModalMessage(message);
    setModalTitle(title);
    setshowModal(true);
  };
  /*  */

  const clickHandler = (e) => {
    const searchInput = e.target.value.length;

    if (searchInput < 1) {
      modalHandler("Ooops!", "Search field can't be empty.");
      return;
    }
    props.searchHandler(e.target.value);
  };

  const logoutHandler = () => {
    localStorage.clear();
    window.location.replace("/");
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
      <nav className={classes.navbar__container}>
        <div className={classes.navbar__nav}>
          {!isMobile && (
            <Link to="/">
              <Icon icon={faHouse} className={classes.icon__home} />
            </Link>
          )}
          <SearchTool clickHandler={clickHandler} />
          <ul className={classes.navbar__ul}>
            <li className={classes.navbar__ul_li}>
              <Link to="/music">Music</Link>
            </li>
            {userData && (
              <li className={classes.navbar__ul_li}>
                <Link to="/create-song">Create Song</Link>
              </li>
            )}
            <li className={classes.navbar__ul_li}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className={classes.navbar__buttons}>
          {!userData ? (
            <>
              <Link to="/login">
                <button className={classes.navbar__buttons_login}>
                  Log In
                </button>
              </Link>
              {isMobile && (
                <Link style={{marginTop: ".5rem"}} to="/">
                  <Icon  icon={faHouse} className={classes.icon__home} />
                </Link>
              )}
              <Link to="/register">
                <button className={classes.navbar__buttons_signup}>
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/my-music">
                <button style={{backgroundColor: "black"}} className={classes.navbar__buttons_signup}>
                  My Music
                </button>
              </Link>
              {isMobile && (
                <Link style={{marginTop: ".5rem"}} to="/">
                  <Icon icon={faHouse} className={classes.icon__home} />
                </Link>
              )}
              <Link to="/">
                <button
                  onClick={logoutHandler}
                  className={classes.navbar__buttons_login}
                >
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
