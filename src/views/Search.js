import classes from "./Search.module.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";
import React, { useState, useEffect } from "react";
import MusicCard from "../components/UI/MusicCard";

const Search = (props) => {
  const [searchList, setSearchList] = useState([]);
  const dbUsersRef = collection(firestore, "albums");

  useEffect(() => {
    const getAlbums = async () => {
      const data = await getDocs(dbUsersRef);
      const sortedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredData = sortedData.filter((album) =>
        album.name.includes(props.enteredSearch)
      );
      setSearchList(filteredData);
    };
    getAlbums();
  }, [props.enteredSearch]);

  return (
    <ul className={classes.search__ul}>
      {searchList.map((current) => {
        return (
          <li key={current.id}>
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
