import { IShareUrl, ShareUtil } from '../util';
import { TarotDesk, TarotSpreadKind, TarotSpreadType } from './TarotSpread';
import { LanguageProjectProxy } from '@ts-core/language';
import { TAROT_SPREAD_URL } from './function';
import * as _ from 'lodash';

export class TarotUtil {

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private static parseIndex(item: TarotIndex): number {
        return _.isString(item) ? parseInt(item) : item;
    }

    //--------------------------------------------------------------------------
    //
    // 	Tarot Methods
    //
    //--------------------------------------------------------------------------

    public static getName(index: number, language: LanguageProjectProxy, isNeedName?: boolean): string {
        let item = language.translate(`tarot.${index}.title`);
        if (!TarotUtil.isTypeNumber(index) && !TarotUtil.isTypeMajor(index)) {
            return item;
        }
        let array = item.split(' ');
        if (array.length !== 2) {
            return item;
        }
        if (TarotUtil.isTypeMajor(index)) {
            return _.capitalize(array[1]);
        }
        item = _.capitalize(`${language.translate('format.tarotCardNumberSelect', { tarotCardNumber: array[0] })} ${array[1]}`);
        if (isNeedName) {
            item += ` - ${language.translate(`tarot.${index}.name`)}`;
        }
        return item;
    }

    public static getPictureUrl(index: number, desk?: TarotDesk): string {
        if (_.isNil(desk)) {
            desk = TarotDesk.TOTH;
        }
        return `${ShareUtil.ASSETS_URL}/image/tarot/${desk.toLowerCase()}/${index}.jpg`;
    }

    public static isTypeMajor(index: TarotIndex): boolean {
        index = TarotUtil.parseIndex(index);
        return index > -1 && index < 22;
    }

    public static isTypeCourt(index: TarotIndex): boolean {
        index = TarotUtil.parseIndex(index);
        return index > 21 && index < 38;
    }

    public static isTypeNumber(index: TarotIndex): boolean {
        index = TarotUtil.parseIndex(index);
        return index > 38 && index < 78 && !TarotUtil.isTypeAce(index);
    }

