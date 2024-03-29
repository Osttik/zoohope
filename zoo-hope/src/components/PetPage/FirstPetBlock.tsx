import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { useParams } from "react-router";
import { apiGetAllPets } from "../../api/pets";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
import {Pet} from "./Pet";
import { Link } from "react-router-dom";
export function PetInfo({ obj }: { obj: Pet }){



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
  function yearsMath(obj:Pet){
    if(obj.age === 1){return obj.age+t('1year')}
    else if(obj.age === 2 || obj.age === 3 || obj.age === 4){return obj.age+t('years')}
    else {return obj.age+t('years2')}
  }

 
  
return(

<>

<div className="begPetBlock">
                <div className="firstBegBlock">
                    <Link style={{display:'grid',textDecoration:'none'}} to='/petList'><button className="cornerButton">{t('return_to_all_pets')}</button></Link>
                    <div className="nameDiv">{translateToEnglish(obj.name.en)}</div>
                    <div className="stLogo"></div>
                </div>
                <div className="secondBegBlock">
                    <button className="firstAr"></button>
                    <img className='petPic' src={obj.image}/>
                    <button className="scndAr"></button>
                    <div className="petLog"><div className="dogLog"><div className="pawLog"></div></div></div>
                    <div className="descBlock"> <div><div>{t('sex')}: <span>{obj.sex==='male'?t('male'):t('female')}</span> </div></div>
                                                
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
   
   
   
   
   
</>
)


}