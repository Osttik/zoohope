import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

export function HelpPet() {
    const { t } = useTranslation();

    return (
        <div className="endPetBlock">
            <div className="extraHelpBlock">
                <div className="helpTextBlock">{t('how_to_help+')}</div>
                <button className="extraHelpBut">1</button>
                <button className="extraHelpBut">2</button>
                <div className="logExtraHelp"></div>
                <button className="extraHelpBut">3</button>
                <button className="extraHelpBut">4</button>
            </div>
            <div className="arDown"> <span></span><span></span><span></span></div>
        </div>
    );
}