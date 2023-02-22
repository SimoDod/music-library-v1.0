import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Icon from "../UI/Icon";
import classes from "./SearchTool.module.css";
import React, { useState } from "react";

const SearchTool = (props) => {
  const [enteredSearch, setEnteredSearch] = useState("");

  const onChangeHandler = (e) => {
    setEnteredSearch(e.target.value);
  };

  return (
    <form className={classes.searchTool__container}>
      <div className={classes.input__wrapper}>
        <Icon className={classes.icon__input} icon={faMagnifyingGlass} />
        <Link to="/search">
          <button value={enteredSearch} onClick={props.clickHandler} className={classes.searchTool_button}>Search</button>
        </Link>
        <input
          className={classes.searchTool__input}
          placeholder="Search"
          onChange={onChangeHandler}
          
        ></input>
      </div>
    </form>
  );
};

export default SearchTool;
