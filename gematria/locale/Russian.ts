import { HebrewConverter, HebrewConverterLocale } from '../HebrewConverter';
import * as _ from 'lodash';
import { GematriaLetter } from '../GematriaLetter';
import { HebrewAlphabet, HebrewAlphabetLetter, HebrewAlphabetName } from '../../entity';

export class Russian extends HebrewConverter {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super(HebrewConverterLocale.RUSSIAN);
        this._parser = new RegExp('[^а-яА-Я ]', 'g');
        this._validator = new RegExp('[а-яА-Я ]', 'g');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected getLetters(): Array<RussianLetter> {
        return [
            new RussianLetter('а', HebrewAlphabet.names.get(HebrewAlphabetName.ALEPH)),
            new RussianLetter('я', HebrewAlphabet.names.get(HebrewAlphabetName.ALEPH)),
            new RussianLetter('б', HebrewAlphabet.names.get(HebrewAlphabetName.BET)),
            new RussianLetter('в', HebrewAlphabet.names.get(HebrewAlphabetName.BET)),
            new RussianLetter('г', HebrewAlphabet.names.get(HebrewAlphabetName.GIMEL)),
            new RussianLetter('д', HebrewAlphabet.names.get(HebrewAlphabetName.DALET)),
            new RussianLetter('е', HebrewAlphabet.names.get(HebrewAlphabetName.HE)),
            new RussianLetter('у', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new RussianLetter('ю', HebrewAlphabet.names.get(HebrewAlphabetName.WAW)),
            new RussianLetter('з', HebrewAlphabet.names.get(HebrewAlphabetName.ZAYIN)),
            new RussianLetter('и', HebrewAlphabet.names.get(HebrewAlphabetName.HETH)),
            // new RussianLetter('', HebrewAlphabet.names.get(HebrewAlphabetName.TETH)),
            new RussianLetter('ы', HebrewAlphabet.names.get(HebrewAlphabetName.YODH)),
            new RussianLetter('ю', HebrewAlphabet.names.get(HebrewAlphabetName.YODH)),
            new RussianLetter('к', HebrewAlphabet.names.get(HebrewAlphabetName.KAPH)),
            new RussianLetter('л', HebrewAlphabet.names.get(HebrewAlphabetName.LAMED)),
            new RussianLetter('м', HebrewAlphabet.names.get(HebrewAlphabetName.MEM)),
            new RussianLetter('н', HebrewAlphabet.names.get(HebrewAlphabetName.NUN)),
            // new RussianLetter('', HebrewAlphabet.names.get(HebrewAlphabetName.SAMEKH)),
            new RussianLetter('о', HebrewAlphabet.names.get(HebrewAlphabetName.AYIN)),
            new RussianLetter('п', HebrewAlphabet.names.get(HebrewAlphabetName.PE)),
            new RussianLetter('ц', HebrewAlphabet.names.get(HebrewAlphabetName.TSADHE)),
            new RussianLetter('ч', HebrewAlphabet.names.get(HebrewAlphabetName.TSADHE)),
            new RussianLetter('ф', HebrewAlphabet.names.get(HebrewAlphabetName.QOPH)),
            new RussianLetter('р', HebrewAlphabet.names.get(HebrewAlphabetName.RESH)),
            new RussianLetter('с', HebrewAlphabet.names.get(HebrewAlphabetName.SHIN)),
            new RussianLetter('ш', HebrewAlphabet.names.get(HebrewAlphabetName.SHIN)),
            new RussianLetter('щ', HebrewAlphabet.names.get(HebrewAlphabetName.SHIN)),
            new RussianLetter('т', HebrewAlphabet.names.get(HebrewAlphabetName.TAW))
        ];
    }
}

export type RussianLetterType =
    | 'а'
    | 'б'
    | 'в'
    | 'г'
    | 'д'
    | 'е'
    | 'ё'
    | 'ж'
    | 'з'
    | 'и'
    | 'й'
    | 'к'
    | 'л'
    | 'м'
    | 'н'
    | 'о'
    | 'п'
    | 'р'
    | 'с'
    | 'т'
    | 'у'
    | 'ф'
    | 'х'
    | 'ц'
    | 'ч'
    | 'ш'
    | 'щ'
    | 'ъ'
    | 'ы'
    | 'ь'
    | 'э'
    | 'ю'
    | 'я';

export class RussianLetter extends GematriaLetter<RussianLetterType> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(value: RussianLetterType, hebrew: HebrewAlphabetLetter) {
        super(value, hebrew);
    }
}
