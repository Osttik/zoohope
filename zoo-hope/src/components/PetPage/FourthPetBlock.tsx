import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { requestURL } from "../../api/api";
import "../../i18n/i18n";
import axios from "axios";
import { Translate } from "../translation";
import { IPet } from "../../define";
import { PetCard } from "../pet-list/petCard/petCard";
// import "../../styles/petList/petCard.scss"

export function OtherPets() {
  const { t } = useTranslation();
  const [otherPets, setOtherPets] = useState<IPet[]>([])
  useEffect(() => {
    const getData = async() => {
        const res = await axios.get(`${requestURL}/get-all-pets`);
        setOtherPets(res.data)
    }
    getData()
  }, [])

  return (    
    <div className="petListSection additionalPetsBlock">
        {otherPets.map((el) => (
            <PetCard animalInfo={el}/>
        ))}
    </div>
  )
}