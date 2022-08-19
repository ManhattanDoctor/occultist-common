
import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { Comment } from '../comment';
import { User } from '../user';

export class TarotSpread {
    public id: number;
    public uid: string;
    public type: TarotSpreadType;
    public privacy: TarotSpreadPrivacy;
    public indexes: Array<number>;
    public comments: Array<Comment>;

    public seed?: string;
    public desk?: TarotSpreadDesk;
    public querent?: string;
    public question?: string;

    public user?: User;
    public userId?: number;

    @Type(() => Date)
    public date?: Date;

    @Type(() => Date)
    public createdDate: Date;
}

export const TAROT_SPREAD_INDEXES_MIN_LENGTH = 1;
export const TAROT_SPREAD_INDEXES_MAX_LENGTH = 78;
export const TAROT_SPREAD_QUERENT_MAX_LENGTH = 50;
export const TAROT_SPREAD_QUESTION_MIN_LENGTH = 1;
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
    PAPUS = 'PAPUS',
    SFORZ = 'SFORZ',
    CHARLE = 'CHARLE',
    MARSEILLE = 'MARSEILLE',
    CEREMONIAL = 'CEREMONIAL'
}

export const TarotSpreadDeskDefault = TarotSpreadDesk.TOTH;

export enum TarotSpreadType {
    DAY = 'DAY',
    DATE = 'DATE',
    STAR = 'STAR',
    THREE = 'THREE',
    EXPRESS = 'EXPRESS',
    NEXT_STEP = 'NEXT_STEP',
    OPEN_DOOR = 'OPEN_DOOR',
    MONEY_TREE = 'MONEY_TREE',
    CELTIC_CROSS = 'CELTIC_CROSS',
    HUMAN_ANALYSIS = 'HUMAN_ANALYSIS',
    WHEEL_OF_FORTUNE = 'WHEEL_OF_FORTUNE',
    SITUATION_PROGRESS = 'SITUATION_PROGRESS',
    WILL_WE_BE_TOGETHER = 'WILL_WE_BE_TOGETHER',
    BREAK_OR_RAPPROCHEMENT = 'BREAK_OR_RAPPROCHEMENT',
    TRAIN_STATION_FOR_TWO_2 = 'TRAIN_STATION_FOR_TWO_2',
    RECIPROCITY_IN_RELATIONSHIPS = 'RECIPROCITY_IN_RELATIONSHIPS',
}

export enum TarotSpreadKind {
    UNIVERSAL = 'UNIVERSAL',
    PROPHETIC = 'PROPHETIC',
    ANALYTICAL = 'ANALYTICAL',
    RELATIONSHIP = 'RELATIONSHIP',
    WEALTH = 'WEALTH',
}

export type TarotSpreadUID = string | number;
