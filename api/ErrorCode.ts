export enum ErrorCode {
    REQUEST_INVALID = 'REQUEST_INVALID',
    
    LOGIN_ID_INVALID = 'LOGIN_ID_INVALID',
    LOGIN_TOKEN_INVALID = 'LOGIN_TOKEN_INVALID',
    LOGIN_TOKEN_EXPIRED = 'LOGIN_TOKEN_EXPIRED',
    LOGIN_SIGNATURE_INVALID = 'LOGIN_SIGNATURE_INVALID',

    USER_UNDEFINED = 'USER_UNDEFINED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_STATUS_INVALID = 'USER_STATUS_INVALID',

    COMMENT_NOT_FOUND = 'COMMENT_NOT_FOUND',
    COMMENT_FORBIDDEN = 'COMMENT_FORBIDDEN',

    TAROT_SPREAD_EXCEED = 'TAROT_SPREAD_EXCEED',
    TAROT_SPREAD_FORBIDDEN = 'TAROT_SPREAD_FORBIDDEN',
    TAROT_SPREAD_NOT_FOUND = 'TAROT_SPREAD_NOT_FOUND',
    TAROT_SPREAD_INVALID_DATE = 'TAROT_SPREAD_INVALID_DATE'
}