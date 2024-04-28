import React, { createContext, useState, useEffect } from 'react';
import { getAllPets } from './api/pets';
import PetContext from './PetsContext';

export const PetProvider = ({ children }: any) => {
  const [logErMes, setlogErMes] = useState("");
  const [prevPath, setPrevPath] = useState("");
  const [pets_data, setPets] = useState([]);
  useEffect(() => {

    const fetchPets = async () => {
      const petsData = await getAllPets();
      setPets(petsData);
    };

    fetchPets();

  }, []);

  return (
    <PetContext.Provider value={{pets_data, prevPath, setPrevPath, logErMes, setlogErMes}}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContext;