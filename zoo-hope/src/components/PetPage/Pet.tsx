import { PetInfo } from "./PetInfo";
import { HelpPet } from "./RdPetBlock";
import { useParams } from "react-router";
import { getAllPets } from "../../api/pets";
import { useEffect, useState, useContext } from "react";
import Loader from "./loader";
import { IPet } from "../../define";
import PetContext from "../../PetsContext";
import { OtherPets } from "./FourthPetBlock";

export default function Pet() {
    const { id } = useParams()
    const [obj, setObj] = useState<IPet | false>(false);
    const { pets_data } = useContext(PetContext);
    useEffect(() => {
        const foundObj = pets_data.find((item: IPet) => item._id === id);
        if (foundObj) { 
            setObj(foundObj); 
        }
    }, [id, pets_data]);

  return (
    <div className="App">
      {obj === false ? (
        <Loader />
      ) : (
        <div className="mainPetBlock">
          <PetInfo obj={obj} />
          <HelpPet />
          <OtherPets/>
        </div>
      )}
    </div>
  );
}