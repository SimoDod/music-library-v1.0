import classes from "./MyMusic.module.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../api/firebase_setup/firebase";
import MusicCard from "../components/UI/MusicCard";
import UpdateCard from "../components/UI/UpdateCard";

const MyMusic = ({ isUpdating, setIsUpdating }) => {
  const [myMusicList, setMyMusicList] = useState([]);
  const [cardData, setCardData] = useState("");
  const dbSongsRef = collection(firestore, "songs");

  useEffect(() => {
    const getSongs = async () => {
      const data = await getDocs(dbSongsRef);
      const dataMap = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const userData = JSON.parse(localStorage.getItem("userData"));

      setMyMusicList(
        dataMap.filter((song) => song.ownerId === userData.ownerId)
      );
    };
    getSongs();
  }, []);

  const deleteButtonHandler = async (e) => {
    const currentCard =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    const isDelete = window.confirm(
      "Are you sure you want to delete the song?"
    );

    if (isDelete) {
      try {
        await deleteDoc(doc(dbSongsRef, currentCard.id));
      } catch (error) {
        window.alert(error);
      }
      currentCard.style.display = "none";
    } else {
      return;
    }
  };

  const updateButtonHandler = (e) => {
    const currentCardId =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .id;
    const currentCard = myMusicList.filter((song) => song.id === currentCardId);

    setCardData(currentCard[0]);
    setIsUpdating(true);
  };

  return (
    <>
      {isUpdating ? (
        <UpdateCard
          nameOld={cardData.name}
          artistOld={cardData.artist}
          genreOld={cardData.genre}
          releaseDateOld={cardData.releaseDate}
          descriptionOld={cardData.description}
          imgUrlOld={cardData.imgUrl}
          cardId={cardData.id}
          ownerId={cardData.ownerId}
          ownerName={cardData.ownerName}
        />
      ) : (
        <>
          {myMusicList.length === 0 && (
            <h2 className={classes.nosongs}>
              Your list of songs is empty. Start by creating a song :)
            </h2>
          )}
          <ul className={classes.music__ul}>
            {myMusicList.map((current) => {
              return (
                <li id={current.id} key={current.id}>
                  <MusicCard
                    artist={current.artist}
                    description={current.description}
                    genre={current.genre}
                    imgUrl={current.imgUrl}
                    name={current.name}
                    createdBy={current.ownerName}
                    releaseDate={current.releaseDate}
                    isMyMusicPage={true}
                    deleteButtonHandler={deleteButtonHandler}
                    updateButtonHandler={updateButtonHandler}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default MyMusic;
