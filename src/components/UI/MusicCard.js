import classes from "./MusicCard.module.css";
import React, { useState } from "react";

const MusicCard = (props) => {
  const [isDetails, setIsDetails] = useState(false);

  const detailsHandler = () => setIsDetails((prev) => !prev);

  return (
    <div className={classes.card}>
      <img src={props.imgUrl} alt="img"></img>
      {!isDetails && (
        <>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Name:</span>{" "}
            {props.name}
          </p>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Artist:</span>{" "}
            {props.artist}
          </p>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Genre:</span>{" "}
            {props.genre}
          </p>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Release Date:</span>{" "}
            {props.releaseDate}
          </p>
        </>
      )}
      {isDetails && (
        <>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>User:</span>{" "}
            {props.createdBy}
          </p>
          <p className={classes.card__p}>
            <span className={classes.card__p_type_span}>Description:</span>{" "}
            {props.description}
          </p>
        </>
      )}
      <div className={classes.details__buttons}>
        <div>
          {isDetails && props.isMyMusicPage ? (
            <button
              onClick={(e) => props.deleteButtonHandler(e)}
              className={classes.delete__btn}
            >
              Delete
            </button>
          ) : null}
          {isDetails && props.isMyMusicPage ? (
            <button
              onClick={(e) => props.updateButtonHandler(e)}
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
