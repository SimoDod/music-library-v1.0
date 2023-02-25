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
        Our user-friendly interface makes it easy to create songss and browse
        trough them. You can even customize the songs covers with your own
        images.
      </p>
      <p>
        Once you've created your songs, you can access them from any device.
        We're constantly updating our site with new features and improvements,
        so stay tuned for more exciting updates!
      </p>
      <p className={classes.special}>
        How does our search work? When you are logged in, you can only search
        your list of songs. Conversely, when you are not logged in, you can
        search through all the songs from all users.
      </p>
    </div>
  );
}

export default About;
