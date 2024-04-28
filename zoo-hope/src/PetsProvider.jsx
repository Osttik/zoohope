import React, { createContext, useState, useEffect } from 'react';
import { getAllPets } from './api/pets';
import PetContext from './PetsContext';

export const PetProvider = ({ children }) => {
    const [pets_data, setPets] = useState([]);
    useEffect(() => {

      const fetchPets = async () => {
        const petsData = await getAllPets();
        setPets(petsData);
      };
  
      fetchPets();
  
    }, []);
  
    return (
      <PetContext.Provider value={pets_data}>
        {children}
      </PetContext.Provider>
    );
  };
  
  export default PetContext;