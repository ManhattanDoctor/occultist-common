
import { Type } from 'class-transformer';
import { User } from '../user';
import { TarotSpread } from './TarotSpread';
import { TarotSpreadMeaningRejectReason, TarotSpreadMeaningStatus } from './TarotSpreadMeaning';
import * as _ from 'lodash';

export class TarotSpreadMeaningAi {
    public id: number;
    public status: TarotSpreadMeaningStatus;
    public value?: string;
    public reason?: TarotSpreadMeaningRejectReason;
    public question?: string;

    @Type(() => User)
    public user?: User;

    // @Type(() => TarotSpread)
    public spread?: TarotSpread;

    @Type(() => Date)
    public updatedDate?: Date;

    @Type(() => Date)
    public createdDate: Date;
}