import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { IPet } from "../../define";
import PopupWindow from "./popupWindow";
import { useState } from "react";
import pet from "../../images/icons/pet.svg"
import { Translate } from "../translation";
import { requestURL } from "../../api/api";
import Carousel from "./Swiper";

interface IProps {
  obj: IPet;
}

export function PetInfo({ obj }: IProps) {
  const imagesSrc = obj.images && obj.images.length > 0 ? obj.images : pet;

  const [modalActive, setModalActive] = useState(false)

  const { t } = useTranslation();

  function yearsMath(obj: IPet) {
    let allMonth = obj.age;
    let years = Math.floor(allMonth / 12)
    let month = allMonth % 12

    const monthToString = (month: number) => {
      if (month === 1) {
        return `${month} ${t('1month')}`
      } else if (month > 1 && month < 5) {
        return `${month} ${t('month2')}`
      } else if (month > 4) {
        return `${month} ${t('month')}`
      }
    }

    const monthString = monthToString(month)

    if (years === 0) {
      return monthString
    }
    else if (years === 1) {
      return month > 0 ? `${years} ${t('1year')} ${monthString}` : `${years} ${t('1year')}`
    }
    else if (years > 1 && years < 5) {
      return month > 0 ? `${years} ${t('years')} ${monthString}` : `${years} ${t('years')}`
    }
    else if (years > 4) {
      return month > 0 ? `${years} ${t('years2')} ${monthString}` : `${years} ${t('years2')}`
    }
  }

  return (
    <div className="pet-info__container">
      <div className="begPetBlock">
        {Array.isArray(imagesSrc) ? imagesSrc.length > 1 ? <Carousel images={imagesSrc} /> :
          <><img className='petPic' alt="pet img" src={`${requestURL}/${imagesSrc[0]}`} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = pet;
          }} />
          </> :
          <><img className='petPic' alt="pet img" src={imagesSrc} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = pet;
          }} />
          </>
        }
        <div className="begPetBlock__descBlock">
          <div className="nameDiv"><Translate obj={obj.name} /></div>
          <div>
            <div className="begPetBlock__descBlock__div">{t('sex')}: <span>{obj.sex === 'Хлопчик' ? t('male') : t('female')}</span> </div>
            <div className="begPetBlock__descBlock__div">{t('age')}: <span>{yearsMath(obj)}</span></div>
            <div className="begPetBlock__descBlock__div">{t('size')}: <span>{`${obj.size} ${t('cm')}`}</span> </div>
            <div className="begPetBlock__descBlock__div">{t('wool')}: <span><Translate obj={obj.color} /></span> </div>
            <div className="begPetBlock__descBlock__div">{t('breed')}: <span><Translate obj={obj.breed} /></span> </div>
            <div id="descBlock__lastBlock" className="begPetBlock__descBlock__div">{t('character')}: <span><Translate obj={obj.personality} /></span></div>
            <div className="begPetBlock__descBlock__div">{t('sterilized')}: <span>{obj.sterilization === "Так" ? t('sterilization_yes') : t('sterilization_no')}</span> </div>
          </div>
          <button className="begPetBlock__descBlock__button" onClick={() => { setModalActive(true) }}>
            <p>{t('adopt_pet')}</p>
          </button>
        </div>
      </div>
      <PopupWindow active={modalActive} setActive={setModalActive} />
      <div className="shortStory">
        <h2>
          {t('short_description')}:
        </h2>
        <p>
          <Translate obj={obj.story} />
        </p>
      </div>
    </div>
  );
}