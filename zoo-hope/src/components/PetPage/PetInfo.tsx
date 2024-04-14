import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { Link } from "react-router-dom";
import { IPet } from "../../define";
import PopupWindow from "./popupWindow";
import { useState } from "react";

interface IProps {
  obj: IPet;
}

export function PetInfo({ obj }: IProps) {
  const [modalActive, setModalActive] = useState(false)

  const { t } = useTranslation();

  function yearsMath(obj: IPet) {
    if(obj.age === 1) {
      return obj.age + t('1year')
    }
    else if (obj.age === 2,  obj.age === 3,  obj.age === 4) {
      return obj.age+t('years')
    }
    else {
      return obj.age + t('years2')
    }
  }

  return (
    <>
    <div className="begPetBlock">
        <img className='petPic' src={obj.image}/>
        <div className="begPetBlock__descBlock"> 
          <div className="nameDiv">{obj.name.en}</div>
          <div className="begPetBlock__descBlock__div">{t('sex')}: <span>{obj.sex==='male'?t('male'):t('female')}</span> </div>
          <div className="begPetBlock__descBlock__div">{t('age')}: <span>{yearsMath(obj)}</span></div>
          <div className="begPetBlock__descBlock__div">{t('size')}: <span>{obj.size}</span> </div>
          <div className="begPetBlock__descBlock__div">{t('wool')}: <span>{obj.color}</span> </div>
          <div className="begPetBlock__descBlock__div">{t('breed')}: <span>{obj.breed}</span> </div>
          <div id="descBlock__lastBlock" className="begPetBlock__descBlock__div">{t('character')}: <span>{obj.personality.en}</span></div> 
          <button className="begPetBlock__descBlock__button" onClick={() => {setModalActive(true)}}>
            <p>{t('adopt_pet')}</p>
          </button>     
        </div>
    </div>
          <PopupWindow active={modalActive} setActive={setModalActive}/>                
        <div className="shortStory">
          <h2>{t('short_description')}:</h2>
          <p>{obj.story.en}
           {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec massa sem. Proin at est et lectus viverra fermentum at at sem. Duis dapibus accumsan. */}
          </p>
        </div></>
  );
}