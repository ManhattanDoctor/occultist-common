import { ITraceable } from '@ts-core/common';
import { User } from '../../user';
import { CoinAccounts } from '../../coin';
import { CoinBonusDto } from '../coin';

export interface IInitDto extends ITraceable { }

export interface IInitDtoResponse {
    user: User;
    bonus: CoinBonusDto;
    balances: CoinAccounts;
}
