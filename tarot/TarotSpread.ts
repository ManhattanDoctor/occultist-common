
import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { Comment } from '../comment';
import { User } from '../user';
import { TarotSpreadMeaning } from './TarotSpreadMeaning';

export class TarotSpread {
    public id: number;
    public uid: string;
    public type: TarotSpreadType;
    public privacy: TarotSpreadPrivacy;
    public indexes: Array<number>;

    @Type(() => Comment)
    public comments: Array<Comment>;

    public seed?: string;
    public desk?: TarotDesk;
    public color?: TarotSpreadColor;
    public advice?: number;
    public status?: TarotSpreadStatus;
    public querent?: string;
    public question?: string;
    public showcase?: string;

    @Type(() => TarotSpreadMeaning)
    public meaning?: TarotSpreadMeaning;

    @Type(() => User)
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
export const TAROT_SPREAD_QUESTION_MAX_LENGTH = 128;

export enum TarotSpreadMode {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC',
}

export enum TarotSpreadPrivacy {
    LINK = 'LINK',
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
}

export enum TarotDesk {
    TOTH = 'TOTH',
    WAITE = 'WAITE',
    PAPUS = 'PAPUS',
    SFORZ = 'SFORZ',
    DEMON = 'DEMON',
    GENIUS = 'GENIUS',
    DIABLO = 'DIABLO',
    CHARLE = 'CHARLE',
    MANARA = 'MANARA',
    VAMPIRE = 'VAMPIRE',
    KAZANOVA = 'KAZANOVA',
    MARSEILLE = 'MARSEILLE',
    CEREMONIAL = 'CEREMONIAL',
}

export const TarotDeskDefault = TarotDesk.TOTH;

export type TarotSpreadPosition = number | string;

export enum TarotSpreadType {
    DAY = 'DAY',
    DATE = 'DATE',

    STAR = 'STAR',
    FORK = 'FORK',
    WORK = 'WORK',
    THREE = 'THREE',
    MONTH = 'MONTH',
    EXPRESS = 'EXPRESS',
    DECISION = 'DECISION',
    MARRIAGE = 'MARRIAGE',
    FULL_CAP = 'FULL_CAP',
    MY_DREAM = 'MY_DREAM',
    BLUNDER = 'BLUNDER',
    DARK_FOG = 'DARK_FOG',
    UNREALITY = 'UNREALITY',
    NEXT_STEP = 'NEXT_STEP',
    OPEN_DOOR = 'OPEN_DOOR',
    TURN_LEFT = 'TURN_LEFT',
    MY_BLOCKS = 'MY_BLOCKS',
    CROSSROAD = 'CROSSROAD',
    HOUSES_12 = 'HOUSES_12',
    MARRIAGE_2 = 'MARRIAGE_2',
    MONEY_TREE = 'MONEY_TREE',
    BLACK_STRIPE = 'BLACK_STRIPE',
    CELTIC_CROSS = 'CELTIC_CROSS',
    HELP_YOURSELF = 'HELP_YOURSELF',
    LEAVE_OR_STAY = 'LEAVE_OR_STAY',
    RECONCILIATION = 'RECONCILIATION',
    HUMAN_ANALYSIS = 'HUMAN_ANALYSIS',
    FAMILY_PROBLEMS = 'FAMILY_PROBLEMS',
    WILL_HE_COMEBACK = 'WILL_HE_COMEBACK',
    WHEEL_OF_FORTUNE = 'WHEEL_OF_FORTUNE',
    WHEN_ITS_VERY_BAD = 'WHEN_ITS_VERY_BAD',
    SITUATION_PROGRESS = 'SITUATION_PROGRESS',
    WILL_WE_BE_TOGETHER = 'WILL_WE_BE_TOGETHER',
    TRAVEL_OR_RELOCATION = 'TRAVEL_OR_RELOCATION',
    BREAK_OR_RAPPROCHEMENT = 'BREAK_OR_RAPPROCHEMENT',
    RELATIONSHIP_POTENTIAL = 'RELATIONSHIP_POTENTIAL',
    TRAIN_STATION_FOR_TWO_2 = 'TRAIN_STATION_FOR_TWO_2',
    PROSPECTS_IN_RELATIONSHIP = 'PROSPECTS_IN_RELATIONSHIP',
    IMPROVE_FINANCIAL_SITUATION = 'IMPROVE_FINANCIAL_SITUATION',
    RECIPROCITY_IN_RELATIONSHIPS = 'RECIPROCITY_IN_RELATIONSHIPS',
}

export enum TarotSpreadKind {
    UNIVERSAL = 'UNIVERSAL',
    PROPHETIC = 'PROPHETIC',
    ANALYTICAL = 'ANALYTICAL',
    RELATIONSHIP = 'RELATIONSHIP',
    WEALTH = 'WEALTH',
}

export enum TarotSpreadStatus {
    REMOVED = 'REMOVED',
}

export enum TarotSpreadColor {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
    FOUR = 'FOUR',
    FIVE = 'FIVE',
    SIX = 'SIX',
    SEVEN = 'SEVEN'
}

export type TarotSpreadUID = string | number;
