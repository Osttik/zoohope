import { PetInfo } from "./FirstPetBlock"
import { PetStory } from "./NdPetBlock"
import { HelpPet } from "./RdPetBlock"
import { OtherPets } from "./FourthPetBlock"


export function Pet (){


    return(
    <>
        <div className="mainPetBlock">
            <PetInfo />
            <PetStory />
            <HelpPet />
            <OtherPets />
        </div>
        
    </>
    )
}