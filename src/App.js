import './sass/body.scss';
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NaveBar from './NavBar/NavBar';
import Home from './Layouts/Home/Home';
import { user } from './data/Data';


function App() {

  let root = document.querySelector(":root")

 


  // Theme
  const [localTheme, setLocalTheme] = useState('')
  useEffect(() => {
    setLocalTheme(localStorage.getItem('theme'))
    root.setAttribute('data-theme', localStorage.getItem('theme'))
  }, []);
  const handleTheme = (checked) => {
    if (checked === true) {
      localStorage.setItem('theme', 'dark');
      setLocalTheme(localStorage.getItem('theme'))
      root.setAttribute('data-theme', localStorage.getItem('theme'))
    } else {
      localStorage.setItem('theme', 'default');
      setLocalTheme(localStorage.getItem('theme'))
      root.setAttribute('data-theme', localStorage.getItem('theme'))
    }
  }
  //___



  return (
    <>
      <NaveBar handleTheme={handleTheme} localTheme={localTheme} user={user} />
      <div style={{ paddingTop: 60 }}>
        <Routes>
          <Route path="/" element={<Home localTheme={localTheme} user={user} />} />
        </Routes>
        <div className="bg" data-theme={localTheme}></div>
        <div className="bg bg2" data-theme={localTheme}></div>
        <div className="bg bg3" data-theme={localTheme}></div>
      </div>
    </>
  );
}

export default App;
