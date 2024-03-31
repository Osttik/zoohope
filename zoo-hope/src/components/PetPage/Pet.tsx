import { PetInfo } from "./FirstPetBlock"
import { PetStory } from "./NdPetBlock"
import { HelpPet } from "./RdPetBlock"
import { OtherPets } from "./FourthPetBlock"
import { useParams } from "react-router";
import { apiGetAllPets } from "../../api/pets";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { IPet } from "../../define";

export default function Pet() {
    const { id } = useParams()
    const [obj, setObj] = useState<IPet | false>(false);
    useEffect(() => {
        apiGetAllPets().then(res => {
            const foundObj = res.find((item: IPet) => item._id === id);
            if (foundObj) { 
                setObj(foundObj); 
            }
        });
    }, [id]);

    return (
        <div className="App">
            {obj === false ? 
                <Loader /> :
                <div className="mainPetBlock">
                    <PetInfo obj={obj} />
                    <PetStory obj={obj} />
                    <HelpPet />
                    <OtherPets />
                </div>
            }
        </div>
    );
}