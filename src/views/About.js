import React from "react";
import classes from "./About.module.css";

function About() {
  return (
    <div className={classes.container}>
      <h1>About</h1>
      <p>
        Welcome to our site! We're dedicated to helping you create your own
        songs so you can easily listen to them anytime, anywhere.
      </p>
      <p>
        Our user-friendly interface makes it easy to create songs and browse
        through them. You can even customize the songs covers with your own
        images.
      </p>
      <p>
        Once you've created your songs, you can access them from any device.
        We're constantly updating our site with new features and improvements,
        so stay tuned for more exciting updates!
      </p>
      <p className={classes.special}>
        To create new songs you need to be logged in.
      </p>
      <p className={classes.special}>
        How does our search work? When you are logged in, you can only search in
        your list of songs, by the name of the artist. Conversely, when you are not logged in, you can
        search through all the songs from all users.
      </p>
      <p className={classes.special}>
        To delete or update your songs, you must be logged in. You can do so
        only from the "My Music" page by clicking on the "Details" button.
      </p>
    </div>
  );
}

export default About;
