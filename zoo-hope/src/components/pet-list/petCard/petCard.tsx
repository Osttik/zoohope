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
    if (age === 1) {
        return age + t('1year');
    } else if (age >= 2 && age <= 4) {
        return age + t('years');
    } else {
        return age + t('years2');
    }
  }
  
  return(
    <Link to={`/animal/${props.animalInfo._id}`} className="petCard">
      <img src={`${requestURL}/${imageSrc}`} onError={({ currentTarget }) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src=pet;
  }} alt="ImageOfAnimal"></img>
      {/* <img src={props.animalInfo.image} alt="ImageOfAnimal"></img> */}
      <div className="info">
        <span className="name"><Translate obj={(props.animalInfo.name)}/></span>
        <span className="infoRow">{t('age')}: {ageWithLabel()}</span>
        <span className="infoRow">{t('sex')}: {props.animalInfo.sex === "female" ? t('female') : t('male')}</span>
      </div>
    </Link>
  )
}