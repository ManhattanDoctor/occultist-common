
import { Type } from 'class-transformer';
import { User } from '../user';
import * as _ from 'lodash';

export class TarotSpreadMeaning {
    public status: TarotSpreadMeaningStatus;

    public user?: User;
    public mode?: TarotSpreadMeaningMode;
    public value?: string;
    public rating?: number;

    @Type(() => Date)
    public updatedDate?: Date;

    @Type(() => Date)
    public createdDate: Date;
}

export enum TarotSpreadMeaningStatus {
    ERROR = 'ERROR',
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    IN_PROGRESS = 'IN_PROGRESS',
}

export enum TarotSpreadMeaningMode {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC',
    AUTOMATIC_MANUAL = 'AUTOMATIC_MANUAL',
}

export const TAROT_SPREAD_MEANING_MIN_LENGTH = 64;
export const TAROT_SPREAD_MEANING_MAX_LENGTH = 8192;
