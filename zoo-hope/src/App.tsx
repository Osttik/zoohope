import React, { useEffect, useState } from "react";
import logo from "./images/icons/logo.svg";
import { NavBar } from "./components/navBar";
import Donate from "./components/donate";
function App() {
  useEffect(() => {
    const interval = setInterval(() => console.log(5), 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Donate />;
}

export default App;
