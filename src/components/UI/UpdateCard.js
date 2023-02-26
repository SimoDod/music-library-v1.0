import ErrorModal from "./ErrorModal";
import classes from "./UpdateCard.module.css";
import React, { useState } from "react";
import handleUpdate from "../../api/handles/handleUpdate";

const UpdateCard = ({
  nameOld,
  artistOld,
  genreOld,
  releaseDateOld,
  descriptionOld,
  imgUrlOld,
  cardId,
  ownerId,
  ownerName,
}) => {
  const [showModal, setshowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleSongUpdate = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    try {
      const { artist, description, genre, imgUrl, name, releaseDate } = data;

      if (
        !artist ||
        !description ||
        !genre ||
        !imgUrl ||
        !name ||
        !releaseDate
      ) {
        modalHandler("Ooops!", "Looks like you may have missed a field.");
        return;
      }

      handleUpdate(
        "songs",
        { ...data, ownerId: ownerId, ownerName: ownerName },
        cardId
      );
      e.target.reset();
      modalHandler("Done!", "Your Song is updated.");
    } catch (error) {
      modalHandler(
        "Error",
        "There was an error when updating the Song! Please try again."
      );
      console.log(error);
    }
  };

  const closeErrorModal = () => {
    window.location.replace("/my-music");
    setshowModal(false);
  };

  const modalHandler = (title, message) => {
    setModalMessage(message);
    setModalTitle(title);
    setshowModal(true);
  };
  return (
    <>
      {showModal && (
        <ErrorModal
          title={modalTitle}
          message={modalMessage}
          clickHandler={closeErrorModal}
        />
      )}
      <h2 className={classes.header}>Update Song</h2>
      <form onSubmit={handleSongUpdate} className={classes.form}>
        <div className={classes["form-group"]}>
          <label htmlFor="name">Song Name</label>
          <input type="text" name="name" defaultValue={nameOld} />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="artist">Artist</label>
          <input type="text" name="artist" defaultValue={artistOld} />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="genre">Genre</label>
          <input type="text" name="genre" defaultValue={genreOld} />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="releaseDate">Release Date</label>
          <input type="date" name="releaseDate" defaultValue={releaseDateOld} />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="description">Description</label>
          <textarea name="description" defaultValue={descriptionOld} />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="imgUrl">Image Url</label>
          <input type="text" name="imgUrl" defaultValue={imgUrlOld} />
        </div>
        <button type="submit">Update Song</button>
      </form>
    </>
  );
};

export default UpdateCard;
