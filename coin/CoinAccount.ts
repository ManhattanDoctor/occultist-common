import { Type } from 'class-transformer';
import { CoinId, ICoinAmount } from './CoinId';

export class CoinAccount implements ICoinAmount {
    id: number;
    amount: string;
    coinId: CoinId;
    userId: number;

    @Type(() => Date)
    createdDate: Date;

    @Type(() => Date)
    updatedDate: Date;
}

export type CoinAccounts = {
    [key in CoinId]: string;
}