import { ITraceable } from '@ts-core/common';
import { User } from '../../user';
import { IPaymentBonus } from '../../payment';
import { CoinAccounts } from '../../coin';
import { Type } from 'class-transformer';

export interface IInitDto extends ITraceable { }

export class InitDetails {
    balances: CoinAccounts;
    isFirstLogin?: boolean;
    paymentBonuses?: Array<IPaymentBonus>;

    @Type(() => Date)
    paymentBonusNextDate?: Date;
}

export interface IInitDtoResponse {
    user: User;
    details: InitDetails;
}
