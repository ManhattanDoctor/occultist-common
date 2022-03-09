import { Type } from 'class-transformer';
import * as _ from 'lodash';

export class TarotSpread {
    public id: number;
    public type: TarotSpreadType;
    public indexes: Array<number>;

    public seed?: string;

    @Type(() => Date)
    public date?: Date;
    public querent?: string;
    public comment?: string;
    public question?: string;

    @Type(() => Date)
    public createdDate: Date;
}

export const TAROT_SPREAD_INDEXES_MAX_LENGTH = 78;
export const TAROT_SPREAD_QUERENT_MAX_LENGTH = 50;
export const TAROT_SPREAD_COMMENT_MAX_LENGTH = 256;
export const TAROT_SPREAD_QUESTION_MAX_LENGTH = 256;

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
export enum TarotSpreadMode {
    EDITABLE = 'EDITABLE',
    COMPLETED = 'COMPLETED',
}
