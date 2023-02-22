import { Link, Outlet } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Icon from "../UI/Icon";
import classes from "./NavBar.module.css";
import SearchTool from "./SearchTool";

const NavBar = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  
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

  const clickHandler = (e) => {
    props.searchHandler(e.target.value)
  }

  const standard = (
    <Link to="/">
      <Icon icon={faHouse} className={classes.icon__home} />
    </Link>
  );
  const mobile = (
    <Link to="/">
      <button className={classes.navbar__buttons_home}>Home</button>
    </Link>
  );

  return (
    <>
      <nav className={classes.navbar__container}>
        <div className={classes.navbar__nav}>
          {!isMobile && standard}
          <SearchTool clickHandler={clickHandler} />
          <ul className={classes.navbar__ul}>
            <li className={classes.navbar__ul_li}>
              <Link to="/music">Music</Link>
            </li>
            <li className={classes.navbar__ul_li}>
              <Link to="/create-album">Create Album</Link>
            </li>
            <li className={classes.navbar__ul_li}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className={classes.navbar__buttons}>
          {isMobile && mobile}
          <Link to="/login">
            <button className={classes.navbar__buttons_login}>Log In</button>
          </Link>
          <Link to="/register">
            <button className={classes.navbar__buttons_signup}>Sign Up</button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
