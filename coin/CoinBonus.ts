import { ICoinAmount } from "../coin";

export interface ICoinBonus extends ICoinAmount {
    type: CoinBonusType;
}

export enum CoinBonusType {
    DAILY = 'DAILY',
    REGISTRATION = 'REGISTRATION',
    VK_PROFILE_BUTTON = 'VK_PROFILE_BUTTON',
    VK_GROUP_PARTICIPATION = 'VK_GROUP_PARTICIPATION',
}