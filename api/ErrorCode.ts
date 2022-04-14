import { ExtendedError } from '@ts-core/common/error';

export enum ErrorCode {
    INVALID_REQUEST = 'INVALID_REQUEST',

    COMMENT_FORBIDDEN = 'COMMENT_FORBIDDEN',

    TAROT_SPREAD_EXCEED = 'TAROT_SPREAD_EXCEED',
    TAROT_SPREAD_FORBIDDEN = 'TAROT_SPREAD_FORBIDDEN',
    TAROT_SPREAD_NOT_FOUND = 'TAROT_SPREAD_NOT_FOUND',
    TAROT_SPREAD_INVALID_DATE = 'TAROT_SPREAD_INVALID_DATE'
}

// --------------------------------------------------------------------------
//
//  Common
//
// --------------------------------------------------------------------------

export class CoreExtendedError<T = void> extends ExtendedError<T, ErrorCode> {
    constructor(code: ErrorCode, details?: T, public status?: number) {
        super('', code, details);
        this.message = this.constructor.name;
    }
}

export class RequestInvalidError<T> extends CoreExtendedError<IInvalidValue<T>> {
    constructor(details: IInvalidValue<T>) {
        super(ErrorCode.INVALID_REQUEST, details, ExtendedError.HTTP_CODE_BAD_REQUEST);
    }
}

// --------------------------------------------------------------------------
//
//  Interfaces
//
// --------------------------------------------------------------------------

interface IInvalidValue<T = any> {
    name?: string;
    value: T | Array<T>;
    expected?: T | Array<T>;
}

// --------------------------------------------------------------------------
//
//  Tarot
//
// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------
//
//  Commnet
//
// --------------------------------------------------------------------------

export class CommentForbiddenError extends ExtendedError<void, ErrorCode> {
    constructor() {
        super('CommentForbiddenError', ErrorCode.TAROT_SPREAD_FORBIDDEN);
    }
}
