import { HebrewConverter, HebrewConverterLocale } from '../HebrewConverter';
import * as _ from 'lodash';
import { GematriaLetter } from '../GematriaLetter';
import { HebrewAlphabet, HebrewAlphabetLetter, HebrewAlphabetName } from '../../entity';

export class Latin extends HebrewConverter {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super(HebrewConverterLocale.LATIN);
        this._parser = new RegExp('[^a-zA-Z ]', 'g');
        this._validator = new RegExp('[a-zA-Z ]', 'g');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected getLetters(): Array<LatinLetter> {
        return [
            new LatinLetter('a', HebrewAlphabet.names.get(HebrewAlphabetName.ALEPH)),
            new LatinLetter('b', HebrewAlphabet.names.get(HebrewAlphabetName.BET)),
            new LatinLetter('c', HebrewAlphabet.names.get(HebrewAlphabetName.GIMEL)),
            new LatinLetter('g', HebrewAlphabet.names.get(HebrewAlphabetName.GIMEL)),
            new LatinLetter('d', HebrewAlphabet.names.get(HebrewAlphabetName.DALET)),
            new LatinLetter('e', HebrewAlphabet.names.get(HebrewAlphabetName.HE)),
            new LatinLetter('f', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new LatinLetter('v', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new LatinLetter('u', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new LatinLetter('w', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new LatinLetter('z', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new LatinLetter('h', HebrewAlphabet.names.get(HebrewAlphabetName.HETH)),
            // new LatinLetter('', HebrewAlphabet.names.get(HebrewAlphabetName.TETH)),
            new LatinLetter('i', HebrewAlphabet.names.get(HebrewAlphabetName.YODH)),
            new LatinLetter('j', HebrewAlphabet.names.get(HebrewAlphabetName.YODH)),
            new LatinLetter('k', HebrewAlphabet.names.get(HebrewAlphabetName.KAPH)),
            new LatinLetter('l', HebrewAlphabet.names.get(HebrewAlphabetName.LAMED)),
            new LatinLetter('m', HebrewAlphabet.names.get(HebrewAlphabetName.MEM)),
            new LatinLetter('n', HebrewAlphabet.names.get(HebrewAlphabetName.NUN)),
            //new LatinLetter('', HebrewAlphabet.names.get(HebrewAlphabetName.SAMEKH)),
            new LatinLetter('o', HebrewAlphabet.names.get(HebrewAlphabetName.AYIN)),
            new LatinLetter('p', HebrewAlphabet.names.get(HebrewAlphabetName.PE)),
            // new LatinLetter('', HebrewAlphabet.names.get(HebrewAlphabetName.TSADHE)),
            new LatinLetter('q', HebrewAlphabet.names.get(HebrewAlphabetName.QOPH)),
            new LatinLetter('r', HebrewAlphabet.names.get(HebrewAlphabetName.RESH)),
            new LatinLetter('s', HebrewAlphabet.names.get(HebrewAlphabetName.SHIN)),
            new LatinLetter('t', HebrewAlphabet.names.get(HebrewAlphabetName.TETH))
        ];
    }
}

export type LatinLetterType =
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z'
    | 'ch'
    | 'th'
    | 'eh'
    | 'sh'
    | 'ss';

export class LatinLetter extends GematriaLetter<LatinLetterType> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(value: LatinLetterType, hebrew: HebrewAlphabetLetter) {
        super(value, hebrew);
    }
}
