
import * as _ from 'lodash';
import { TAROT_SPREAD_URL, TarotDesk } from './TarotSpread';
import { ShareUtil } from '../util';
import { LanguageTranslator } from '@ts-core/language';

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

    public static getName(index: number, language: LanguageTranslator, isNeedName?: boolean): string {
        let item = language.translate({ key: `tarot.${index}.title` });
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
        item = _.capitalize(`${language.translate({ key: 'format.tarotCardNumberSelect', params: { tarotCardNumber: array[0] } })} ${array[1]}`);
        if (isNeedName) {
            item += ` - ${language.translate({ key: `tarot.${index}.name` })}`;
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

    public static getSpreadUrl(options: ITarotSpreadUrlOptions): IShareUrl {
        let fragment = TarotUtil.getSpreadFragmentUrl(options.uid);
        return {
            vk: `${ShareUtil.VK_URL}#${fragment}`,
            web: !_.isEmpty(options.origin) ? `${options.origin}#${fragment}` : `${ShareUtil.SITE_URL}#${fragment}`,
            application: `${ShareUtil.SITE_URL}#${fragment}`,
            // application: `https://localhost/${TAROT_SPREAD_URL}/${options.uid}`,
            picture: `https://occultist.one/assets/icon/512.png`,
            fragment
        }
    }

    public static getSpreadFragmentUrl(uid: string): string {
        return `${TAROT_SPREAD_URL}=${uid}`;
    }
}

export type TarotIndex = string | number;

export interface IShareUrl {
    vk?: string,
    web?: string,
    picture?: string,
    fragment?: string;
    application?: string,
}

export interface ITarotSpreadUrlOptions {
    uid: string;
    origin?: string;
}