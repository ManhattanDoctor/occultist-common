
import { Type } from 'class-transformer';
import { TarotSpread } from './TarotSpread';
import { TarotSpreadMeaningRejectReason } from './TarotSpreadMeaning';
import * as _ from 'lodash';

export class TarotSpreadMeaningAi {
    public id: number;
    public status: TarotSpreadMeaningAiStatus;
    public value?: string;
    public reason?: TarotSpreadMeaningRejectReason;
    public question?: string;
    public conversationId?: number;

    // @Type(() => TarotSpread)
    public spread?: TarotSpread;

    @Type(() => Date)
    public updatedDate?: Date;

    @Type(() => Date)
    public createdDate: Date;
}

export enum TarotSpreadMeaningAiStatus {
    ERROR = 'ERROR',
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
    IN_PROGRESS = 'IN_PROGRESS',
}

export const TAROT_SPREAD_MEANING_AI_QUESTION_MAX_LENGTH = 4096;

export const TAROT_SPREAD_MEANING_AI_VALUE_MIN_LENGTH = 1;
export const TAROT_SPREAD_MEANING_AI_VALUE_MAX_LENGTH = 16384;