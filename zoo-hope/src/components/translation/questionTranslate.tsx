import { useTranslation } from "react-i18next";
import { ITranslatebleQuestions } from "../../define";
import { i18n } from "i18next";

interface Iprops{
    obj: ITranslatebleQuestions;
}

export const TranslateQuestions = (props: Iprops) => {
    const { i18n } = useTranslation();
    if (!props.obj) return <></>;

    return <>{TranslateFunc(props.obj, i18n)}</>;
}

export const TranslateFunc = (obj: ITranslatebleQuestions, i18n: i18n) => {
    return obj[i18n.language as string];
}