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
    images: string[];
    sex: string;
    age: number;
    size: string;
    breed: ITranslateble;
    color: ITranslateble;
    sterilization: string;
    treatment: string;
    adopted: string;
    timeAdopted: string;
    personality: ITranslateble;
    story: ITranslateble;
}

export interface IHelpOption extends IIdentity {
    name: ITranslateble,
    description: ITranslateble
}

// IContact has optional fields because there's two types of contacts: 
// contacts (name + value + url <- Optional. Should be used if icon is missing), for example Email <-"name": email@email.com <-"value"; 
// social media (name + url + icon), for exampe link to facebook through fb logo
export interface IContact extends IIdentity {
    name: ITranslateble,
    url?: string;
    icon?: string;
    value?: string;
}

export interface IAdmin extends IIdentity {
    name: string;
    email: string;
    password: string;
    role: string;
}