import { ITraceable } from '@ts-core/common';
import { User } from '../../user';
import { IPaymentBonus } from '../../payment';

export interface IInitDto extends ITraceable { }

export interface IInitDetails {
    isFirstLogin?: boolean;
    paymentBonuses?: Array<IPaymentBonus>;
}

export interface IInitDtoResponse {
    user: User;
    details: IInitDetails;
}
