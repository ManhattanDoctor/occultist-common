import { ExtendedError } from '@ts-core/common/error';

export enum ErrorCode {
    TAROT_SPREAD_EXCEED = 'TAROT_SPREAD_EXCEED',
    TAROT_SPREAD_FORBIDDEN = 'TAROT_SPREAD_FORBIDDEN',
    TAROT_SPREAD_NOT_FOUND = 'TAROT_SPREAD_NOT_FOUND',
    TAROT_SPREAD_INVALID_DATE = 'TAROT_SPREAD_INVALID_DATE'
}

export class TarotSpreadNotFoundError extends ExtendedError<void, ErrorCode> {
    constructor() {
        super('TarotSpreadNotFoundError', ErrorCode.TAROT_SPREAD_NOT_FOUND);
    }
}
export class TarotSpreadForbiddenError extends ExtendedError<void, ErrorCode> {
    constructor() {
        super('TarotSpreadForbiddenError', ErrorCode.TAROT_SPREAD_FORBIDDEN);
    }
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
