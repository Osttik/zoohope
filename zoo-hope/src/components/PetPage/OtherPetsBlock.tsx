import { useEffect, useState } from "react";
import "../../i18n/i18n";
import { IPet } from "../../define";
import { PetCard } from "../pet-list/petCard/petCard";
import { useParams } from "react-router";
import { getAllPets } from "../../api/pets";

export function OtherPetsBlock() {
  const [randomPets, setRandomPets] = useState<IPet[]>([]);

  let {id} = useParams()

  useEffect(() => {
    const getData = async() => {
      const res = await getAllPets();

      if(res.length > 0){
        const filterArr = res.filter((pet: IPet) => pet._id !== id)
        const randomPets = getOtherPets(filterArr);
        setRandomPets(randomPets);
      }
    }
    getData()
  }, []);

  return (    
    <div className="petListSection additionalPetsBlock">
      {randomPets.map((el, i) => (
        <PetCard key={i} animalInfo={el}/>
      ))}
    </div>
  )
}

function getOtherPets(otherPets: IPet[]) {
  const randomIndexes: number[] = [];
  while (randomIndexes.length <= 1) {
    const randomIndex = Math.floor(Math.random() * otherPets.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
    }
  const randomPets = randomIndexes.map((index) => (otherPets[index]));
  return randomPets;
}
