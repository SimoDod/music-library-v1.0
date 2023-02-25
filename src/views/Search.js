import classes from "./Search.module.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";
import React, { useState, useEffect } from "react";
import MusicCard from "../components/UI/MusicCard";

const Search = (props) => {
  const [searchList, setSearchList] = useState([]);
  const [userSearchList, setUserSearchList] = useState([]);
  const dbSongsRef = collection(firestore, "songs");
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  useEffect(() => {
    const getSongs = async () => {
      const data = await getDocs(dbSongsRef);
      const sortedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredData = sortedData.filter((album) =>
        album.name.toLowerCase().includes(props.enteredSearch)
      );
      setSearchList(filteredData);
      
      if (userData) {
       const constfilteredCurrentUserData = filteredData.filter(
          (song) => (song.ownerId === userData.ownerId)
        );
        setUserSearchList(constfilteredCurrentUserData);
      }
    };
    getSongs();
  }, [props.enteredSearch]);

  return (
    <ul className={classes.search__ul}>
      {!userData && searchList.map((current) => {
        return (
          <li key={current.id}>
            <MusicCard
              artist={current.artist}
              description={current.description}
              genre={current.genre}
              imgUrl={current.imgUrl}
              name={current.name}
              createdBy={current.ownerName}
              releaseDate={current.releaseDate}
            />
          </li>
        );
      })}
      {userData && userSearchList.map((current) => {
        return (
          <li key={current.id}>
            <MusicCard
              artist={current.artist}
              description={current.description}
              genre={current.genre}
              imgUrl={current.imgUrl}
              name={current.name}
              createdBy={current.ownerName}
              releaseDate={current.releaseDate}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Search;
