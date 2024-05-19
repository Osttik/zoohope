import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import { SetStateAction, useEffect, useState } from "react";
import { addAdmin } from "../../../api/admins";
import { editAdmin } from "../../../api/admins";
import { getOneAdmin } from "../../../api/admins";
import { IAdmin } from "../../../define";

interface IAdminFormProps {
    display: string;
    hideForm: () => void;
    setAdminTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    isEditBtnClicked: boolean;
    selectedAdminsRowIndex: null | number;
    admins: IAdmin[];
    setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminForm = ({ display, hideForm, setAdminTableUpdate, isEditBtnClicked, selectedAdminsRowIndex, admins, setIsEditBtnClicked }: IAdminFormProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const [adminData, setAdminData] = useState<any>(null);

    const selectedAdmin = selectedAdminsRowIndex !== null ? admins[selectedAdminsRowIndex] : null;
    const adminId = selectedAdmin ? selectedAdmin._id : null;

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleAddAdmin = async () => {
        try {
            const isFormValid = (
                name.trim() !== '' &&
                email.trim() !== '' &&
                password.trim() !== '' && 
                role !== ''
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
                name: capitalizeFirstLetter(name.trim()),
                email: email.trim(),
                password: password.trim(),
                role: role,
            }

            await addAdmin(formData);
            setAdminTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();

        } catch (error) {
            console.error('Error adding admin:', error);
        }
    }

    const updateFormFields = () => {
        if (adminData) {
            setName(adminData.name);
            setEmail(adminData.email);
            setPassword(adminData.password);
            setRole(adminData.role);
        }
    };

    const handleEditAdmin = async () => {
        try {
            const isFormValid = (
                name.trim() !== '' &&
                email.trim() !== '' &&
                password.trim() !== '' &&
                role !== ''
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
                name: capitalizeFirstLetter(name.trim()),
                email: email.trim(),
                password: password.trim(),
                role: role,
            }

            if (adminId) {
                await editAdmin(formData, adminId);
            }
            setAdminTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();
            setIsEditBtnClicked(false);

        } catch (error) {
            console.error('Error editing admin:', error);
        }
    };

    const saveAdmin = () => {
        if (isEditBtnClicked === true) {
            handleEditAdmin();
        } else {
            handleAddAdmin();
        }
    }

    const cleanForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
    }

    const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setRole(e.target.value); 
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            if (isEditBtnClicked && selectedAdminsRowIndex !== null) {
                try {
                    if (adminId) {
                        const data = await getOneAdmin(adminId);
                        setAdminData(data);
                    }
                } catch (error) {
                    console.error('Error fetch admin data:', error);
                }
            }
        };

        fetchAdminData();
    }, [isEditBtnClicked, selectedAdminsRowIndex]);

    useEffect(() => {
        updateFormFields();
    }, [adminData]);

    return (
        <div className="admin-form" style={{ display: display }}>
            <div className="admin-form__container">
                <div className="admin-form__close-btn">
                    <button onClick={() => { hideForm(); cleanForm(); setIsEditBtnClicked(false) }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="admins-form__header">
                    <img src={Logo} alt="zoonadiya-logo" className="admins-form__logo" />
                    <div className="admins-form__title">Форма для стверення адміна</div>
                </div>

                <form className="admins-form__form" action="/" method="post">
                    <div className="admins-form__form-content">
                        <div className="admins-form-ua">
                            <div className="admins-form-ua__title">Дані до першочергового заповнення:</div>

                            <input
                                className="admins-form-ua__input name"
                                type="text"
                                placeholder="І'мя"
                                value={name}
                                onChange={handleNameChange}
                            />

                            <input
                                className="admins-form-ua__input email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />

                            <input
                                className="admins-form-ua__input password"
                                type="text"
                                placeholder="Пароль"
                                value={password}
                                onChange={handlePasswordChange}
                            />

                            <label htmlFor="role" className="admins-form__roles"><p>Оберіть роль:</p>
                                <select name="role" id="role" value={role} onChange={handleRoleChange}>
                                    <option value="">--Будь ласка оберіть роль--</option>
                                    <option value="admin">адмін</option>
                                    <option value="super-admin">супер-адмін</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="admins-form__add-btn">
                        <button type="button" onClick={saveAdmin}>
                            <FontAwesomeIcon icon={faPlus} className="admins-form__add-btn-logo" />

                            <p>додати</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}