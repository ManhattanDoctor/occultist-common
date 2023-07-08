
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

export enum TarotSpreadMeaningStatus {
    ERROR = 'ERROR',
    PENDING = 'PENDING',
    PREPARED = 'PREPARED',
    FINISHED = 'FINISHED',
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
    UNCLEAR_QUESTION = 'UNCLEAR_QUESTION',
    INCORRECT_QUESTION = 'INCORRECT_QUESTION',
}

export const TAROT_SPREAD_MEANING_MAX_COUNT = 3;

export const TAROT_SPREAD_MEANING_QUESTION_MAX_LENGTH = 4096;

export const TAROT_SPREAD_MEANING_VALUE_MIN_LENGTH = 64;
export const TAROT_SPREAD_MEANING_VALUE_MAX_LENGTH = 4096;

export const TAROT_SPREAD_MEANING_RATING_MIN = 1;
export const TAROT_SPREAD_MEANING_RATING_MAX = 5;