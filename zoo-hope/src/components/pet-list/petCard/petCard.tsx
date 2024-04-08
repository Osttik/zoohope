import { useTranslation } from "react-i18next";
import "../../../i18n/i18n";
import { IPet } from "../../../define";
import { Translate } from "../../translation";
interface cardProps {
  animalInfo: IPet;
}

export const PetCard = (props: cardProps) => {
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
    <a href={`animal/${props.animalInfo._id}`} className="petCard">
        <img src={props.animalInfo.image} alt="ImageOfAnimal"></img>
        <div className="info">
          <span className="name"><Translate obj={(props.animalInfo.name)}/></span>
          <span className="infoRow">{t('age')}: {ageWithLabel()}</span>
          <span className="infoRow">{t('sex')}: {props.animalInfo.sex === "female" ? t('female') : t('male')}</span>
        </div>
    </a>
  )
}