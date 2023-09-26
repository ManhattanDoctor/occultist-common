
import { MathUtil, UnreachableStatementError } from '@ts-core/common';
import { RandomGenerator } from '../util';
import { TarotSpreadType } from './TarotSpread';
import * as _ from 'lodash';
import { User, UserMasterLevel } from '../user';

export function getTarotSpreadIndexes(seed: string): Array<number> {
    let length = 78;
    let indexes: Array<number> = new Array();
    let generator = new RandomGenerator(seed);
    while (indexes.length < length) {
        let index = generator.integerFromZeroTo(length);
        if (!indexes.includes(index)) {
            indexes.push(index);
        }
    }
    return indexes;
}

export function getTarotSpreadIndex(seed: string): number {
    return new RandomGenerator(seed).integerFromZeroTo(78);
}

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
        case TarotSpreadType.OPEN_DOOR:
        case TarotSpreadType.MONEY_TREE:
        case TarotSpreadType.HUMAN_ANALYSIS:
        case TarotSpreadType.WHEEL_OF_FORTUNE:
        case TarotSpreadType.SITUATION_PROGRESS:
        case TarotSpreadType.HELP_YOURSELF:
        case TarotSpreadType.IMPROVE_FINANCIAL_SITUATION:
            return 5;
        case TarotSpreadType.MY_DREAM:
        case TarotSpreadType.MARRIAGE_2:
            return 6;
        case TarotSpreadType.STAR:
        case TarotSpreadType.FORK:
        case TarotSpreadType.MARRIAGE:
        case TarotSpreadType.WILL_WE_BE_TOGETHER:
        case TarotSpreadType.BREAK_OR_RAPPROCHEMENT:
            return 7;
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

export function getTarotSpreadPrice(item: TarotSpreadType, master: User): string {
    let level = master?.master?.level || UserMasterLevel.BEGINNER;
    let amount = getTarotSpreadAmount(item);
    let multiplier = 1;

    switch (level) {
        case UserMasterLevel.MASTER:
            multiplier = 30;
            break;
        case UserMasterLevel.ADVANCED:
            multiplier = 5;
            break;
        case UserMasterLevel.BEGINNER:
            multiplier = 1;
            break;
        default:
            throw new UnreachableStatementError(level);
    }

    return (amount * multiplier).toString();
}