import { useTranslation } from "react-i18next";
import { ITranslateble } from "../../define";


export const Translate = (obj: ITranslateble) => {
    const { i18n } = useTranslation();

    return obj[i18n.language as string];
}