import classes from "./Music.module.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";
import MusicCard from "../components/UI/MusicCard";

const Music = () => {
  const [musicList, setMusicList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dbSongsRef = collection(firestore, "songs");

  useEffect(() => {
    setIsLoading(true);

    /* added timeout to show the loading screen. it loads too fast to show it */
    setTimeout(() => {
      const getSongs = async () => {
        const data = await getDocs(dbSongsRef);
        setMusicList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getSongs();
      setIsLoading(false);
    }, 250)
    /*  */
    
  }, []);

  return (
    <>
      {isLoading && <div className={classes.loading_screen_div}></div>}
      {!isLoading && (
        <ul className={classes.music__ul}>
          {musicList.map((current) => {
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
                  isMyMusicPage={false}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Music;
