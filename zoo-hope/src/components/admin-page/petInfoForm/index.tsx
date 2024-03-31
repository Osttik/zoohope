import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../../../images/logo/logo.png"

export const PetInfoForm = ({ display, hideForm }: any) => {
    return (
        <div className="pet-form" style={{ display: display }}>
            <div className="pet-form__container">
                <div className="pet-form__close-btn">
                    <button onClick={hideForm}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="pet-form__header">
                    <img src={Logo} alt="zoonadiya-logo" className="pet-form__logo" />
                    <div className="pet-form__title">Форма для заповнення даних про тваринку</div>
                </div>

                <form className="pet-form__form" action="/" method="post">
                    <div className="pet-form__form-content">
                        <div className="pet-form-ua">
                            <div className="pet-form-ua__title">Дані до першочергового заповнення:</div>

                            <input className="pet-form-ua__input name" type="text" placeholder="Ім'я" />

                            <div className="pet-form-ua__checkboxes type">
                                <label htmlFor="dog">
                                    <p>Пес</p>
                                    <input type="checkbox" name="dog" id="dog" />
                                    <span></span>
                                </label>

                                <label htmlFor="cat">
                                    <p>Кіт</p>
                                    <input type="checkbox" name="cat" id="cat" />
                                    <span></span>
                                </label>
                            </div>

                            <div className="pet-form-ua__checkboxes gender">
                                <label htmlFor="girl">
                                    <p>Дівчинка</p>
                                    <input type="checkbox" name="girl" id="girl" />
                                    <span></span>
                                </label>

                                <label htmlFor="boy">
                                    <p>Хлопчик</p>
                                    <input type="checkbox" name="boy" id="boy" />
                                    <span></span>
                                </label>
                            </div>

                            <div className="pet-form-ua__input-age">
                                <label htmlFor="year">
                                    <input type="number" name="year" id="year" placeholder="Вік" />
                                    <p>років</p>
                                </label>

                                <label htmlFor="month">
                                    <input type="number" name="month" id="month" />
                                    <p>місяців</p>
                                </label>
                            </div>

                            <input className="pet-form-ua__input breed" type="text" placeholder="Порода" />

                            <div className="pet-form-ua__checkboxes breed">
                                <label htmlFor="nobreed">
                                    <p>Без породи</p>
                                    <input type="checkbox" name="nobreed" id="nobreed" />
                                    <span></span>
                                </label>
                            </div>

                            <div className="pet-form-ua__input-size">
                                <label htmlFor="size">
                                    <input type="number" name="size" id="size" placeholder="Розмір" />
                                    <p>см</p>
                                </label>
                            </div>

                            <input className="pet-form-ua__input color" type="text" placeholder="Забарвлення" />

                            <input className="pet-form-ua__input personality" type="text" placeholder="Характер" />


                            <div className="pet-form-ua__checkboxes sterilized">
                                <label htmlFor="sterilized">
                                    <p>Стерилізований(-а)</p>
                                    <input type="checkbox" name="sterilized" id="sterilized" />
                                    <span></span>
                                </label>
                            </div>

                            <div className="pet-form-ua__checkboxes treatment">
                                <label htmlFor="treatment">
                                    <p>Потребує лікування</p>
                                    <input type="checkbox" name="treatment" id="treatment" />
                                    <span></span>
                                </label>
                            </div>

                            <textarea className="pet-form-ua__textarea" id="description" placeholder="Короткий опис"></textarea>
                        </div>

                        <div className="pet-form-en">
                            <div className="pet-form-en__title">Дані, які потребують перекладу: </div>

                            <input className="pet-form-en__input name" type="text" placeholder="Name" />

                            <input className="pet-form-en__input breed" type="text" placeholder="Breed" />

                            <input className="pet-form-en__input color" type="text" placeholder="Color" />

                            <input className="pet-form-en__input personality" type="text" placeholder="Personality" />

                            <textarea className="pet-form-en__textarea" id="description" placeholder="Short description"></textarea>
                        </div>
                    </div>

                    <button type="submit" className="pet-form__add-btn">
                        <FontAwesomeIcon icon={faPlus} className="pet-form__add-btn-logo" />

                        <p>додати</p>
                    </button>
                </form>
            </div>
        </div>
    )
}