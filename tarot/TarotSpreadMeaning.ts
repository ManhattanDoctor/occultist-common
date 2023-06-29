
import { Type } from 'class-transformer';
import { User } from '../user';
import * as _ from 'lodash';
import { TarotSpread } from './TarotSpread';

export class TarotSpreadMeaning {
    public id: number;
    public status: TarotSpreadMeaningStatus;

    public mode?: TarotSpreadMeaningMode;
    public value?: string;
    public rating?: number;
    public reason?: TarotSpreadMeaningRejectReason;

    @Type(() => User)
    public user?: User;

    @Type(() => TarotSpread)
    public spread?: TarotSpread;

    @Type(() => Date)
    public updatedDate?: Date;

    @Type(() => Date)
    public createdDate: Date;
}

export enum TarotSpreadMeaningStatus {
    ERROR = 'ERROR',
    PENDING = 'PENDING',
    PREPARED = 'PREPARED',
    FINISHED = 'COMPLETE',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    AWAITING = 'AWAITING',
    IN_PROGRESS = 'IN_PROGRESS',
}

export enum TarotSpreadMeaningMode {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC',
    AUTOMATIC_MANUAL = 'AUTOMATIC_MANUAL',
}

export enum TarotSpreadMeaningRejectReason {
    UNCLEAR = 'UNCLEAR',
    INCORRECT = 'INCORRECT',
    UNREADABLE = 'UNREADABLE'
}


export const TAROT_SPREAD_MEANING_MIN_LENGTH = 64;
export const TAROT_SPREAD_MEANING_MAX_LENGTH = 8192;
