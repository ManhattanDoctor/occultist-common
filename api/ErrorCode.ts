import { ExtendedError } from '@ts-core/common/error';

export enum ErrorCode {
    TAROT_SPREAD_EXCEED = 'TAROT_SPREAD_EXCEED',
    TAROT_SPREAD_INVALID_DATE = 'TAROT_SPREAD_INVALID_DATE'
}

export class TarotSpreadInvalidDateError<T = { startDate: Date; finishDate: Date; currentDate: Date; date: Date }> extends ExtendedError<T, ErrorCode> {
    constructor(details: T) {
        super('Invalid date', ErrorCode.TAROT_SPREAD_INVALID_DATE, details);
    }
}
export class TarotSpreadExceedError<T = { startDate: Date; finishDate: Date; count: number, maxCount: number }> extends ExtendedError<T, ErrorCode> {
    constructor(details: T) {
        super('Too many spreads', ErrorCode.TAROT_SPREAD_EXCEED, details);
    }
}
