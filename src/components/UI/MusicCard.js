import classes from "./MusicCard.module.css";

const MusicCard = (props) => {
  return (
    <div className={classes.card}>
      <img src={props.imgUrl} alt="img"></img>
      <p className={classes.card__p}>
        <span className={classes.card__p_type_span}>Name:</span> {props.name}
      </p>
      <p className={classes.card__p}>
        <span className={classes.card__p_type_span}>Artist:</span>{" "}
        {props.artist}
      </p>
      <p className={classes.card__p}>
        <span className={classes.card__p_type_span}>Genre:</span> {props.genre}
      </p>
      <p className={classes.card__p}>
        <span className={classes.card__p_type_span}>Price:</span> {props.price}
      </p>
      <p className={classes.card__p}>
        <span className={classes.card__p_type_span}>Release Date:</span>{" "}
        {props.releaseDate}
      </p>
      <button className={classes.card__button}>Details</button>
    </div>
  );
};

export default MusicCard;
