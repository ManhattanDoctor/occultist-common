import { ICoinAmount } from "../coin";

export interface IPaymentBonus extends ICoinAmount {
    type: PaymentBonusType;
}

export enum PaymentBonusType {
    DAILY = 'DAILY',
    REGISTRATION = 'REGISTRATION',
}