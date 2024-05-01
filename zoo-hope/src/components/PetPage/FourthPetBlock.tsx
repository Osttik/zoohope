import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { requestURL } from "../../api/api";
import "../../i18n/i18n";
import axios from "axios";
import { Translate } from "../translation";
import { IPet } from "../../define";
import { PetCard } from "../pet-list/petCard/petCard";
import { useParams } from "react-router";

export function OtherPets() {
  const { t } = useTranslation();
  const [otherPets, setOtherPets] = useState<IPet[]>([]);
  const [randomPets, setRandomPets] = useState<IPet[]>([]);
  let {id} = useParams()
  useEffect(() => {
    const getData = async() => {
        const res = await axios.get(`${requestURL}/get-all-pets`);
        setOtherPets(res.data)
    }
    getData()
  }, [])
  useEffect(() => {
    if(otherPets.length > 0){
      const filterArr = otherPets.filter((pet) => pet._id !== id)
      const randomPets = getOtherPets(filterArr);
      setRandomPets(randomPets);
    }
  }, [otherPets])
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
