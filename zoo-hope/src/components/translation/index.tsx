import { useTranslation } from "react-i18next";
import { ITranslateble } from "../../define";

interface Iprops{
    obj: ITranslateble;
}

export const Translate = (props: Iprops) => {
    if (!props.obj) return <></>;

    return <>{TranslateFunc(props.obj)}</>;
}

export const TranslateFunc = (obj: ITranslateble) => {
    const { i18n } = useTranslation();
    
    return obj[i18n.language as string];
}