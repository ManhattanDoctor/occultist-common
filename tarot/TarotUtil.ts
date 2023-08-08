
import * as _ from 'lodash';
import { TAROT_SPREAD_URL, TarotDesk } from './TarotSpread';

export class TarotUtil {
    //--------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    //--------------------------------------------------------------------------

    private static VK_URL = 'https://vk.com/occultdivination';
    private static SITE_URL = 'https://occultist.one';
    private static ASSETS_URL = 'https://vk.occultist.one/tarot/assets';

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

    public static getPictureUrl(index: number, desk?: TarotDesk): string {
        if (_.isNil(desk)) {
            desk = TarotDesk.TOTH;
        }
        return `${TarotUtil.ASSETS_URL}/image/tarot/${desk.toLowerCase()}/${index}.jpg`;
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

    public static getSpreadUrl(options: ITarotSpreadUrlOptions): ITarotSpreadUrl {
        let fragment = TarotUtil.getSpreadFragmentUrl(options.uid);
        return {
            vk: `${TarotUtil.VK_URL}#${fragment}`,
            web: !_.isEmpty(options.origin) ? `${options.origin}#${fragment}` : `${TarotUtil.SITE_URL}#${fragment}`,
            application: `${TarotUtil.SITE_URL}#${fragment}`,
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

export interface ITarotSpreadUrl {
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