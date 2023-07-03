
import * as _ from 'lodash';
import { TAROT_SPREAD_URL } from './TarotSpread';

export class TarotUtil {
    //--------------------------------------------------------------------------
    //
    // 	User Methods
    //
    //--------------------------------------------------------------------------

    public static getSpreadUrl(options: ITarotSpreadUrlOptions): string {
        let item = 'https://occultist.one';
        if (options.isVk) {
            item = `https://vk.com/occultdivination`;
        }
        else if (!_.isEmpty(options.origin) && !options.isCordova) {
            item = options.origin;
        }
        item += `#${TarotUtil.getSpreadFragmentUrl(options.uid)}`;
        return item;
    }

    public static getSpreadFragmentUrl(uid: string): string {
        return `${TAROT_SPREAD_URL}=${uid}`;
    }
}

export interface ITarotSpreadUrlOptions {
    uid: string;
    isVk?: boolean,
    origin?: string;
    isCordova?: boolean;
}