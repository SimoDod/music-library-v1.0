import classes from "./Music.module.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";
import MusicCard from "../components/UI/MusicCard";

const Music = () => {
  const [musicList, setMusicList] = useState([]);
  const dbAlbumsRef = collection(firestore, 'albums');
  
  useEffect(() => {
    const getAlbums = async () => {
      const data = await getDocs(dbAlbumsRef);
      setMusicList(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    };

    getAlbums()
  }, []);

  return (
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
              price={current.price}
              releaseDate={current.releaseDate}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Music;
