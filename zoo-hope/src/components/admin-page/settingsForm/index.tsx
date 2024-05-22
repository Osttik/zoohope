import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";

interface ISettingsFormProps {
    display: string;
    hideForm: () => void;
    setSettingsTableUpdate: any;
    selectedSettingsRowIndex: null | number;
    settings: any;
    setIsEditBtnClicked: any;
    isEditBtnClicked: boolean;
}

export const SettingsForm = ({ display, hideForm, setSettingsTableUpdate, selectedSettingsRowIndex, settings, setIsEditBtnClicked, isEditBtnClicked }: ISettingsFormProps) => {
    const [key, setKey] = useState<string>('');
    const [value, setValue] = useState<string>("");

    const [settingsData, setSettingsData] = useState<any>(null);

    const selectedSetting = selectedSettingsRowIndex !== null ? settings[selectedSettingsRowIndex] : null;
    const settingId = selectedSetting ? selectedSetting._id : null;

    const fetchSettingsData = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/get-setting/${id}`);
            setSettingsData(response.data);
        } catch (error) {
            console.error('Error fetching contacts data:', error);
        }
    };

    const updateFormFields = () => {
        if (settingsData) {
            setKey(settingsData.key);
            setValue(settingsData.value);
        }
    };

    useEffect(() => {
        if (isEditBtnClicked && selectedSettingsRowIndex !== null) {
            fetchSettingsData(settingId);
        }
    }, [isEditBtnClicked, selectedSettingsRowIndex]);

    useEffect(() => {
        updateFormFields();
    }, [settingsData]);


    // const handleSettingsFileChange = (event: any) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const fileURL = URL.createObjectURL(file);
    //         setImage(fileURL);
    //     }
    // };

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const addSetting = async () => {
        try {
            const isFormValid = (
                key.trim() !== '' &&
                value.trim() !== '' 
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
              key: capitalizeFirstLetter(key.trim()),
              value: capitalizeFirstLetter(value.trim()),
            };

            const response = await axios.post('http://localhost:5000/add-setting', formData);
            setSettingsTableUpdate((prev: boolean) => !prev);
            
            cleanForm();
            hideForm();

            console.log('Setting added successfully:', response.data);
        } catch (error) {
            console.error('Error adding setting:', error);
        }
    }

    const updateSetting = async () => {
        try {
            const isFormValid = (
                key.trim() !== '' &&
                value.trim() !== '' 
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
              key: capitalizeFirstLetter(key.trim()),
              value: capitalizeFirstLetter(value.trim()),
            };

            const response = await axios.put(`http://localhost:5000/update-setting/${settingId}`, formData);
            setSettingsTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();
            setIsEditBtnClicked(false);

            console.log('Setting updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating setting:', error);
        }
    }

    const saveSetting = () => {
        if (isEditBtnClicked === true) {
            updateSetting();
        } else {
            addSetting();
        }
    }

    const handleKeyChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setKey(e.target.value);
    };

    const handleValueChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };

    const cleanForm = () => {
        setKey('');
        setValue('');
    }
    return (
      <div className="contacts-form" style={{ display: display }}>
        <div className="contacts-form__container">
          <div className="contacts-form__close-btn">
            <button
              onClick={() => {
                hideForm();
                cleanForm();
                setIsEditBtnClicked(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="contacts-form__header">
            <img
              src={Logo}
              alt="zoonadiya-logo"
              className="contacts-form__logo"
            />
            <div className="contacts-form__title">
              Форма для заповнення контактних даних
            </div>
          </div>

          <form className="contacts-form__form" action="/" method="post">
            <div className="contacts-form__form-content">
              <div className="contacts-form-ua">
                <div className="contacts-form-ua__title">
                  Дані до першочергового заповнення:
                </div>

                <input
                  className="contacts-form-ua__input name"
                  type="text"
                  placeholder="Ключ"
                  value={key}
                  onChange={handleKeyChange}
                />

                <input
                  className="contacts-form-ua__input link"
                  type="text"
                  placeholder="Значення"
                  value={value}
                  onChange={handleValueChange}
                />

                {/* <div className="contacts-form-ua__icon">
                  <p className="contacts-form-ua__icon-title">Додати іконку:</p>

                  <p className="contacts-form-ua__icon-caption">
                    Виберіть одне з двох:
                  </p>
                </div>

                <input
                  className="contacts-form-ua__input link"
                  type="text"
                  placeholder="Додати посилання"
                  value={iconUrl}
                  onChange={handleIconUrlChange}
                /> */}

                {/* <p className="contacts-form-ua__icon-caption">або</p>

                <div className="contacts-form__files">
                  <label
                    htmlFor="contact-image"
                    className="contacts-form__files-lable"
                  >
                    Завантажити фото
                  </label>
                  <input
                    type="file"
                    name="contact-image"
                    id="contact-image"
                    className="contacts-form__files-input"
                    accept="image/*"
                    onChange={handleSettingsFileChange}
                  />
                </div> */}
{/* 
                <div className="contacts-form__images">
                  {image && (
                    <img
                      src={image}
                      alt="лого"
                      className="contacts-form__image"
                    />
                  )}
                </div> */}
              </div>

              {/* <div className="contacts-form-en">
                <div className="contacts-form-en__title">
                  Дані, які потребують перекладу:{" "}
                </div>

                <input
                  className="contacts-form-en__input name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div> */}
            </div>

            <div className="contacts-form__add-btn">
              <button type="button" onClick={saveSetting}>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="contacts-form__add-btn-logo"
                />
                <p>додати</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}