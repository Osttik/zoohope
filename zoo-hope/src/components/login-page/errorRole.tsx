import { useContext } from 'react';
import '../../styles/errorsLogMes/errorRole.scss'
import PetContext from '../../PetsProvider';
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
export const ErrorRoleMes = ({ text }: { text: string }) => {
    const { t } = useTranslation();
    const { setlogErMes } = useContext(PetContext);
    return (
        <div className="errorRoleMes">
            <div className='errorRoleMesT'>
                <span className='errorRoleMesTpan'>{t('error')} ⚠︎</span>
            </div>
            <div className='errorRoleMesM'>
                <span className='errorRoleMesMpan'>{text}</span>
            </div>
            <div className='errorRoleMesB'>
                <div className='errorRoleMesBimag'></div>
                <button onClick={() => { setlogErMes("") }} type='button' className='button-85'>{t('ok')}</button>
            </div>
        </div>
    )


}