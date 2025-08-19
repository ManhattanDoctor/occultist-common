
import { HebrewAlphabetLetter } from '../entity';
import { ILetter, Letter } from './ILetter';
import * as _ from 'lodash';

export interface IGematriaLetter<T = string> extends ILetter<T> {
    readonly hebrew: HebrewAlphabetLetter;
}

export class GematriaLetter<T> extends Letter<T> implements IGematriaLetter<T> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _label: string;
    protected _lower: string;
    protected _upper: string;

    protected _hebrew: HebrewAlphabetLetter;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(value: T, hebrew: HebrewAlphabetLetter) {
        super(value);
        this._hebrew = hebrew;

        this._label = value.toString();
        this._lower = _.lowerCase(value.toString());
        this._upper = _.upperCase(value.toString());
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public isMatch(value: string): boolean {
        return _.lowerCase(value) === this.lower;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get label(): string {
        return this._label;
    }

    public get lower(): string {
        return this._lower;
    }

    public get upper(): string {
        return this._upper;
    }

    public get hebrew(): HebrewAlphabetLetter {
        return this._hebrew;
    }
}
