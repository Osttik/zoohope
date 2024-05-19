import { useTranslation } from "react-i18next";
import "../../../i18n/i18n";
import { IPet } from "../../../define";
import { Translate } from "../../translation";
import { Link } from "react-router-dom";
import pet from "../../../images/icons/pet.svg"
import { requestURL } from "../../../api/api";
interface cardProps {
  animalInfo: IPet;
}

export const PetCard = (props: cardProps) => {
  const imageSrc = props.animalInfo.images && props.animalInfo.images.length > 0 ? props.animalInfo.images[0] : pet;
  const { t } = useTranslation();

  function ageWithLabel() {
    const age = Number(props.animalInfo.age)
    let years = Math.floor(age/12)
    let month = age % 12

    const monthToString = (month: number) => {
      if (month === 1) {
        return `${month} ${t('1month')}`
      } else if (month > 1 && month < 5) {
        return `${month} ${t('month2')}`
      } else if ( month > 4) {
        return `${month} ${t('month')}`
      }
    }

    const monthString = monthToString(month)

    if (years < 1) {
      return monthString
    } else if (years === 1) {
        return years + t('1year');
    } else if (years >= 2 && years <= 4) {
        return years + t('years');
    } else {
        return years + t('years2');
    }
  }
  
  return(
    <Link to={`/animal/${props.animalInfo._id}`} className="petCard">
      <img src={`${requestURL}/${imageSrc}`} onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src=pet;
      }} alt="ImageOfAnimal"></img>
      <div className="info">
        <span className="name"><Translate obj={(props.animalInfo.name)}/></span>
        <span className="infoRow">{t('age')}: {ageWithLabel()}</span>
        <span className="infoRow">{t('sex')}: {props.animalInfo.sex === "female" ? t('female') : t('male')}</span>
      </div>
    </Link>
  )
}