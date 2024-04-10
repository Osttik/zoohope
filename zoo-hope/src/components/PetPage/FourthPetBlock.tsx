import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { requestURL } from "../../api/api";
import "../../i18n/i18n";
import axios from "axios";
import { Translate } from "../translation";
import { IPet } from "../../define";
import { PetCard } from "../pet-list/petCard/petCard";

export function OtherPets() {
  const { t } = useTranslation();
  const [otherPets, setOtherPets] = useState<IPet[]>([]);
  const [randomPets, setRandomPets] = useState<IPet[]>([]);
  useEffect(() => {
    const getData = async() => {
        const res = await axios.get(`${requestURL}/get-all-pets`);
        setOtherPets(res.data)
    }
    getData()
  }, [])
  useEffect(() => {
    const randomPets: IPet[] = [];
    if (otherPets.length <= 3) {
      setRandomPets(otherPets)
    } else {
      const randomIndexes: number[] = [];
      while (randomIndexes .length <= 3) {
        const randomIndex = Math.floor(Math.random() * otherPets.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      const randomPets = randomIndexes.map((index) => (otherPets[index]))
      setRandomPets(randomPets)
    }
    // setPets(otherPets.slice(0, 2))
  }, [otherPets])
  return (    
    <div className="petListSection additionalPetsBlock">
        {randomPets.map((el) => (
            <PetCard animalInfo={el}/>
        ))}
    </div>
  )
}