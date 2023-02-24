import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from 'react';
import classes from './App.module.css';
import NavBar from './components/navbar/NavBar';
import About from "./views/About";
import CreateAlbum from "./views/CreateAlbum";
import Home from './views/Home';
import Login from "./views/Login";
import Music from "./views/Music";
import Register from "./views/Register";
import Search from "./views/Search";
import MyMusic from "./views/MyMusic";

function App() {
  const [enteredSearch, setEnteredSearch] = useState('')

  const searchHandler = (searchValue) => {
    setEnteredSearch(searchValue)
  }

  return (
    <div className={classes.app}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar searchHandler={searchHandler} />}>
          <Route index element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/my-music" element={<MyMusic />} />
          <Route path="/create-album" element={<CreateAlbum />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search enteredSearch={enteredSearch} />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
