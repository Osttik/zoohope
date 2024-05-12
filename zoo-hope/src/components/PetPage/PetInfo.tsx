import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { Link } from "react-router-dom";
import { IPet } from "../../define";
import PopupWindow from "./popupWindow";
import { useState } from "react";
import pet from "../../images/icons/pet.svg"
import { Translate } from "../translation";
import { requestURL } from "../../api/api";
import MyCarousel from "./Swiper";

interface IProps {
  obj: IPet;
}

export function PetInfo({ obj }: IProps) {
  const imageSrc = obj.images && obj.images.length > 0 ? obj.images[0] : pet
  const imagesSrc = obj.images && obj.images.length > 0 ? obj.images : pet
  console.log(imagesSrc.length);


  const [modalActive, setModalActive] = useState(false)

  const { t } = useTranslation();

  function yearsMath(obj: IPet) {
    if (obj.age === 1) {
      return obj.age + t('1year')
    }
    else if (obj.age === 2, obj.age === 3, obj.age === 4) {
      return obj.age + t('years')
    }
    else {
      return obj.age + t('years2')
    }
  }

  return (
    <>

      <div className="begPetBlock">
        {Array.isArray(imagesSrc) ? imagesSrc.length > 1 ? <MyCarousel images={imagesSrc} /> :
          <><img className='petPic' src={`${requestURL}/${imagesSrc[0]}`} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = pet;
          }} />
          </> :
          <><img className='petPic' src={imagesSrc} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = pet;
          }} />
          </>
        }
        <div className="begPetBlock__descBlock">
          <div className="nameDiv"><Translate obj={obj.name} /></div>
          <div className="begPetBlock__descBlock__div">{t('sex')}: <span>{obj.sex === 'male' ? t('male') : t('female')}</span> </div>
          <div className="begPetBlock__descBlock__div">{t('age')}: <span>{yearsMath(obj)}</span></div>
          <div className="begPetBlock__descBlock__div">{t('size')}: <span>{obj.size}</span> </div>
          <div className="begPetBlock__descBlock__div">{t('wool')}: <span><Translate obj={obj.color} /></span> </div>
          <div className="begPetBlock__descBlock__div">{t('breed')}: <span><Translate obj={obj.breed} /></span> </div>
          <div id="descBlock__lastBlock" className="begPetBlock__descBlock__div">{t('character')}: <span>{obj.personality.en}</span></div>
          <button className="begPetBlock__descBlock__button" onClick={() => { setModalActive(true) }}>
            <p>{t('adopt_pet')}</p>
          </button>
        </div>
      </div>
      <PopupWindow active={modalActive} setActive={setModalActive} />
      <div className="shortStory">
        <h2>{t('short_description')}:</h2>
        <p>{obj.story.en}
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec massa sem. Proin at est et lectus viverra fermentum at at sem. Duis dapibus accumsan. */}
        </p>
      </div></>
  );
}