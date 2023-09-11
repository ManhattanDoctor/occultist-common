import { CoinId } from '../../coin';
import { ITraceable } from '@ts-core/common';

export interface IPaymentBalanceEditDto extends ITraceable {
    coinId: CoinId;
    amount: string;
    userId: number;
}

