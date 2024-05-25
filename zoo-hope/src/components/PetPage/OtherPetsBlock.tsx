import { useContext, useEffect, useState } from "react";
import "../../i18n/i18n";
import { IPet } from "../../define";
import { PetCard } from "../pet-list/petCard/petCard";
import { useParams } from "react-router";
import PetContext from "../../PetsContext";
import { useTranslation } from "react-i18next";

export function OtherPetsBlock() {
  const [randomPets, setRandomPets] = useState<IPet[]>([]);
  const { pets_data } = useContext(PetContext);
  const { t } = useTranslation();

  let { id } = useParams()

  useEffect(() => {
    if (pets_data.length > 0) {
      const filterArr = pets_data.filter((pet: IPet) => pet._id !== id)
      const randomPets = getOtherPets(filterArr);
      setRandomPets(randomPets);
    }
  }, [id]);

  return (
    <div className="petList__container">
      <h1 className="petList__title">{t('other_pet_need_home')}</h1>
      <div className="petListSection additionalPetsBlock">
        {randomPets.map((el, i) => (
          <PetCard key={i} animalInfo={el} />
        ))}
      </div>
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
