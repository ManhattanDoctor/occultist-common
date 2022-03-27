import { Type } from 'class-transformer';
import * as _ from 'lodash';

export class TarotSpread {
    public id: number;
    public uid: string;
    public type: TarotSpreadType;
    public indexes: Array<number>;

    public seed?: string;
    public desk?: TarotSpreadDesk;
    public querent?: string;
    public question?: string;

    @Type(() => Date)
    public createdDate: Date;
}

export const TAROT_SPREAD_INDEXES_MAX_LENGTH = 78;
export const TAROT_SPREAD_QUERENT_MAX_LENGTH = 50;
export const TAROT_SPREAD_COMMENT_MAX_LENGTH = 256;
export const TAROT_SPREAD_QUESTION_MAX_LENGTH = 256;

export enum TarotSpreadMode {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC',
}

export enum TarotSpreadPrivacy {
    LINK = 'LINK',
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
}

export enum TarotSpreadDesk {
    TOTH = 'TOTH',
    WAITE = 'WAITE',
    CEREMONIAL = 'CEREMONIAL',
    MARSEILLE = 'MARSEILLE',
    PAPUS = 'PAPUS',
    SFORZ = 'SFORZ',
    CHARLE = 'CHARLE'
}

export enum TarotSpreadType {
    DAY = 'DAY',
    DATE = 'DATE',
    STAR = 'STAR',
    THREE = 'THREE',
    CELTIC_CROSS = 'CELTIC_CROSS',
}

export enum TarotSpreadKind {
    UNIVERSAL = 'UNIVERSAL',
    PROPHETIC = 'PROPHETIC',
    BUSINESS = 'BUSINESS',
    ANALYTICAL = 'ANALYTICAL',
    RELATIONSHIP = 'RELATIONSHIP',
}
