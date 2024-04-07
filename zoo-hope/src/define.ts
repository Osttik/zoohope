export interface ITranslateble {
    [key: string]: string;
    en: string;
    ua: string;
}

interface IIdentity {
    _id: string;
}

export interface IPet extends IIdentity {
    name: ITranslateble,
    type: string;
    image: string;
    sex: string;
    age: number;
    size: string;
    breed: string;
    color: string;
    sterilization: boolean;
    treatment: boolean;
    personality: ITranslateble;
    story: ITranslateble;
}

export interface IHelpOption extends IIdentity {
    name: ITranslateble,
    description: ITranslateble
}

export interface IContact extends IIdentity {
    name: ITranslateble,
    url: string;
    icon: string;
}