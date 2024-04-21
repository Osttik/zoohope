import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import { SetStateAction, useState, ChangeEvent, useEffect } from "react";
import axios from "axios";

interface IPetFormProps {
    display: string;
    hideForm: () => void;
    setPetTableUpdate: any;
    setIsEditBtnClicked: any;
    isEditBtnClicked: boolean;
    pets: any;
    selectedPetsRowIndex: null | number;
}

export const PetInfoForm = ({ display, hideForm, setPetTableUpdate, setIsEditBtnClicked, isEditBtnClicked, pets, selectedPetsRowIndex }: IPetFormProps) => {
    const [nameEn, setNameEn] = useState<string>('');
    const [nameUa, setNameUa] = useState<string>('');

    const [isDogChecked, setIsDogChecked] = useState<boolean>(false);
    const [isCatChecked, setIsCatChecked] = useState<boolean>(false);
    const [isGirlChecked, setIsGirlChecked] = useState<boolean>(false);
    const [isBoyChecked, setIsBoyChecked] = useState<boolean>(false);
    const [noBreedChecked, setNoBreedChecked] = useState<boolean>(false);
    const [isSterilizationChecked, setIsSterilizationChecked] = useState<boolean>(false);
    const [isTreatmentChecked, setIsTreatmentChecked] = useState<boolean>(false);

    const [years, setYears] = useState<number | undefined>();
    const [month, setMonth] = useState<number | undefined>();
    const [breedEn, setBreedEn] = useState<string>('');
    const [breedUa, setBreedUa] = useState<string>('');
    const [size, setSize] = useState<number>(0);
    const [colorEn, setColorEn] = useState<string>('');
    const [colorUa, setColorUa] = useState<string>('');
    const [personalityEn, setPersonalityEn] = useState<string>('');
    const [personalityUa, setPersonalityUa] = useState<string>('');
    const [storyEn, setStoryEn] = useState<string>('');
    const [storyUa, setStoryUa] = useState<string>('');

    const [images, setImages] = useState<string[]>([]);

    const [petData, setPetData] = useState<any>(null);

    const selectedContact = selectedPetsRowIndex !== null ? pets[selectedPetsRowIndex] : null;
    const petId = selectedContact ? selectedContact._id : null;

    const fetchContactsData = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/get-pet/${id}`);
            setPetData(response.data);
        } catch (error) {
            console.error('Error fetching pet data:', error);
        }
    };

    const updateFormFields = () => {
        if (petData) {
            setNameEn(petData.name.en);
            setNameUa(petData.name.ua);
            setSize(petData.size);
            setColorEn(petData.color.en);
            setColorUa(petData.color.ua);
            setPersonalityEn(petData.personality.en);
            setPersonalityUa(petData.personality.ua);
            setStoryEn(petData.story.en);
            setStoryUa(petData.story.ua);
            setImages(petData.images);

            if (petData.type === 'Пес') {
                setIsDogChecked(true);
                setIsCatChecked(false);
            } else if (petData.type === 'Кіт') {
                setIsDogChecked(false);
                setIsCatChecked(true);
            }
    
            if (petData.sex === 'Дівчинка') {
                setIsGirlChecked(true);
                setIsBoyChecked(false);

            } else if (petData.sex === 'Хлопчик') {
                setIsGirlChecked(false);
                setIsBoyChecked(true);
            }
    
            if (petData.breed.en === 'No breed' && petData.breed.ua === 'Без породи') {
                setNoBreedChecked(true);
                setBreedEn('');
                setBreedUa('');
                
            } else {
                setNoBreedChecked(false);
                setBreedEn(petData.breed.en);
                setBreedUa(petData.breed.ua);
            }
    
            setIsSterilizationChecked(petData.sterilization === 'Так');
            setIsTreatmentChecked(petData.treatment === 'Потребує');
    
            const years = Math.floor(petData.age / 12);
            const months = petData.age % 12;
            setYears(years);
            setMonth(months);
        }
    };

    useEffect(() => {
        if (isEditBtnClicked && selectedPetsRowIndex !== null) {
            fetchContactsData(petId);
        }
    }, [isEditBtnClicked, selectedPetsRowIndex]);

    useEffect(() => {
        updateFormFields();
    }, [petData]);

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const addPet = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                (isDogChecked || isCatChecked) &&
                (isGirlChecked || isBoyChecked) &&
                ((breedEn.trim() !== '' && breedUa.trim() !== '') || noBreedChecked) &&
                size && size !== 0 &&
                colorEn.trim() !== '' &&
                colorUa.trim() !== '' &&
                personalityEn.trim() !== '' &&
                personalityUa.trim() !== '' &&
                storyEn.trim() !== '' &&
                storyUa.trim() !== ''
            );

            if (!isFormValid) {
                return alert(`Заповніть всі поля! (поле про стерилізацію і лікування не є обов'язковими)`);
            }

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim()),
                },
                type: isDogChecked ? 'Пес' : (isCatChecked ? 'Кіт' : ''),
                images: images,
                sex: isGirlChecked ? 'Дівчинка' : (isBoyChecked ? 'Хлопчик' : ''),
                age: ((years !== undefined ? years : 0) * 12) + (month !== undefined ? month : 0),
                breed: noBreedChecked
                    ? {
                        en: 'No breed',
                        ua: 'Без породи'
                    }
                    : {
                        en: capitalizeFirstLetter(breedEn.trim()),
                        ua: capitalizeFirstLetter(breedUa.trim())
                    },
                size: size,
                color: {
                    en: capitalizeFirstLetter(colorEn.trim()),
                    ua: capitalizeFirstLetter(colorUa.trim())
                },
                personality: {
                    en: capitalizeFirstLetter(personalityEn.trim()),
                    ua: capitalizeFirstLetter(personalityUa.trim())
                },
                sterilization: isSterilizationChecked ? 'Так' : 'Ні',
                treatment: isTreatmentChecked ? 'Потребує' : 'Не потребує',
                story: {
                    en: capitalizeFirstLetter(storyEn.trim()),
                    ua: capitalizeFirstLetter(storyUa.trim())
                },
            };

            const response = await axios.post('http://localhost:5000/add-pet', formData);
            setPetTableUpdate((prev: boolean) => !prev);

            hideForm();
            cleanForm();

            console.log('Pet added successfully:', response.data);
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    }

    const updatePet = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                (isDogChecked || isCatChecked) &&
                (isGirlChecked || isBoyChecked) &&
                ((breedEn.trim() !== '' && breedUa.trim() !== '') || noBreedChecked) &&
                size && size !== 0 &&
                colorEn.trim() !== '' &&
                colorUa.trim() !== '' &&
                personalityEn.trim() !== '' &&
                personalityUa.trim() !== '' &&
                storyEn.trim() !== '' &&
                storyUa.trim() !== ''
            );

            if (!isFormValid) {
                return alert(`Заповніть всі поля! (поле про стерилізацію і лікування не є обов'язковими)`);
            }

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim()),
                },
                type: isDogChecked ? 'Пес' : (isCatChecked ? 'Кіт' : ''),
                images: images,
                sex: isGirlChecked ? 'Дівчинка' : (isBoyChecked ? 'Хлопчик' : ''),
                age: ((years !== undefined ? years : 0) * 12) + (month !== undefined ? month : 0),
                breed: noBreedChecked
                    ? {
                        en: 'No breed',
                        ua: 'Без породи'
                    }
                    : {
                        en: capitalizeFirstLetter(breedEn.trim()),
                        ua: capitalizeFirstLetter(breedUa.trim())
                    },
                size: size,
                color: {
                    en: capitalizeFirstLetter(colorEn.trim()),
                    ua: capitalizeFirstLetter(colorUa.trim())
                },
                personality: {
                    en: capitalizeFirstLetter(personalityEn.trim()),
                    ua: capitalizeFirstLetter(personalityUa.trim())
                },
                sterilization: isSterilizationChecked ? 'Так' : 'Ні',
                treatment: isTreatmentChecked ? 'Потребує' : 'Не потребує',
                story: {
                    en: capitalizeFirstLetter(storyEn.trim()),
                    ua: capitalizeFirstLetter(storyUa.trim())
                },
            };

            const response = await axios.put(`http://localhost:5000/update-pet/${petId}`, formData);
            setPetTableUpdate((prev: boolean) => !prev);

            hideForm();
            cleanForm();
            setIsEditBtnClicked(false);

            console.log('Pet added successfully:', response.data);
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    }

    const saveContact = () => {
        if (isEditBtnClicked === true) {
            updatePet();
        } else {
            addPet();
        }
    }


    const handleNameEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNameEn(e.target.value);
    };

    const handleNameUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNameUa(e.target.value);
    };

    const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        setYears(parseInt(e.target.value));
    };

    const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMonth(parseInt(e.target.value));
    };

    const handleBreedEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setBreedEn(e.target.value);
    };

    const handleBreedUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setBreedUa(e.target.value);
    };

    const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSize(parseInt(e.target.value));
    };

    const handleColorEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setColorEn(e.target.value);
    };

    const handleColorUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setColorUa(e.target.value);
    };

    const handlePersonalityEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPersonalityEn(e.target.value);
    };

    const handlePersonalityUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPersonalityUa(e.target.value);
    };

    const handleStoryEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setStoryEn(e.target.value);
    };

    const handleStoryUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setStoryUa(e.target.value);
    };

    const handleFileChange = async (e: { target: { files: any; }; }) => {
        const files = e.target.files;
        const formData = new FormData();
    
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }
    
        try {
            const response = await axios.post('http://localhost:5000/upload-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            const newImages = response.data.map((imagePath: any) => `http://localhost:5000/${imagePath}`);
            setImages([...images, ...newImages]);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const cleanForm = () => {
        setNameEn('');
        setNameUa('');
        setYears(0);
        setMonth(0);
        setBreedEn('');
        setBreedUa('');
        setSize(0);
        setColorEn('');
        setColorUa('');
        setPersonalityEn('');
        setPersonalityUa('');
        setStoryEn('');
        setStoryUa('');
        setIsDogChecked(false);
        setIsCatChecked(false);
        setIsGirlChecked(false);
        setIsBoyChecked(false);
        setNoBreedChecked(false);
        setIsSterilizationChecked(false);
        setIsTreatmentChecked(false);
        setImages([]);
    }
    return (
        <div className="pet-form" style={{ display: display }}>
            <div className="pet-form__container">
                <div className="pet-form__close-btn">
                    <button onClick={() => { hideForm(); cleanForm(); setIsEditBtnClicked(false);}}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="pet-form__header">
                    <img src={Logo} alt="zoonadiya-logo" className="pet-form__logo" />
                    <div className="pet-form__title">Форма для заповнення даних про тваринку</div>
                </div>

                <form className="pet-form__form" method="post">
                    <div className="pet-form__form-content">
                        <div className="pet-form-ua">
                            <div className="pet-form-ua__title">Дані до першочергового заповнення:</div>

                            <input
                                className="pet-form-ua__input name"
                                type="text"
                                placeholder="Ім'я"
                                value={nameUa}
                                onChange={handleNameUaChange}
                            />

                            <div className="pet-form-ua__checkboxes type">
                                <label htmlFor="dog">
                                    <p>Пес</p>
                                    <input
                                        type="checkbox"
                                        name="dog"
                                        id="dog"
                                        checked={isDogChecked}
                                        onChange={() => setIsDogChecked(!isDogChecked)}
                                        disabled={isCatChecked ? true : false}
                                    />
                                    <span></span>
                                </label>

                                <label htmlFor="cat">
                                    <p>Кіт</p>
                                    <input
                                        type="checkbox"
                                        name="cat"
                                        id="cat"
                                        checked={isCatChecked}
                                        onChange={() => setIsCatChecked(!isCatChecked)}
                                        disabled={isDogChecked ? true : false}
                                    />
                                    <span></span>
                                </label>
                            </div>

                            <div className="pet-form-ua__checkboxes gender">
                                <label htmlFor="girl">
                                    <p>Дівчинка</p>
                                    <input
                                        type="checkbox"
                                        name="girl"
                                        id="girl"
                                        checked={isGirlChecked}
                                        onChange={() => setIsGirlChecked(!isGirlChecked)}
                                        disabled={isBoyChecked ? true : false}
                                    />
                                    <span></span>
                                </label>

                                <label htmlFor="boy">
                                    <p>Хлопчик</p>
                                    <input
                                        type="checkbox"
                                        name="boy"
                                        id="boy"
                                        checked={isBoyChecked}
                                        onChange={() => setIsBoyChecked(!isBoyChecked)}
                                        disabled={isGirlChecked ? true : false}
                                    />
                                    <span></span>
                                </label>
                            </div>

                            <div className="pet-form-ua__input-age">
                                <label htmlFor="year">
                                    <input
                                        type="number"
                                        name="year"
                                        id="year"
                                        placeholder="Вік"
                                        value={years}
                                        onChange={handleYearChange}
                                    />
                                    <p>років</p>
                                </label>

                                <label htmlFor="month">
                                    <input
                                        type="number"
                                        name="month"
                                        id="month"
                                        value={month}
                                        onChange={handleMonthChange}
                                    />
                                    <p>місяців</p>
                                </label>
                            </div>

                            <input
                                className="pet-form-ua__input breed"
                                type="text"
                                placeholder="Порода"
                                value={breedUa}
                                onChange={handleBreedUaChange}
                                readOnly={noBreedChecked}
                            />

                            <abbr title="позначивши це, поле &quot;порода&quot; не потребує заповнення">
                                <div className="pet-form-ua__checkboxes breed">
                                    <label htmlFor="nobreed">
                                        <p>Без породи</p>

                                        <input
                                            type="checkbox"
                                            name="nobreed"
                                            id="nobreed"
                                            checked={noBreedChecked}
                                            onChange={() => setNoBreedChecked(!noBreedChecked)}
                                            disabled={breedUa !== '' ? true : false}
                                        />
                                        <span></span>
                                    </label>
                                </div>
                            </abbr>

                            <div className="pet-form-ua__input-size">
                                <label htmlFor="size">
                                    <input
                                        type="number"
                                        name="size"
                                        id="size"
                                        placeholder="Розмір"
                                        value={size}
                                        onChange={handleSizeChange}
                                    />
                                    <p>см</p>
                                </label>
                            </div>

                            <input
                                className="pet-form-ua__input color"
                                type="text"
                                placeholder="Забарвлення"
                                value={colorUa}
                                onChange={handleColorUaChange}
                            />

                            <input
                                className="pet-form-ua__input personality"
                                type="text"
                                placeholder="Характер"
                                value={personalityUa}
                                onChange={handlePersonalityUaChange}
                            />


                            <div className="pet-form-ua__checkboxes sterilized">
                                <label htmlFor="sterilized">
                                    <p>Стерилізований(-а)</p>
                                    <input
                                        type="checkbox"
                                        name="sterilized"
                                        id="sterilized"
                                        checked={isSterilizationChecked}
                                        onChange={() => setIsSterilizationChecked(!isSterilizationChecked)}
                                    />
                                    <span></span>
                                </label>
                            </div>

                            <div className="pet-form-ua__checkboxes treatment">
                                <label htmlFor="treatment">
                                    <p>Потребує лікування</p>
                                    <input
                                        type="checkbox"
                                        name="treatment"
                                        id="treatment"
                                        checked={isTreatmentChecked}
                                        onChange={() => setIsTreatmentChecked(!isTreatmentChecked)}
                                    />
                                    <span></span>
                                </label>
                            </div>

                            <textarea
                                className="pet-form-ua__textarea"
                                id="description"
                                placeholder="Короткий опис"
                                value={storyUa}
                                onChange={handleStoryUaChange}>
                            </textarea>

                            <div className="pet-form__files">
                                <label htmlFor="pet-image" className="pet-form__files-lable">Завантажити фото</label>
                                <input
                                    type="file"
                                    name="pet-image"
                                    id="pet-image"
                                    className="pet-form__files-input"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="pet-form__images">
                                {images.map((image: any, index: number) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Фото ${index + 1}`}
                                        className="pet-form__image"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="pet-form-en">
                            <div className="pet-form-en__title">Дані, які потребують перекладу: </div>

                            <input
                                className="pet-form-en__input name"
                                type="text"
                                placeholder="Name"
                                value={nameEn}
                                onChange={handleNameEnChange}
                            />

                            <input
                                className="pet-form-en__input breed"
                                type="text"
                                placeholder="Breed"
                                value={breedEn}
                                onChange={handleBreedEnChange}
                                readOnly={noBreedChecked}
                            />

                            <input
                                className="pet-form-en__input color"
                                type="text"
                                placeholder="Color"
                                value={colorEn}
                                onChange={handleColorEnChange}
                            />

                            <input
                                className="pet-form-en__input personality"
                                type="text"
                                placeholder="Personality"
                                value={personalityEn}
                                onChange={handlePersonalityEnChange}
                            />

                            <textarea
                                className="pet-form-en__textarea"
                                id="description"
                                placeholder="Short description"
                                value={storyEn}
                                onChange={handleStoryEnChange}>
                            </textarea>
                        </div>
                    </div>

                    <div className="pet-form__add-btn">
                        <button type="button" onClick={saveContact}>
                            <FontAwesomeIcon icon={faPlus} className="pet-form__add-btn-logo" />

                            <p>додати</p>
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}