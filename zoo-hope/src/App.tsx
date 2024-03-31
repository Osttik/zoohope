import React, { useEffect, useState } from 'react';
import { NavBar } from './components/navBar';
import { Footer } from './components/footer';
import Donate from "./components/donate";
import { Pet } from './components/PetPage/Pet';
import { AdminPage } from './components/admin-page';

function App() {
  return (
    <div className="App">
      {/* <Donate /> */}
      {/* <Pet /> */}

      <AdminPage />
    </div>
  );
}

export default App;