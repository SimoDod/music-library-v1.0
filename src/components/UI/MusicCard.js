import classes from "./MusicCard.module.css";

const MusicCard = (props) => {
  const imgPathHandler = () => {
    let imgPath;
    if (props.imgUrl.includes("http")) {
      imgPath = <img src={props.imgUrl} alt="img"></img>;
    } else {
      if (
        props.imgUrl.includes("BrandiCarlile.png") ||
        props.imgUrl.includes("Lorde.jpg") ||
        props.imgUrl.includes("pinkFloyd.jpg")
      ) {
        imgPath = (
          <img src={require(`../../assets${props.imgUrl}`)} alt="img"></img>
        );
      } else {
        imgPath = <img src={props.imgUrl} alt="img"></img>;
      }
    }
    return imgPath;
  };

  return (
    <div className={classes.card}>
      {imgPathHandler()}
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
