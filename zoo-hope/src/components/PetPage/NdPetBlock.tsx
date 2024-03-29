import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { Pet } from "./Pet";

export function PetStory({obj}:{obj:Pet}){
    const { t, i18n } = useTranslation();
    return(
    <>
       
            <div className="midPetBlock">
                <div className="stMidBlock"></div>


                <div className="ndMidBlock">


                    <div className="histBlock">
                        <div className="textHist">
                            <h1 style={{color:'white'}}>{t('our_story')}:</h1><br></br>
                            <h3 style={{color:'white',textAlign:'left'}}>{obj.story}</h3>
                        </div>
                    </div>
                    <button className="helpBut">
                        {t('gift_family')}
                    </button>


                </div>


                <div className="rdMidBlock"></div>



            <div className="ar2Down"> <span></span><span></span><span></span></div>  
            </div>

       
       
       
       
    </>
    )
    
    
    }