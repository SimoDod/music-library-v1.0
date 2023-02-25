import classes from "./MyMusic.module.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";
import MusicCard from "../components/UI/MusicCard";

const MyMusic = () => {
  const [myMusicList, setMyMusicList] = useState([]);
  const dbSongsRef = collection(firestore, "songs");

  useEffect(() => {
    const getSongs = async () => {
      const data = await getDocs(dbSongsRef);
      const dataMap = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const userData = JSON.parse(localStorage.getItem("userData"));

      setMyMusicList(dataMap.filter((song) => song.ownerId === userData.ownerId ));
    };

    getSongs();
  }, []);

  return (
    <ul className={classes.music__ul}>
      {myMusicList.map((current) => {
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
              isMyMusicPage={true}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default MyMusic;
