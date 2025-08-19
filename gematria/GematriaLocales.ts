import { DestroyableMapCollection } from "@ts-core/common";
import { HebrewConverter, HebrewConverterLocale } from "./HebrewConverter";
import { Greek, Latin, Hebrew, Russian, Numeric } from "./locale";

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
}