    public static isTypeAce(index: TarotIndex): boolean {
        switch (TarotUtil.parseIndex(index)) {
            case 38:
            case 48:
            case 58:
            case 68:
                return true;
            default:
                return false;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Spread Methods
    //
    //--------------------------------------------------------------------------

    public static getUrl(index: number, desk?: TarotDesk): string {
        if (_.isNil(desk)) {
            desk = TarotDesk.TOTH;
        }
        return `${ShareUtil.SITE_URL}/tarot/${index}#${desk}`;
    }

    public static getSpreadUrl(options: ITarotSpreadUrlOptions): IShareUrl {
        let fragment = TarotUtil.getSpreadFragmentUrl(options.uid);
        return {
            vk: `${ShareUtil.VK_URL}#${fragment}`,
            web: !_.isEmpty(options.origin) ? `${options.origin}#${fragment}` : `${ShareUtil.SITE_URL}#${fragment}`,
            picture: `${ShareUtil.SITE_URL}/assets/icon/512.png`,
            application: `${ShareUtil.SITE_URL}#${fragment}`,
            fragment
        }
    }

    public static getSpreadFragmentUrl(uid: string): string {
        return `${TAROT_SPREAD_URL}=${uid}`;
    }

    public static getSpreadTypes(): Array<ITarotSpreadItem> {
        return [
            { index: 101, type: TarotSpreadType.CELTIC_CROSS, kind: TarotSpreadKind.UNIVERSAL },
            { index: 102, type: TarotSpreadType.THREE, kind: TarotSpreadKind.UNIVERSAL },

            { index: 201, type: TarotSpreadType.STAR, kind: TarotSpreadKind.ANALYTICAL },
            { index: 202, type: TarotSpreadType.WHEEL_OF_FORTUNE, kind: TarotSpreadKind.ANALYTICAL },
            { index: 203, type: TarotSpreadType.NEXT_STEP, kind: TarotSpreadKind.ANALYTICAL },
            { index: 204, type: TarotSpreadType.HUMAN_ANALYSIS, kind: TarotSpreadKind.ANALYTICAL },
            { index: 205, type: TarotSpreadType.OPEN_DOOR, kind: TarotSpreadKind.ANALYTICAL },
            { index: 206, type: TarotSpreadType.HELP_YOURSELF, kind: TarotSpreadKind.ANALYTICAL },
            { index: 207, type: TarotSpreadType.BLACK_STRIPE, kind: TarotSpreadKind.ANALYTICAL },
            { index: 208, type: TarotSpreadType.MY_DREAM, kind: TarotSpreadKind.ANALYTICAL },
            { index: 209, type: TarotSpreadType.MY_BLOCKS, kind: TarotSpreadKind.ANALYTICAL },
            { index: 210, type: TarotSpreadType.WHEN_ITS_VERY_BAD, kind: TarotSpreadKind.ANALYTICAL },

            { index: 301, type: TarotSpreadType.EXPRESS, kind: TarotSpreadKind.PROPHETIC },
            { index: 302, type: TarotSpreadType.SITUATION_PROGRESS, kind: TarotSpreadKind.PROPHETIC },
            { index: 303, type: TarotSpreadType.MONTH, kind: TarotSpreadKind.PROPHETIC },
            { index: 304, type: TarotSpreadType.HOUSES_12, kind: TarotSpreadKind.PROPHETIC },
            { index: 305, type: TarotSpreadType.FORK, kind: TarotSpreadKind.PROPHETIC },
            { index: 306, type: TarotSpreadType.CROSSROAD, kind: TarotSpreadKind.PROPHETIC },
            { index: 307, type: TarotSpreadType.DECISION, kind: TarotSpreadKind.PROPHETIC },
            { index: 308, type: TarotSpreadType.TRAVEL_OR_RELOCATION, kind: TarotSpreadKind.PROPHETIC },

            { index: 401, type: TarotSpreadType.TRAIN_STATION_FOR_TWO_2, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 402, type: TarotSpreadType.RECIPROCITY_IN_RELATIONSHIPS, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 403, type: TarotSpreadType.BREAK_OR_RAPPROCHEMENT, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 404, type: TarotSpreadType.WILL_WE_BE_TOGETHER, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 405, type: TarotSpreadType.MARRIAGE, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 406, type: TarotSpreadType.MARRIAGE_2, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 407, type: TarotSpreadType.RECONCILIATION, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 408, type: TarotSpreadType.PROSPECTS_IN_RELATIONSHIP, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 409, type: TarotSpreadType.BLUNDER, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 410, type: TarotSpreadType.UNREALITY, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 411, type: TarotSpreadType.TURN_LEFT, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 412, type: TarotSpreadType.DARK_FOG, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 413, type: TarotSpreadType.FAMILY_PROBLEMS, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 414, type: TarotSpreadType.WILL_HE_COMEBACK, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 415, type: TarotSpreadType.RELATIONSHIP_POTENTIAL, kind: TarotSpreadKind.RELATIONSHIP },
            { index: 416, type: TarotSpreadType.LEAVE_OR_STAY, kind: TarotSpreadKind.RELATIONSHIP },

            { index: 501, type: TarotSpreadType.MONEY_TREE, kind: TarotSpreadKind.WEALTH },
            { index: 502, type: TarotSpreadType.IMPROVE_FINANCIAL_SITUATION, kind: TarotSpreadKind.WEALTH },
            { index: 503, type: TarotSpreadType.FULL_CAP, kind: TarotSpreadKind.WEALTH },
            { index: 504, type: TarotSpreadType.WORK, kind: TarotSpreadKind.WEALTH },
        ]
    }
}

export type TarotIndex = string | number;

export interface ITarotSpreadItem {
    type: TarotSpreadType;
    kind: TarotSpreadKind;
    index: number;
}
export interface ITarotSpreadUrlOptions {
    uid: string;
    origin?: string;
}