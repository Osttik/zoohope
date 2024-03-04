import React, { useEffect, useState } from "react";
import logo from "./images/icons/logo.svg";
import { NavBar } from "./components/navBar";
import Donate from "./components/donate";
import { Pet } from './components/PetPage/Pet';
function App() {
  useEffect(() => {
    const interval = setInterval(() => console.log(5), 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      {/* <NavBar /> */}
      <Donate />
      <Pet />
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
