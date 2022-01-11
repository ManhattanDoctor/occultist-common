import { Type } from 'class-transformer';

export class TarotSpread {
    public id: number;
    public type: TarotSpreadType;
    public seed: string;
    public indexes: Array<number>;

    @Type(() => Date)
    public date?: Date;
    public querent?: string;
    public comment?: string;
    public question?: string;

    @Type(() => Date)
    public createdDate: Date;
}

export const TAROT_SPREAD_QUERENT_MAX_LENGTH = 50;
export const TAROT_SPREAD_COMMENT_MAX_LENGTH = 256;
export const TAROT_SPREAD_QUESTION_MAX_LENGTH = 256;

export enum TarotSpreadType {
    DAY = 'DAY',
    STAR = 'STAR',
    THREE = 'THREE'
}
