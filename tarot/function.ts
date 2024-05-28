
import { UnreachableStatementError } from '@ts-core/common';
import { TarotSpreadType } from './TarotSpread';
import * as _ from 'lodash';

export const TAROT_SPREAD_URL = 'tarotSpread';

export function getTarotSpreadAmount(item: TarotSpreadType): number {
    switch (item) {
        case TarotSpreadType.DAY:
        case TarotSpreadType.DATE:
            return 1;
        case TarotSpreadType.WORK:
        case TarotSpreadType.THREE:
        case TarotSpreadType.EXPRESS:
        case TarotSpreadType.BLACK_STRIPE:
        case TarotSpreadType.RECONCILIATION:
        case TarotSpreadType.PROSPECTS_IN_RELATIONSHIP:
            return 3;
        case TarotSpreadType.FULL_CAP:
        case TarotSpreadType.CROSSROAD:
        case TarotSpreadType.NEXT_STEP:
        case TarotSpreadType.RECIPROCITY_IN_RELATIONSHIPS:
            return 4;
        case TarotSpreadType.MONTH:
        case TarotSpreadType.BLUNDER:
        case TarotSpreadType.DECISION:
        case TarotSpreadType.DARK_FOG:
        case TarotSpreadType.UNREALITY:
        case TarotSpreadType.TURN_LEFT:
        case TarotSpreadType.OPEN_DOOR:
        case TarotSpreadType.MY_BLOCKS:
        case TarotSpreadType.MONEY_TREE:
        case TarotSpreadType.HELP_YOURSELF:
        case TarotSpreadType.HUMAN_ANALYSIS:
        case TarotSpreadType.WHEEL_OF_FORTUNE:
        case TarotSpreadType.SITUATION_PROGRESS:
        case TarotSpreadType.IMPROVE_FINANCIAL_SITUATION:
            return 5;
        case TarotSpreadType.MY_DREAM:
        case TarotSpreadType.MARRIAGE_2:
        case TarotSpreadType.WILL_HE_COMEBACK:
        case TarotSpreadType.WHEN_ITS_VERY_BAD:
        case TarotSpreadType.TRAVEL_OR_RELOCATION:
            return 6;
        case TarotSpreadType.STAR:
        case TarotSpreadType.FORK:
        case TarotSpreadType.MARRIAGE:
        case TarotSpreadType.WILL_WE_BE_TOGETHER:
        case TarotSpreadType.BREAK_OR_RAPPROCHEMENT:
        case TarotSpreadType.RELATIONSHIP_POTENTIAL:
            return 7;
        case TarotSpreadType.LEAVE_OR_STAY:
            return 8;
        case TarotSpreadType.FAMILY_PROBLEMS:
        case TarotSpreadType.TRAIN_STATION_FOR_TWO_2:
            return 9;
        case TarotSpreadType.CELTIC_CROSS:
            return 10;
        case TarotSpreadType.HOUSES_12:
            return 12;
        default:
            throw new UnreachableStatementError(item);
    }
}