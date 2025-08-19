import { GematriaLetter } from '../GematriaLetter';
import { HebrewConverter, HebrewConverterLocale } from '../HebrewConverter';
import { HebrewAlphabet, HebrewAlphabetLetter, HebrewAlphabetName, HebrewAlphabetNumber, HebrewAlphabetValue } from '../../entity';

import * as _ from 'lodash';

export class Hebrew extends HebrewConverter {
    //--------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    //--------------------------------------------------------------------------

    public static PARSER = HebrewAlphabet.PARSER;
    public static VALIDATOR = new RegExp('[\u0590-\u05fe ]', 'g');

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(text?: string) {
        super(HebrewConverterLocale.HEBREW);
        this._parser = Hebrew.PARSER;
        this._validator = Hebrew.VALIDATOR;

        if (!_.isNil(text)) {
            this.text = text;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected getLetters(): Array<HebrewLetter> {
        return HebrewAlphabet.letters.map(item => new HebrewLetter(item.number, item));
    }
}

export class HebrewLetter extends GematriaLetter<HebrewAlphabetValue> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public number: HebrewAlphabetNumber;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(number: HebrewAlphabetNumber, hebrew: HebrewAlphabetLetter) {
        super(hebrew.value, hebrew);
        this.number = number;
        this._label = hebrew.value;
    }
}
