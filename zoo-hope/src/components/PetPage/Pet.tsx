



export function Pet (){


    return(
    <>
        <div className="mainPetBlock">
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
            <div className="midPetBlock">
                <div className="stMidBlock"></div>


                <div className="ndMidBlock">


                    <div className="histBlock">
                        <div className="textHist">
                            <h1 style={{color:'white',fontSize:'2rem'}}>Моя Історія:</h1><br></br>
                            <h3 style={{color:'white',textAlign:'left'}}>fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h3>
                        </div>
                    </div>
                    <button className="helpBut">
                        Подарувати сім'ю
                    </button>


                </div>


                <div className="rdMidBlock"></div>



            <div className="ar2Down"> <span></span><span></span><span></span></div>  
            </div>
            <div className="endPetBlock">


                <div className="extraHelpBlock">
                    <div className="helpTextBlock">Як можна допомогти</div>
                    <button className="extraHelpBut">1</button>
                    <button style={{gridRow:'3',gridColumn:'1'}} className="extraHelpBut">2</button>
                    <div className="logExtraHelp"></div>
                    <button style={{justifySelf:'left',gridRow:'2',gridColumn:'3'}} className="extraHelpBut">3</button>
                    <button style={{justifySelf:'left',gridRow:'3',gridColumn:'3'}} className="extraHelpBut">4</button>
                </div>


            <div className="arDown"> <span style={{borderBottom:'5px solid yellow',borderRight:'5px solid black'}}></span><span style={{borderBottom:'5px solid yellow',borderRight:'5px solid black'}}></span><span style={{borderBottom:'5px solid yellow',borderRight:'5px solid black'}}></span></div>  
            </div>
            <div className="extraPetsBlock">
                <div className="extraPets">
                    <div className="petsTopCircle"></div>
                    <div className="petsTopText">Інші тваринки</div>

                    <div className="extraPets1">
                        <div className="extraPets1Pic"></div>
                        <div className="extraPets1desc">ffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
                    </div>
                    <div className="extraPets1" style={{gridRow:'2',gridColumn:'2'}}>
                        <div className="extraPets1Pic"></div>
                        <div className="extraPets1desc">ffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
                    </div>
                    <div className="extraPets1" style={{gridRow:'2',gridColumn:'3'}}>
                        <div className="extraPets1Pic"></div>
                        <div className="extraPets1desc">ffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
                    </div>

                </div>

            </div>
        </div>
        
    </>
    )
}