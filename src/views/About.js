import React from "react";
import classes from "./About.module.css";

function About() {
  return (
    <div className={classes.container}>
      <h1>About</h1>
      <p>
        Welcome to our site! We're dedicated to helping you create your own
        albums so you can easily listen to your favorite songs anytime,
        anywhere.
      </p>
      <p>
        Our user-friendly interface makes it easy to create albums and browse
        trough them. You can even customize the album covers with your own
        images.
      </p>
      <p>
        Once you've created your albums, you can access them from any device.
        We're constantly updating our site with new features and improvements,
        so stay tuned for more exciting updates!
      </p>
    </div>
  );
}

export default About;
