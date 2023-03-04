import classes from "./MusicCard.module.css";
import React, { useState } from "react";

const MusicCard = ({
  name,
  artist,
  genre,
  releaseDate,
  imgUrl,
  description,
  createdBy,
  deleteButtonHandler,
  updateButtonHandler,
  isMyMusicPage,
}) => {
  const [isDetails, setIsDetails] = useState(false);

  const detailsHandler = () => setIsDetails((prev) => !prev);

  return (
    <div className={classes.card}>
      <img src={imgUrl} alt="img"></img>
      {!isDetails && (
        <>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Name:</span> {name}
          </p>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Artist:</span> {artist}
          </p>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Genre:</span> {genre}
          </p>
          {releaseDate !== '' ? (<p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Release Date:</span>{" "}
            {releaseDate}
          </p>) : (<p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Release Date:</span>{" "}
            Not speicified
          </p>)}
          
        </>
      )}
      {isDetails && (
        <>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>User:</span> {createdBy}
          </p>
          {description !== '' ? (<p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Description:</span>{" "}
            {description}
          </p>) : (<p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Description:</span>{" "}
            None
          </p>)}
        </>
      )}
      <div className={classes.details__buttons}>
        <div>
          {isDetails && isMyMusicPage ? (
            <button
              onClick={(e) => deleteButtonHandler(e)}
              className={classes.delete__btn}
            >
              Delete
            </button>
          ) : null}
          {isDetails && isMyMusicPage ? (
            <button
              onClick={(e) => updateButtonHandler(e)}
              className={classes.update__btn}
            >
              Update
            </button>
          ) : null}
        </div>
        <button onClick={detailsHandler} className={classes.card__button}>
          {!isDetails ? "Details" : "Hide Details"}
        </button>
      </div>
    </div>
  );
};

export default MusicCard;
