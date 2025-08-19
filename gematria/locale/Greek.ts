import { HebrewConverter, HebrewConverterLocale } from '../HebrewConverter';
import { GematriaLetter } from '../GematriaLetter';
import { HebrewAlphabet, HebrewAlphabetLetter, HebrewAlphabetName } from '../../entity';
import * as _ from 'lodash';

export class Greek extends HebrewConverter {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super(HebrewConverterLocale.GREEK);
        this._parser = new RegExp('[^α-ωΑ-Ω ]', 'g');
        this._validator = new RegExp('[α-ωΑ-Ω ]', 'g');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected getLetters(): Array<GreekLetter> {
        return [
            new GreekLetter('α', HebrewAlphabet.names.get(HebrewAlphabetName.ALEPH)),
            new GreekLetter('β', HebrewAlphabet.names.get(HebrewAlphabetName.BET)),
            new GreekLetter('γ', HebrewAlphabet.names.get(HebrewAlphabetName.GIMEL)),
            new GreekLetter('δ', HebrewAlphabet.names.get(HebrewAlphabetName.DALET)),
            new GreekLetter('ε', HebrewAlphabet.names.get(HebrewAlphabetName.HE)),
            new GreekLetter('ϝ', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new GreekLetter('ζ', HebrewAlphabet.names.get(HebrewAlphabetName.ZAYIN)),
            new GreekLetter('η', HebrewAlphabet.names.get(HebrewAlphabetName.HETH)),
            new GreekLetter('θ', HebrewAlphabet.names.get(HebrewAlphabetName.TETH)),
            new GreekLetter('ι', HebrewAlphabet.names.get(HebrewAlphabetName.YODH)),
            new GreekLetter('κ', HebrewAlphabet.names.get(HebrewAlphabetName.KAPH)),
            new GreekLetter('λ', HebrewAlphabet.names.get(HebrewAlphabetName.LAMED)),
            new GreekLetter('μ', HebrewAlphabet.names.get(HebrewAlphabetName.MEM)),
            new GreekLetter('ν', HebrewAlphabet.names.get(HebrewAlphabetName.NUN)),
            new GreekLetter('ξ', HebrewAlphabet.names.get(HebrewAlphabetName.SAMEKH)),
            new GreekLetter('ο', HebrewAlphabet.names.get(HebrewAlphabetName.AYIN)),
            new GreekLetter('π', HebrewAlphabet.names.get(HebrewAlphabetName.PE)),
            new GreekLetter('φ', HebrewAlphabet.names.get(HebrewAlphabetName.TSADHE)),
            new GreekLetter('χ', HebrewAlphabet.names.get(HebrewAlphabetName.QOPH)),
            new GreekLetter('χ', HebrewAlphabet.names.get(HebrewAlphabetName.QOPH)),
            new GreekLetter('ψ', HebrewAlphabet.names.get(HebrewAlphabetName.RESH)),
            new GreekLetter('ω', HebrewAlphabet.names.get(HebrewAlphabetName.SHIN)),
            new GreekLetter('ϡ', HebrewAlphabet.names.get(HebrewAlphabetName.TAW))
        ];
    }
}

export type GreekLetterType =
    | 'α'
    | 'β'
    | 'γ'
    | 'δ'
    | 'ε'
    | 'ϝ'
    | 'ζ'
    | 'η'
    | 'θ'
    | 'ι'
    | 'κ'
    | 'λ'
    | 'μ'
    | 'ν'
    | 'ξ'
    | 'ο'
    | 'π'
    | 'ϙ'
    | 'σ'
    | 'τ'
    | 'υ'
    | 'φ'
    | 'χ'
    | 'ψ'
    | 'ω'
    | 'ϡ';

export class GreekLetter extends GematriaLetter<GreekLetterType> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(value: GreekLetterType, hebrew: HebrewAlphabetLetter) {
        super(value, hebrew);
    }
}
