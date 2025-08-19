import { HebrewConverter, HebrewConverterLocale } from '../HebrewConverter';
import * as _ from 'lodash';
import { GematriaLetter } from '../GematriaLetter';
import { HebrewAlphabet, HebrewAlphabetLetter, HebrewAlphabetNumber } from '../../entity';

export class Numeric extends HebrewConverter {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super(HebrewConverterLocale.NUMERIC);
        this._parser = new RegExp('[^0123456789]', 'g');
        this._validator = new RegExp('[0123456789]', 'g');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected getLetters(): Array<NumericLetter> {
        return [];
    }

    protected toHebrew(value: string): string {
        if (_.isEmpty(value)) {
            return null;
        }
        let number = parseInt(value);
        if (!_.isInteger(number)) {
            return null;
        }
        number = Math.max(number, 0);
        number = Math.min(number, 10000);
        return HebrewAlphabet.toString(HebrewAlphabet.fromNumber(number));
    }
}

export class NumericLetter extends GematriaLetter<HebrewAlphabetNumber> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(value: HebrewAlphabetNumber, hebrew: HebrewAlphabetLetter) {
        super(value, hebrew);
    }
}
