
import * as _ from 'lodash';
import { TAROT_SPREAD_URL } from './TarotSpread';

export class TarotUtil {
    //--------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    //--------------------------------------------------------------------------

    private static VK_URL = 'https://vk.com/occultdivination';
    private static SITE_URL = 'https://occultist.one';

    //--------------------------------------------------------------------------
    //
    // 	Url Methods
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