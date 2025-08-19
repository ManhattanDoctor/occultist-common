import { ObservableData, LoadableEvent, ArrayUtil, LoadableStatus, MathUtil } from '@ts-core/common';
import * as _ from 'lodash';
import { Converter } from './Converter';
import { IGematriaLetter } from './GematriaLetter';
import { HebrewAlphabet, HebrewAlphabetLetter, HebrewAlphabetValue } from '../entity';

export abstract class HebrewConverter<T extends IGematriaLetter = IGematriaLetter> extends Converter<T, void> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _hebrewText: string;
    protected _hebrewLetters: Array<HebrewAlphabetLetter>;

    protected _hebrewNumber: string;
    protected _hebrewNumberReduction: HebrewReductionNumber;
    protected _hebrewNumberReductionIsEqual: boolean;
    protected _hebrewNumberCalculation: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(locale: HebrewConverterLocale) {
        super(locale);
        this._hebrewLetters = new Array();
    }

    //--------------------------------------------------------------------------
    //
    // 	Parser Methods
    //
    //--------------------------------------------------------------------------

    protected toHebrew(value: string): string {
        if (_.isEmpty(value)) {
            return null;
        }
        let hebrew = _.lowerCase(value);
        this.letters.collection.forEach(item => hebrew = hebrew.replace(new RegExp(item.value, 'g'), item.hebrew.value));

        let words = hebrew.replace(HebrewAlphabet.PARSER, '').split(' ');
        for (let i = words.length - 1; i > -1; i--) {
            let item = words[i];
            let length = item.length;
            if (length < 2) {
                continue;
            }
            let char = item.substr(length - 1, 1) as HebrewAlphabetValue;
            let letter = HebrewAlphabet.values.get(char);
            if (!_.isNil(letter.last)) {
                words.splice(i, 1, item.substr(0, length - 1) + letter.last.value);
            }
        }
        return words.join(' ').trim();
    }

    protected toHebrewLetters(value: string): Array<HebrewAlphabetLetter> {
        if (_.isEmpty(value)) {
            return null;
        }
        let items = new Array();
        for (var i = 0; i < value.length; i++) {
            items.push(HebrewAlphabet.values.get(value.charAt(i) as HebrewAlphabetValue));
        }
        return items.reverse();
    }

    protected toHebrewNumberCalculation(value: string): IHebrewNumber {
        if (_.isEmpty(value)) {
            return null;
        }

        value = value.replace(' ', '');

        let number = '0';
        let calculation = '';
        for (let i = 0; i < value.length; i++) {
            // let letter = this.hebrew.letters.get(value[i]);
            let letter = HebrewAlphabet.values.get(value[i] as HebrewAlphabetValue);
            if (!_.isNil(letter)) {
                number = MathUtil.add(number, letter.number);
                calculation += letter.number;
                if (i < value.length - 1) {
                    calculation += ' + ';
                }
            } else {
                calculation += ' ';
            }
        }
        calculation = `${_.trim(calculation)} = ${number}`;
        return { number, calculation };
    }

    protected toHebrewReduction(value: IHebrewNumber): IHebrewNumberReduction {
        if (_.isNil(value)) {
            return null;
        }
        let reduction = value.number;
        let calculation = '';
        while (MathUtil.greaterThan(reduction, '10')) {
            let number = '0';
            for (let i = 0; i < reduction.length; i++) {
                let item = reduction[i];
                number = MathUtil.add(number, item);

                calculation += item;
                if (i < reduction.length - 1) {
                    calculation += ' + ';
                }
            }
            calculation += ' = ';
            reduction = number;
        }
        calculation += `${reduction}`;
        return { number: reduction as HebrewReductionNumber, calculation };
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitTextProperties(): void {
        let value = null;

        value = this.parse(this.text);
        this.hebrewText = this.toHebrew(value);
    }

    protected commitHebrewTextProperties(): void {
        if (!_.isEmpty(this.hebrewText)) {
            let number = this.toHebrewNumberCalculation(this.hebrewText);
            let numberReduction = this.toHebrewReduction(number);

            this._hebrewLetters = this.toHebrewLetters(this.hebrewText);

            this._hebrewNumber = number.number;
            this._hebrewNumberCalculation = number.calculation;

            if (!_.isNil(numberReduction)) {
                this._hebrewNumberReduction = numberReduction.number;
                this._hebrewNumberCalculation += ` = ${numberReduction.calculation}`;
            } else {
                this._hebrewNumberReduction = null;
            }
        } else {
            this._hebrewNumber = null;
            this._hebrewNumberReduction = null;
            this._hebrewNumberCalculation = null;
            ArrayUtil.clear(this._hebrewLetters);
        }

        this._hebrewNumberReductionIsEqual = this._hebrewNumberReduction === this._hebrewNumber;

        this.status = LoadableStatus.LOADED;
        this.observer.next(new ObservableData(LoadableEvent.COMPLETE));
        this.observer.next(new ObservableData(LoadableEvent.FINISHED));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public get hebrewText(): string {
        return this._hebrewText;
    }
    public set hebrewText(value: string) {
        if (value === this._hebrewText) {
            return;
        }
        this._hebrewText = value;
        this.commitHebrewTextProperties();
    }

    public get hebrewLetters(): Array<HebrewAlphabetLetter> {
        return this._hebrewLetters;
    }

    public get hebrewNumber(): string {
        return this._hebrewNumber;
    }

    public get hebrewNumberCalculation(): string {
        return this._hebrewNumberCalculation;
    }

    public get hebrewNumberReduction(): HebrewReductionNumber {
        return this._hebrewNumberReduction;
    }

    public get hebrewNumberReductionIsEqual(): boolean {
        return this._hebrewNumberReductionIsEqual;
    }
}

export interface IHebrewNumber {
    number: string;
    calculation: string;
}

export interface IHebrewNumberReduction {
    number: HebrewReductionNumber;
    calculation: string;
}

export type HebrewReductionNumber = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

export enum HebrewConverterLocale {
    HEBREW = 'he',
    GREEK = 'el',
    LATIN = 'lt',
    RUSSIAN = 'ru',
    NUMERIC = 'numeric',
}
