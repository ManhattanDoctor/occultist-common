import { TarotSpread } from "../../../tarot";

export interface ITarotSpreadShowcaseDto {
    uid: string;
    action: TarotSpreadShowcaseAction;
}

export type ITarotSpreadShowcaseDtoResponse = TarotSpread;

export enum TarotSpreadShowcaseAction {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}