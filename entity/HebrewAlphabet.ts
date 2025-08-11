import * as _ from 'lodash';

export class HebrewAlphabet {

    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static PARSER = new RegExp('[^\u0590-\u05fe ]', 'g');

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public static fromString(item: string): Array<HebrewAlphabetLetter> {
        if (_.isEmpty(item)) {
            return null;
        }
        item = _.lowerCase(item).replace(HebrewAlphabet.PARSER, '');
        if (_.isEmpty(item)) {
            return null;
        }
        let items = new Array();
        for (let i = 0; i < item.length; i++) {
            let letter = HebrewAlphabet.values.get(item.charAt(i) as HebrewAlphabetValue);
            if (!_.isNil(letter)) {
                items.push(letter);
            }
        }
        return items;
    }
    public static toString(items: HebrewAlphabetLetter | Array<HebrewAlphabetLetter>): string {
        if (!_.isArray(items)) {
            items = [items];
        }
        return items.map(item => item.value).join('');
    }

    public static fromNumber(number: number): Array<HebrewAlphabetLetter> {
        if (_.isNaN(number) || number <= 0 || !Number.isInteger(number)) {
            return [];
        }

        if (_.isNil(HebrewAlphabet.numbersArray)) {
            HebrewAlphabet.numbersArray = Array.from(HebrewAlphabet.names.values());
            HebrewAlphabet.numbersArray.sort((first, second) => (Number(first.number) > Number(second.number) ? -1 : 1));
        }
        let value = [];
        let index = 0;
        let items = HebrewAlphabet.numbersArray.concat();
        while (number > 0 || index > items.length - 1) {
            let item = items[index];
            let itemNumber = Number(item.number);
            if (number < itemNumber) {
                index++;
                continue;
            }
            if (item.isLast) {
                number -= itemNumber;
                value.push(item);
                items = items.filter(item => !item.isLast);
                continue;
            }
            let count = Math.floor(number / itemNumber);
            number = number % itemNumber;
            value.push(...Array(count).fill(item));
        }
        value = value.reverse();
        return value;
    }

    public static toNumber(items: HebrewAlphabetLetter | Array<HebrewAlphabetLetter>): number {
        if (!_.isArray(items)) {
            items = [items];
        }
        let value = 0;
        items.forEach(item => (value += Number(item.number)));
        return value;
    }

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private static _letters: Array<HebrewAlphabetLetter>;

    private static _names: Map<HebrewAlphabetName, HebrewAlphabetLetter>;
    private static _values: Map<HebrewAlphabetValue, HebrewAlphabetLetter>;
    private static _numbers: Map<HebrewAlphabetNumber, HebrewAlphabetLetter>;

    private static numbersArray: Array<HebrewAlphabetLetter>;

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public static get letters(): Array<HebrewAlphabetLetter> {
        if (_.isNil(this._letters)) {
            this._letters = [
                new HebrewAlphabetLetter(HebrewAlphabetName.ALEPH, '1', 'א', HebrewAlphabetType.MOTHER),
                new HebrewAlphabetLetter(HebrewAlphabetName.BET, '2', 'ב', HebrewAlphabetType.DOUBLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.GIMEL, '3', 'ג', HebrewAlphabetType.DOUBLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.DALET, '4', 'ד', HebrewAlphabetType.DOUBLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.HE, '5', 'ה', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.WAW, '6', 'ו', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.ZAYIN, '7', 'ז', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.HETH, '8', 'ח', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.TETH, '9', 'ט', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.YODH, '10', 'י', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.KAPH, '20', 'כ', HebrewAlphabetType.DOUBLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.KAPH_LAST, '500', 'ך', HebrewAlphabetType.DOUBLE, true),
                new HebrewAlphabetLetter(HebrewAlphabetName.LAMED, '30', 'ל', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.MEM, '40', 'מ', HebrewAlphabetType.MOTHER),
                new HebrewAlphabetLetter(HebrewAlphabetName.MEM_LAST, '600', 'ם', HebrewAlphabetType.MOTHER, true),
                new HebrewAlphabetLetter(HebrewAlphabetName.NUN, '50', 'נ', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.NUN_LAST, '700', 'ן', HebrewAlphabetType.SIMPLE, true),
                new HebrewAlphabetLetter(HebrewAlphabetName.SAMEKH, '60', 'ס', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.AYIN, '70', 'ע', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.PE, '80', 'פ', HebrewAlphabetType.DOUBLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.PE_LAST, '800', 'ף', HebrewAlphabetType.DOUBLE, true),
                new HebrewAlphabetLetter(HebrewAlphabetName.TSADHE, '90', 'צ', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.TSADHE_LAST, '900', 'ץ', HebrewAlphabetType.SIMPLE, true),
                new HebrewAlphabetLetter(HebrewAlphabetName.QOPH, '100', 'ק', HebrewAlphabetType.SIMPLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.RESH, '200', 'ר', HebrewAlphabetType.DOUBLE),
                new HebrewAlphabetLetter(HebrewAlphabetName.SHIN, '300', 'ש', HebrewAlphabetType.MOTHER),
                new HebrewAlphabetLetter(HebrewAlphabetName.TAW, '400', 'ת', HebrewAlphabetType.DOUBLE),

                new HebrewAlphabetLetter(HebrewAlphabetName.ZER0, '0', ' ', HebrewAlphabetType.SIMPLE)
            ];

            _.find(this._letters, { name: HebrewAlphabetName.KAPH }).last = _.find(this._letters, { name: HebrewAlphabetName.KAPH_LAST });
            _.find(this._letters, { name: HebrewAlphabetName.MEM }).last = _.find(this._letters, { name: HebrewAlphabetName.MEM_LAST });
            _.find(this._letters, { name: HebrewAlphabetName.NUN }).last = _.find(this._letters, { name: HebrewAlphabetName.NUN_LAST });
            _.find(this._letters, { name: HebrewAlphabetName.PE }).last = _.find(this._letters, { name: HebrewAlphabetName.PE_LAST });
            _.find(this._letters, { name: HebrewAlphabetName.TSADHE }).last = _.find(this._letters, { name: HebrewAlphabetName.TSADHE_LAST });
        }
        return this._letters;
    }

