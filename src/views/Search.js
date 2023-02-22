import classes from "./Search.module.css";
import { get } from "../api/api";
import React, { useState, useEffect } from "react";
import MusicCard from "../components/UI/MusicCard";

const Search = (props) => {
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await get(`data/albums?where=name%20LIKE%20%22${props.enteredSearch}%22`);
      setSearchList(res);
    };
    fetchData();
  }, [props.enteredSearch]);

  return (
    <ul className={classes.search__ul}>
      {searchList.map((current) => {
        return (
          <li key={current._id}>
            <MusicCard
              artist={current.artist}
              description={current.description}
              genre={current.genre}
              imgUrl={current.imgUrl}
              name={current.name}
              price={current.price}
              releaseDate={current.releaseDate}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Search;
