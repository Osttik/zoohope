import { PetInfo } from "./FirstPetBlock"
import { PetStory } from "./NdPetBlock"
import { HelpPet } from "./RdPetBlock"
import { OtherPets } from "./FourthPetBlock"
import { useParams } from "react-router";
import { apiGetAllPets } from "../../api/pets";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
export interface Pet {

    _id: string;
    name: {
        en: string,
        ua: string
      };
    type: string;
    image: string;
    sex: string;
    age: number;
    size: string;
    breed: string;
    color: string;
    personality: {
        en: string,
        ua: string
      };
      story: {
        en: string,
        ua: string
      };
    __v: number;
    sterilization: boolean;
}



export default function Pet() {
    const { id } = useParams()
    const [obj, setObj] = useState<Pet | false>(false);
    useEffect(() => {
        apiGetAllPets().then((res: [Pet]) => {
            const foundObj = res.find((item: Pet) => item._id === id);
            if (foundObj) { setObj(foundObj); }
        })

    }, [id]);

    return (

        <div className="App">

            {obj == false ? <Loader /> :
                <div className="mainPetBlock">
                    <PetInfo obj={obj} />
                    <PetStory obj={obj} />
                    <HelpPet />
                    <OtherPets />
                </div>}

        </div>
    )
}