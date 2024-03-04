import { First_Pet_Block } from "./FirstPetBlock"
import { Second_Pet_Block } from "./NdPetBlock"
import { Third_Pet_Block } from "./RdPetBlock"
import { Fourth_Pet_Block } from "./FourthPetBlock"


export function Pet (){


    return(
    <>
        <div className="mainPetBlock">
            <First_Pet_Block />
            <Second_Pet_Block />
            <Third_Pet_Block />
            <Fourth_Pet_Block />
        </div>
        
    </>
    )
}