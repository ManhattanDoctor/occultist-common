
import * as _ from 'lodash';
import { ILanguageTranslator } from '@ts-core/language';
import { TarotUtil } from './TarotUtil';
import { getTarotSpreadIndex } from './function';
import { TarotDesk } from './TarotSpread';
import { RandomUtil } from '@ts-core/common';

export class TarotSpreadDayUtil {

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    private static parseSentence = (item: string): string => {
        item = item.trim();
        return !_.isEmpty(item) && item.slice(-1) !== '.' ? `${item}.` : item;
    }

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public static getText(index: number, language: ILanguageTranslator): string {
        let item = _.get(language.locale.rawTranslation, `tarot.${index}`);
        let items = [language.translate('tarot.spread.DAY.day', { title: TarotUtil.getName(index, language, true) }), this.getDescription(index, language)];
        if (!_.isEmpty(item.dark)) {
            items.push(language.translate('tarot.spread.DAY.dark', { dark: _.lowerFirst(item.darkShort) }));
        }
        if (!_.isEmpty(item.light)) {
            items.push(language.translate('tarot.spread.DAY.light', { light: _.lowerFirst(item.lightShort) }));
        }
        return items.map(TarotSpreadDayUtil.parseSentence).join(' ');
    }

    public static getDescription(index: number, language: ILanguageTranslator): string {
        let item = _.get(language.locale.rawTranslation, `tarot.${index}`);
        let key = 'number';
        if (TarotUtil.isTypeMajor(index)) {
            key = 'major';
        }
        else if (TarotUtil.isTypeCourt(index)) {
            key = 'court';
        }
        else if (TarotUtil.isTypeAce(index)) {
            key = 'ace';
        }
        return language.translate(`tarot.spread.DAY.${key}`, { description: _.lowerFirst(item.descriptionShort) });
    }

    public static getIndex(seed: string | number): number {
        let date = new Date();
        let item = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        if (!_.isNil(seed)) {
            item += `_${seed}`;
        }
        return getTarotSpreadIndex(item);
    }

    public static getPicture(index: number, desk?: TarotDesk): string {
        return TarotUtil.getPictureUrl(index, desk);
    }

    public static getGreeting(language: ILanguageTranslator): string {
        return RandomUtil.randomArrayItem(_.get(language.locale.rawTranslation, `tarot.spread.DAY.greeting`));
    }

    public static getFarewell(language: ILanguageTranslator): string {
        return RandomUtil.randomArrayItem(_.get(language.locale.rawTranslation, `tarot.spread.DAY.farewell`));
    }
}
