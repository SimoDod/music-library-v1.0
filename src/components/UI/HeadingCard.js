import classes from "./HeadingCard.module.css";
import Icon from "./Icon";

const HeadingCard = (props) => {
  return (
    <div className={classes.card}>
        <Icon className={classes.card__icon} icon={props.icon}></Icon>
      <p className={classes.card__p}>
        {props.text}
      </p>
    </div>
  );
};

export default HeadingCard;
