import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { Link } from "react-router-dom";
import { IPet } from "../../define";

interface IProps {
  obj: IPet;
}

export function PetInfo({ obj }: IProps) {
  const { t } = useTranslation();

  function yearsMath(obj: IPet) {
    if(obj.age === 1) {
      return obj.age + t('1year')
    }
    else if (obj.age === 2 || obj.age === 3 || obj.age === 4) {
      return obj.age+t('years')
    }
    else {
      return obj.age + t('years2')
    }
  }

  return (
    <div className="begPetBlock">
      <div className="firstBegBlock">
        <Link style={{display:'grid',textDecoration:'none'}} to='/petList'><button className="cornerButton">{t('return_to_all_pets')}</button></Link>
        <div className="nameDiv">{obj.name.en}</div>
        <div className="stLogo"></div>
      </div>
      <div className="secondBegBlock">
        <button className="firstAr"></button>
        <img className='petPic' src={obj.image}/>
        <button className="scndAr"></button>
        <div className="petLog">
          <div className="dogLog">
            <div className="pawLog"></div>
          </div>
        </div>
        <div className="descBlock"> 
          <div>
            <div>{t('sex')}: <span>{obj.sex==='male'?t('male'):t('female')}</span> 
            </div>
          </div>
          <div><div>{t('age')}: <span>{yearsMath(obj)}</span></div></div>
          <div><div>{t('size')}: <span>{obj.size}</span> </div></div>
          <div><div>{t('wool')}: <span>{obj.color}</span> </div></div>
          <div><div>{t('breed')}: <span>{obj.breed}</span> </div></div>
          <div><div>{t('character')}: <span>{obj.personality.en}</span> </div></div>
          <button className="likePet">{t('pet_like')}</button>                        
          </div>
        </div>
      <div className="arDown"> <span></span><span></span><span></span></div>
    </div>
  );
}