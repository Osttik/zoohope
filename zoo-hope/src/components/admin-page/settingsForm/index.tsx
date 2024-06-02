import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { ISetting } from "../../../define";
import { addSetting, getOneSetting, updateSetting } from "../../../api/settings";

interface ISettingsFormProps {
  display: string;
  hideForm: () => void;
  setSettingsTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSettingsRowIndex: null | number;
  settings: ISetting[];
  setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isEditBtnClicked: boolean;
}

export const SettingsForm = ({
  display,
  hideForm,
  setSettingsTableUpdate,
  selectedSettingsRowIndex,
  settings,
  setIsEditBtnClicked,
  isEditBtnClicked }: ISettingsFormProps) => {

  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>("");

  const [settingsData, setSettingsData] = useState<any>(null);

  const selectedSetting = selectedSettingsRowIndex !== null ? settings[selectedSettingsRowIndex] : null;
  const settingId = selectedSetting ? selectedSetting._id : null;

  const handleAddSetting = async () => {
    try {
      const isFormValid = (
        key.trim() !== '' &&
        value.trim() !== ''
      );

      if (!isFormValid) {
        return alert('Заповніть всі поля!');
      }

      const formData = {
        key: key.trim(),
        value: value.trim(),
      };

      await addSetting(formData);
      setSettingsTableUpdate((prev: boolean) => !prev);

      cleanForm();
      hideForm();
    } catch (error) {
      console.error('Error adding setting:', error);
    }
  }

  const updateFormFields = () => {
    if (settingsData) {
      setKey(settingsData.key);
      setValue(settingsData.value);
    }
  };

  const handleUpdateSetting = async () => {
    try {
      const isFormValid = (
        key.trim() !== '' &&
        value.trim() !== ''
      );

      if (!isFormValid) {
        return alert('Заповніть всі поля!');
      }

      const formData = {
        key: key.trim(),
        value: value.trim(),
      };

      if (settingId) {
        await updateSetting(formData, settingId);
      }

      setSettingsTableUpdate((prev: boolean) => !prev);

      cleanForm();
      hideForm();
      setIsEditBtnClicked(false);
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  }

  const saveSetting = () => {
    if (isEditBtnClicked === true) {
      handleUpdateSetting();
    } else {
      handleAddSetting();
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

  useEffect(() => {
    const fetchSettingData = async () => {
      if (isEditBtnClicked && selectedSettingsRowIndex !== null) {
        try {
          if (settingId) {
            const data = await getOneSetting(settingId);
            setSettingsData(data);
          }
        } catch (error) {
          console.error('Error fetch setting data:', error);
        }
      }
    };

    fetchSettingData();
  }, [isEditBtnClicked, selectedSettingsRowIndex]);

  useEffect(() => {
    updateFormFields();
  }, [settingsData]);

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
            Форма для заповнення налаштувань
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
                required
              />

              <input
                className="contacts-form-ua__input link"
                type="text"
                placeholder="Значення"
                value={value}
                onChange={handleValueChange}
                required
              />
            </div>
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