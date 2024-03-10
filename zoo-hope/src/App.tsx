import React, { useEffect, useState } from 'react';
import logo from './images/icons/logo.svg';
import { NavBar } from './components/navBar';
import { Footer } from './components/footer';
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
      <NavBar />
      {/* <Donate /> */}
      <Pet />
      <Footer />
    </div>
  );
}

export default App;