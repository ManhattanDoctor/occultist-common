
import * as _ from 'lodash';
import { TAROT_SPREAD_URL } from './TarotSpread';

export class TarotUtil {
    //--------------------------------------------------------------------------
    //
    // 	User Methods
    //
    //--------------------------------------------------------------------------

    public static getSpreadUrl(options: ITarotSpreadUrlOptions): string {
        let item = !_.isEmpty(options.origin) ? options.origin : 'https://occultist.one';
        if (options.isVk) {
            item = `https://vk.com/occultdivination`;
        }
        else if (options.isCordova) {
            item = 'https://occultist.one';
        }
        item += `#${TAROT_SPREAD_URL}=${options.uid}`;
        return item;
    }
}

export interface ITarotSpreadUrlOptions {
    uid: string;
    isVk?: boolean,
    origin?: string;
    isCordova?: boolean;
}