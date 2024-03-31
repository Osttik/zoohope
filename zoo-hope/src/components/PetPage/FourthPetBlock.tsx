import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

export function OtherPets(){
    const { t, i18n } = useTranslation();
    return(
    <>
       <div className="extraPetsBlock">
                <div className="extraPets">
                    <div className="petsTopCircle"></div>
                    <div className="petsTopText">{t('other_pets^')}</div>

                    <div className="extraPets1">
                        <div className="extraPets1Pic"></div>
                        <div className="extraPets1desc">ffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
                    </div>
                    <div className="extraPets1" style={{gridRow:'2',gridColumn:'2'}}>
                        <div className="extraPets1Pic"></div>
                        <div className="extraPets1desc">ffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
                    </div>
                    <div className="extraPets1" style={{gridRow:'2',gridColumn:'3'}}>
                        <div className="extraPets1Pic"></div>
                        <div className="extraPets1desc">ffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
                    </div>

                </div>

            </div>
    

       
       
       
       
    </>
    )
    
    
    }