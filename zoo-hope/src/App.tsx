import React, { useEffect, useState } from 'react';
import logo from './images/icons/logo.svg';
import { NavBar } from './components/navBar';

function App() {
  useEffect(() => {
    const interval = setInterval(() => console.log(5), 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
