import { useTranslation } from "react-i18next";
import { ITranslateble } from "../../define";
import { i18n } from "i18next";

interface Iprops{
    obj: ITranslateble;
}

export const Translate = (props: Iprops) => {
    const { i18n } = useTranslation();
    if (!props.obj) return <></>;

    return <>{TranslateFunc(props.obj, i18n)}</>;
}

export const TranslateFunc = (obj: ITranslateble, i18n: i18n) => {
    return obj[i18n.language as string];
}