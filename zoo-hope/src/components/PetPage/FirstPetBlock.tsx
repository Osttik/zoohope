

export function PetInfo(){

return(
<>
   
<div className="begPetBlock">
                <div className="firstBegBlock">
                    <button className="cornerButton">Повернутись до всіх тваринок</button>
                    <div className="nameDiv">Тваринка</div>
                    <div className="stLogo"></div>
                </div>
                <div className="secondBegBlock">
                    <button className="firstAr"></button>
                    <img className='petPic' src='https://i.pinimg.com/originals/2d/cf/63/2dcf63c23e359dd5fec6ced32d4d8805.jpg'/>
                    <button className="scndAr"></button>
                    <div className="petLog"><div className="dogLog"><div className="pawLog"></div></div></div>
                    <div className="descBlock"> <p>Стать: Хлопчик</p>
                                                
                                                <p>Вік: Підліток</p>

                                                <p>Розмір: Маленький (Вага 3-4 кг)</p>

                                                <p>Шерсть: Коротка</p>

                                                <p>Порода: Метис</p>

                                                <p>Масть: Чорний таббі</p>

                                                <p>Характер: Лікар, Компаньйон</p>
                                                

                        <button className="likePet"> ❤ Додати в обране</button>                        
                    </div>

                </div>
                <div className="arDown"> <span></span><span></span><span></span></div>  
                
            </div>
   
   
   
   
   
</>
)


}