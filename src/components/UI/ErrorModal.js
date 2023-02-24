import { Fragment } from "react";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <Fragment>
      <div className={classes.backdrop}></div>
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <main className={classes.content}>
          <p>{props.message}</p>
        </main>
        <footer className={classes.actions}>
          <button onClick={props.clickHandler}>Okay</button>
        </footer>
      </div>
    </Fragment>
  );
};

export default ErrorModal;
