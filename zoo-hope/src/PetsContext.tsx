import { createContext } from 'react';
import { IPet } from './define';

interface IPetContext {
    pets_data: IPet[];
    prevPath: string | null;
    setPrevPath: (v: string) => void;
    logErMes: string;
    setlogErMes: (v: string) => void;
}

const PetContext = createContext<IPetContext>({
    pets_data: [],
    prevPath: null,
    setPrevPath: (_: string) => {},
    logErMes: "",
    setlogErMes: (_: string) => {}
});
export default PetContext;