import { ILetter } from './ILetter';

export interface IConverter {
    text: string;
    number: string;
}

export type Dictionary<V extends ILetter = ILetter> = {
    [P in keyof any]: V | Array<V>;
};
