import { Type } from 'class-transformer';
import { User } from '../user';
import { CoinId, ICoinAmount } from '../coin';
import { PaymentAccountId } from './Payment';

export class PaymentTransaction implements ICoinAmount {
    id: number;
    type: PaymentTransactionType;
    debet: PaymentAccountId;
    credit: PaymentAccountId;
    amount: string;
    coinId: CoinId;
    userId: number;

    itemId?: number;
    itemType?: PaymentTransactionItemType;

    @Type(() => Date)
    createdDate: Date;

    paymentId?: number;

    @Type(() => Date)
    activatedDate?: Date;
}

export enum PaymentTransactionItemType {
    TAROT_SPREAD = 'TAROT_SPREAD'
}

export enum PaymentTransactionType {
    REFUND = 'REFUND',
    PURCHASE = 'PURCHASE',
    CORRECTION = 'CORRECTION',
    DAILY_BONUS = 'DAILY_BONUS',
    DONATER_BONUS = 'DONATER_BONUS',
    REGISTRATION_BONUS = 'REGISTRATION_BONUS',
    TAROT_SPREAD_MEANING_BONUS = 'TAROT_SPREAD_MEANING_BONUS',
    TAROT_SPREAD_MEANING_PURCHASE = 'TAROT_SPREAD_MEANING_PURCHASE',
    TAROT_SPREAD_MEANING_AI_PURCHASE = 'TAROT_SPREAD_MEANING_AI_PURCHASE'
}
