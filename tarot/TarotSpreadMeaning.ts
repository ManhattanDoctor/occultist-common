
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
    CANCELED = 'CANCELED',
    REJECTED = 'REJECTED',
    AWAITING = 'AWAITING',
    IN_PROGRESS = 'IN_PROGRESS',
    WAITING_APPROVE = 'WAITING_APPROVE',
}

export enum TarotSpreadMeaningMode {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC',
    AUTOMATIC_MANUAL = 'AUTOMATIC_MANUAL',
}

export enum TarotSpreadMeaningRejectReason {
    UNCLEAR_QUESTION = 'UNCLEAR_QUESTION',
    RECURRING_QUESTION = 'RECURRING_QUESTION',
    INCORRECT_QUESTION = 'INCORRECT_QUESTION',
    INCONSEQUENTIAL_QUESTION = 'INCONSEQUENTIAL_QUESTION',
    INCORRECT_QUESTION_FOR_SPREAD = 'INCORRECT_QUESTION_FOR_SPREAD',
}

export const TAROT_SPREAD_MEANING_MAX_COUNT = 1;

export const TAROT_SPREAD_MEANING_RATING_MIN = 1;
export const TAROT_SPREAD_MEANING_RATING_MAX = 5;

export const TAROT_SPREAD_MEANING_QUESTION_MAX_LENGTH = 4096;

export const TAROT_SPREAD_MEANING_VALUE_MIN_LENGTH = 64;
export const TAROT_SPREAD_MEANING_VALUE_MAX_LENGTH = 16384;