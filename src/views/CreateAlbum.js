import React, { useState } from "react";
import classes from "./CreateAlbum.module.css";

const CreateAlbum = () => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 className={classes.header}>Create Album</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes["form-group"]}>
          <label htmlFor="name">Album Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="password"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="imgUrl">Image Url</label>
          <input
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Album</button>
      </form>
    </>
  );
};

export default CreateAlbum;
