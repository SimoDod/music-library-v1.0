import React, { useState } from "react";
import classes from "./CreateSong.module.css";
import handleSubmit from "../api/handles/handleSubmit";
import ErrorModal from "../components/UI/ErrorModal";

const CreateSong = () => {
  const [showModal, setshowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  /* handles the state of the button */
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState({
    backgroundColor: "#007bff",
  });

  const host = "http://192.168.1.5:3000/"

  const buttonStateHandler = () => {
    setIsDisabled(true);
    setButtonColor({ backgroundColor: "darkgray" });

    setTimeout(() => {
      setIsDisabled(false);
      setButtonColor({ backgroundColor: "#007bff" });
    }, 7000);
  };
  /*  */

  /*  handles the logic of the errors of the form, modal and sends request to the firebase */
  const handleSongSubmit = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = Object.fromEntries(new FormData(e.target));
    try {
      const { artist, description, genre, imgUrl, name, releaseDate } =
        data;

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

      handleSubmit("songs", {...data, ownerId: userData.ownerId, ownerName: userData.name});
      e.target.reset();
      buttonStateHandler();
      modalHandler("Done!", "Your Song is created.");
    } catch (error) {
      modalHandler(
        "Error",
        "There was an error when creating the Song! Please try again."
      );
      console.log(error);
    }
  };

  const closeErrorModal = () => {
    window.location.replace(host + "my-music")
    setshowModal(false)
  };

  const modalHandler = (title, message) => {
    setModalMessage(message);
    setModalTitle(title);
    setshowModal(true);
  };
  /*  */

  return (
    <>
      {showModal && (
        <ErrorModal
          title={modalTitle}
          message={modalMessage}
          clickHandler={closeErrorModal}
        />
      )}

      <h2 className={classes.header}>Create Song</h2>
      <form onSubmit={handleSongSubmit} className={classes.form}>
        <div className={classes["form-group"]}>
          <label htmlFor="name">Song Name</label>
          <input type="text" name="name" />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="artist">Artist</label>
          <input type="text" name="artist" />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="genre">Genre</label>
          <input type="text" name="genre" />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="releaseDate">Release Date</label>
          <input type="date" name="releaseDate" />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="description">Description</label>
          <textarea name="description" />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="imgUrl">Image Url</label>
          <input type="text" name="imgUrl" />
        </div>
        <button style={buttonColor} disabled={isDisabled} type="submit">
          Add Song
        </button>
      </form>
    </>
  );
};

export default CreateSong;
