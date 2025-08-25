import { DestroyableMapCollection } from "@ts-core/common";
import { HebrewConverter, HebrewConverterLocale } from "./HebrewConverter";
import { Greek, Latin, Hebrew, Russian, Numeric } from "./locale";
import * as _ from 'lodash';

export class GematriaLocales extends DestroyableMapCollection<HebrewConverter> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super('locale');
        this.add(new Hebrew());
        this.add(new Greek());
        this.add(new Latin());
        this.add(new Russian());
        this.add(new Numeric());
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public parse(locale: HebrewConverterLocale, text: string): string {
        return this.has(locale) ? this.get(locale).parse(text) : null;
    }

    public calculate(text: string): IGematria {
        for (let item of this.collection) {
            if (_.isEmpty(item.parse(text))) {
                continue;
            }
            item.text = text;
            return { text: item.hebrewText, locale: item.locale, number: { value: parseInt(item.hebrewNumber), reduction: parseInt(item.hebrewNumberReduction), calculation: item.hebrewNumberCalculation } };
        }
        return null;
    }
}

export interface IGematria {
    text: string;
    locale: HebrewConverterLocale;
    number: {
        value: number;
        reduction: number;
        calculation: string;
    }
}