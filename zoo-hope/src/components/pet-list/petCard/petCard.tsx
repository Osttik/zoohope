interface cardProps {
  animalInfo: {
    image: string,
    name: string,
    age: string,
    sex: string
    type: string,
    _id: string,
  };
}

export const PetCard = (props: cardProps) => {

  function ageWithLabel() {
    const age = Number(props.animalInfo.age)
    if (age === 1) {
        return age + ' рік';
    } else if (age >= 2 && age <= 4) {
        return age + ' роки';
    } else {
        return age + ' років';
    }
}

  return(
    <a href={`animal/${props.animalInfo._id}`} className="petCard">
        <img src={props.animalInfo.image} alt="ImageOfAnimal"></img>
        <span className="name">{props.animalInfo.name}</span>
        <div className="info">
          <span className="infoRow">Вік: {ageWithLabel()}</span>
          <span className="infoRow">Стать: {props.animalInfo.sex === "female" ? "Жіноча" : "Чоловіча"}</span>
          <span className="infoRow">{props.animalInfo.type === "cat" ? "Кіт" : "Пес"}</span>
        </div>
    </a>
  )
}