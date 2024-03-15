import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

export function HelpPet(){
    const { t, i18n } = useTranslation();
    return(
    <>
       
    <div className="endPetBlock">


        <div className="extraHelpBlock">
            <div className="helpTextBlock">{t('how_to_help+')}</div>
            <button className="extraHelpBut">1</button>
            <button style={{gridRow:'3',gridColumn:'1'}} className="extraHelpBut">2</button>
            <div className="logExtraHelp"></div>
            <button style={{justifySelf:'left',gridRow:'2',gridColumn:'3'}} className="extraHelpBut">3</button>
            <button style={{justifySelf:'left',gridRow:'3',gridColumn:'3'}} className="extraHelpBut">4</button>
        </div>


        <div className="arDown"> <span style={{borderBottom:'5px solid yellow',borderRight:'5px solid black'}}></span><span style={{borderBottom:'5px solid yellow',borderRight:'5px solid black'}}></span><span style={{borderBottom:'5px solid yellow',borderRight:'5px solid black'}}></span></div>  
    </div>

       
       
       
       
    </>
    )
    
    
    }