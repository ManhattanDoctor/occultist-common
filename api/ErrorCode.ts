import { FilterableConditionType } from "@ts-core/common";
import { PaymentTransactionType } from "../payment";
import { CoinId } from "../coin";

export enum ErrorCode {
    REQUEST_INVALID = 'REQUEST_INVALID',
    INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
    LOCALE_PROJECT_NOT_FOUND = 'LOCALE_PROJECT_NOT_FOUND',

    LOGIN_ID_INVALID = 'LOGIN_ID_INVALID',
    LOGIN_TOKEN_INVALID = 'LOGIN_TOKEN_INVALID',
    LOGIN_TOKEN_EXPIRED = 'LOGIN_TOKEN_EXPIRED',
    LOGIN_SIGNATURE_INVALID = 'LOGIN_SIGNATURE_INVALID',

    USER_UNDEFINED = 'USER_UNDEFINED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_ACCOUNT_INVALID = 'USER_ACCOUNT_INVALID',
    USER_STATUS_INVALID = 'USER_STATUS_INVALID',

    COMMENT_DISABLED = 'COMMENT_DISABLED',
    COMMENT_NOT_FOUND = 'COMMENT_NOT_FOUND',
    COMMENT_FORBIDDEN = 'COMMENT_FORBIDDEN',

    TELEGRAM_ACCOUNT_NOT_FOUND = 'TELEGRAM_ACCOUNT_NOT_FOUND',
    TELEGRAM_ACCOUNT_SIGNATURE_INVALID = 'TELEGRAM_ACCOUNT_SIGNATURE_INVALID',

    TAROT_SPREAD_FORBIDDEN = 'TAROT_SPREAD_FORBIDDEN',
    TAROT_SPREAD_NOT_FOUND = 'TAROT_SPREAD_NOT_FOUND',
    TAROT_SPREAD_INVALID_DATE = 'TAROT_SPREAD_INVALID_DATE',
    TAROT_SPREAD_SHOWCASE_FORBIDDEN = 'TAROT_SPREAD_SHOWCASE_FORBIDDEN',

    TAROT_SPREAD_MEANING_DISABLED = 'TAROT_SPREAD_MEANING_DISABLED',
    TAROT_SPREAD_MEANING_FORBIDDEN = 'TAROT_SPREAD_MEANING_FORBIDDEN',
    TAROT_SPREAD_MEANING_NOT_FOUND = 'TAROT_SPREAD_MEANING_NOT_FOUND',
    TAROT_SPREAD_MEANING_OVERLOADED = 'TAROT_SPREAD_MEANING_OVERLOADED',
    TAROT_SPREAD_MEANING_TOO_MANY_AMOUNT = 'TAROT_SPREAD_MEANING_TOO_MANY_AMOUNT',
    TAROT_SPREAD_MEANING_MAX_COUNT_EXCEED = 'TAROT_SPREAD_MEANING_MAX_COUNT_EXCEED',
    TAROT_SPREAD_MEANING_DELAY_NOT_FINISHED = 'TAROT_SPREAD_MEANING_DELAY_NOT_FINISHED',

    TAROT_SPREAD_MEANING_AI_ERROR = 'TAROT_SPREAD_MEANING_AI_ERROR',
    TAROT_SPREAD_MEANING_AI_REJECTED = 'TAROT_SPREAD_MEANING_AI_REJECTED',
    TAROT_SPREAD_MEANING_AI_DISABLED = 'TAROT_SPREAD_MEANING_AI_DISABLED',
    TAROT_SPREAD_MEANING_AI_FORBIDDEN = 'TAROT_SPREAD_MEANING_AI_FORBIDDEN',
    TAROT_SPREAD_MEANING_AI_NOT_FOUND = 'TAROT_SPREAD_MEANING_AI_NOT_FOUND',
    TAROT_SPREAD_MEANING_AI_IN_PROGRESS = 'TAROT_SPREAD_MEANING_AI_IN_PROGRESS'
    
}

export interface IInvalidDto<T = any> {
    name?: string;
    value: T | Array<T>;
    expected?: T | Array<T>;
    condition?: FilterableConditionType;
}

export interface IInsufficientFundsDto {
    value: string;
    target: PaymentTransactionType;
    coinId: CoinId;
    expected: string;
}
