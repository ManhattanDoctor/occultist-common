import { ITraceable } from '@ts-core/common';
import { User } from '../../user';
import { CoinStatusGetDtoResponse } from '../coin';

export interface IInitDto extends ITraceable { }

export interface IInitDtoResponse extends CoinStatusGetDtoResponse{
    user: User;
}
