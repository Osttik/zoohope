import React, { createContext, useState, useEffect } from 'react';
import { apiGetAllPets } from './api/pets';
import PetContext from './PetsContext';

export const PetProvider = ({ children }) => {
  const [logErMes, setlogErMes] = useState(false);
  const [prevPath, setPrevPath] = useState(null);
  const [pets_data, setPets] = useState([]);
  useEffect(() => {

    const fetchPets = async () => {
      const petsData = await apiGetAllPets();
      setPets(petsData);
    };

    fetchPets();

  }, []);

  return (
    <PetContext.Provider value={[pets_data, prevPath, setPrevPath, logErMes, setlogErMes]}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContext;