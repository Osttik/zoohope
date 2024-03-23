import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

export function PetInfo(){
const { t, i18n } = useTranslation();
function translateToEnglish(ukrainianName:string):string {
    const ukrainianLetters:{ [key: string]: string } = {
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G',
      'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z',
      'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K',
      'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
      'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F',
      'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
      'Ь': '', 'Ю': 'Yu', 'Я': 'Ya', 'а': 'a', 'б': 'b',
      'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e',
      'є': 'ie', 'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i',
      'ї': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm',
      'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's',
      'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
      'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'iu',
      'я': 'ia'
    };
    if(i18n.language=='en'){return ukrainianName.split('').map(char => ukrainianLetters[char] || char).join('');}
    else{ return ukrainianName}
     
    
  }

 
  
return(
<>
   
<div className="begPetBlock">
                <div className="firstBegBlock">
                    <button className="cornerButton">{t('return_to_all_pets')}</button>
                    <div className="nameDiv">{translateToEnglish('Тваринка')}</div>
                    <div className="stLogo"></div>
                </div>
                <div className="secondBegBlock">
                    <button className="firstAr"></button>
                    <img className='petPic' src='https://i.pinimg.com/originals/2d/cf/63/2dcf63c23e359dd5fec6ced32d4d8805.jpg'/>
                    <button className="scndAr"></button>
                    <div className="petLog"><div className="dogLog"><div className="pawLog"></div></div></div>
                    <div className="descBlock"> <div><div>{t('sex')}: Хлопчик</div></div>
                                                
                                                <div><div>{t('age')}: Підліток</div></div>

                                                <div><div>{t('size')}: Маленький (Вага 3-4 кг)</div></div>

                                                <div><div>{t('wool')}: Коротка</div></div>

                                                <div><div>{t('breed')}: Метис</div></div>

                                                <div><div>{t('character')}: Лікар, Компаньйон</div></div>
                                                

                        <button className="likePet">{t('pet_like')}</button>                        
                    </div>

                </div>
                <div className="arDown"> <span></span><span></span><span></span></div>  
                
            </div>
   
   
   
   
   
</>
)


}