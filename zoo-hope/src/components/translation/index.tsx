import { useTranslation } from "react-i18next";
import { ITranslateble } from "../../define";

interface Iprops{
    obj: ITranslateble;
}

export const Translate = (props: Iprops) => {
    const { i18n } = useTranslation();

    return <>{props.obj[i18n.language as string]}</>
}