import HeadingCard from "../components/UI/HeadingCard";
import {
  faHeadphones,
  faBarsStaggered,
  faCircleCheck,
  faClockFour,
  faStar,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <main className={classes.container}>
      <section className={classes.heading__section}>
        <h1 className={classes.heading__h1}>
          Share Your Love for{" "}
          <span className={classes.heading__music_word}>Music</span> With
          Friends.
        </h1>
        <p className={classes.heading__p}>
          Musicboard is a social platform that allows you to keep track of all
          the music you listen to and grow your passion for music with friends.
          Compile lists in music's fastest growing community.
        </p>
        {userData ? (
          <Link to="/my-music">
            <button
              style={{ backgroundColor: "black" }}
              className={classes.home__btn_mymusic}
            >
              My Music
            </button>
          </Link>
        ) : (
          <Link to="/register">
            <button className={classes.heading__button}>Create Account</button>
          </Link>
        )}
      </section>
      <section className={classes.options__section}>
        <p className={classes.options__p}>Music Library Let's You...</p>
        <div className={classes.options__div}>
          <HeadingCard
            icon={faHeadphones}
            text="Keep track of all the music you have listened to (or just start from the day you join)"
          />
          <HeadingCard
            icon={faBarsStaggered}
            text="Share your opinions with friends and our community"
          />
          <HeadingCard
            icon={faCircleCheck}
            text="Collect music into lists and show off your favorite songs, rank an artist's discography, and more"
          />
          <HeadingCard
            icon={faClockFour}
            text="Save music you haven't listened to yet and stay up to date as new songs are being released"
          />
          <HeadingCard
            icon={faStar}
            text="Browse out Most Popular Songs to discover great music and new artists"
          />
          <HeadingCard
            icon={faInfoCircle}
            text="Check our About Page for more info"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
