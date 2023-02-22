import classes from "./Music.module.css";
import { get } from "../api/api";
import React, { useState, useEffect } from "react";
import MusicCard from "../components/UI/MusicCard";

const Music = () => {
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await get(
        "data/albums?sortBy=_createdOn%20desc&distinct=name"
      );
      setMusicList(res);
    };
    fetchData();
  }, []);

  return (
    <ul className={classes.music__ul}>
      {musicList.map((current) => {
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

export default Music;