    public static get names(): Map<HebrewAlphabetName, HebrewAlphabetLetter> {
        if (_.isNil(this._names)) {
            this._names = new Map();
            HebrewAlphabet.letters.forEach(item => this._names.set(item.name, item));
        }
        return this._names;
    }

    public static get values(): Map<HebrewAlphabetValue, HebrewAlphabetLetter> {
        if (_.isNil(this._values)) {
            this._values = new Map();
            HebrewAlphabet.letters.forEach(item => this._values.set(item.value, item));
        }
        return this._values;
    }

    public static get numbers(): Map<HebrewAlphabetNumber, HebrewAlphabetLetter> {
        if (_.isNil(this._numbers)) {
            this._numbers = new Map();
            HebrewAlphabet.letters.forEach(item => this._numbers.set(item.number, item));
        }
        return this._numbers;
    }
}

export enum HebrewAlphabetName {
    ALEPH = '1',
    BET = '2',
    GIMEL = '3',
    DALET = '4',
    HE = '5',
    WAW = '6',
    ZAYIN = '7',
    HETH = '8',
    TETH = '9',
    YODH = '10',
    KAPH = '20',
    KAPH_LAST = '500',
    LAMED = '30',
    MEM = '40',
    MEM_LAST = '600',
    NUN = '50',
    NUN_LAST = '700',
    SAMEKH = '60',
    AYIN = '70',
    PE = '80',
    PE_LAST = '800',
    TSADHE = '90',
    TSADHE_LAST = '900',
    QOPH = '100',
    RESH = '200',
    SHIN = '300',
    TAW = '400',

    ZER0 = '0'
}

export type HebrewAlphabetValue =
    | 'א'
    | 'ב'
    | 'ג'
    | 'ד'
    | 'ה'
    | 'ו'
    | 'ז'
    | 'ח'
    | 'ט'
    | 'י'
    | 'כ'
    | 'ך' // Last
    | 'ל'
    | 'מ'
    | 'ם' // Last
    | 'נ'
    | 'ן' // Last
    | 'ס'
    | 'ע'
    | 'פ'
    | 'ף' // Last
    | 'צ'
    | 'ץ' // Last
    | 'ק'
    | 'ר'
    | 'ש'
    | 'ת'
    | ' ';

export type HebrewAlphabetNumber =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '20'
    | '30'
    | '40'
    | '50'
    | '60'
    | '70'
    | '80'
    | '90'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '0';

export enum HebrewAlphabetType {
    ALL = 'ALL',
    MOTHER = 'MOTHER',
    DOUBLE = 'DOUBLE',
    SIMPLE = 'SIMPLE'
}

export class HebrewAlphabetLetter {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public last: HebrewAlphabetLetter;
    public isLast: boolean;

    private _name: HebrewAlphabetName;
    private _type: HebrewAlphabetType;
    private _number: HebrewAlphabetNumber;
    private _value: HebrewAlphabetValue;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: HebrewAlphabetName, number: HebrewAlphabetNumber, value: HebrewAlphabetValue, type: HebrewAlphabetType, isLast: boolean = false) {
        this._name = name;
        this._type = type;
        this._value = value;
        this._number = number;
        this.isLast = isLast;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get type(): HebrewAlphabetType {
        return this._type;
    }

    public get name(): HebrewAlphabetName {
        return this._name;
    }

    public get label(): string {
        return this.value;
    }

    public get number(): HebrewAlphabetNumber {
        return this._number;
    }

    public get value(): HebrewAlphabetValue {
        return this._value;
    }
}

export class HebrewAlphabetWord {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _value: string;
    private _number: number;
    private _letters: Array<HebrewAlphabetLetter>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(item: HebrewAlphabetWordInput) {
        if (_.isString(item)) {
            this._letters = HebrewAlphabet.fromString(item);
        }
        else if (_.isNumber(item)) {
            this._letters = HebrewAlphabet.fromNumber(item);
        }
        else {
            this._letters = item
        }
        this._value = HebrewAlphabet.toString(this._letters);
        this._number = HebrewAlphabet.toNumber(this._letters);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get number(): number {
        return this._number;
    }

    public get value(): string {
        return this._value;
    }

    public get letters(): Array<HebrewAlphabetLetter> {
        return this._letters;
    }
}

export type HebrewAlphabetWordInput = string | number | Array<HebrewAlphabetLetter>;

