import { ITraceable } from '@ts-core/common';

export interface IPaymentBalanceEditDto extends ITraceable {
    coinId: string;
    amount: string;
    userId: number;
}

