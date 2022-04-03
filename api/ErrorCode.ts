import { ExtendedError } from '@ts-core/common/error';

export enum ErrorCode {
    TAROT_SPREAD_EXCEED = 'TAROT_SPREAD_EXCEED',
    TAROT_SPREAD_INVALID_DATE = 'TAROT_SPREAD_INVALID_DATE'
}

export class TarotSpreadInvalidDateError<T = { startDate: Date; finishDate: Date; currentDate: Date; date: Date }> extends ExtendedError<T, ErrorCode> {
    constructor(details: T) {
        super('TarotSpreadInvalidDateError', ErrorCode.TAROT_SPREAD_INVALID_DATE, details);
    }
}
export class TarotSpreadExceedError<T = { count: number, maxCount: number }> extends ExtendedError<T, ErrorCode> {
    constructor(details: T) {
        super('TarotSpreadExceedError', ErrorCode.TAROT_SPREAD_EXCEED, details);
    }
}
