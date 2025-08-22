import { MapCollection, Loadable } from '@ts-core/common';
import { ILetter } from './ILetter';
import { IConverter } from './IConverter';
import * as _ from 'lodash';

export abstract class Converter<U extends ILetter, L = string, V = void> extends Loadable<void, V> implements IConverter {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    private static compare(first: ILetter, second: ILetter): number {
        if (first.value.length === second.value.length) {
            return first.value < second.value ? -1 : 1;
        }
        return first.value.length > second.value.length ? -1 : 1;
    }

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _text: string;
    protected _number: string;
    protected _locale: L;
    protected _parser: RegExp;
    protected _validator: RegExp;

    protected letters: MapCollection<U>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(locale: L) {
        super();

        this._locale = locale;
        this.letters = new MapCollection('value');
        _.forEach(this.getLetters().sort(Converter.compare), item => this.letters.add(item));
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected abstract getLetters(): Array<U>;

    protected commitTextProperties(): void { }

    protected commitNumberProperties(): void { }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public parse(value: string): string {
        if (_.isNil(value)) {
            return '';
        }
        return !_.isNil(this.parser) ? value.replace(this.parser, '') : value;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get locale(): L {
        return this._locale;
    }

    public get parser(): RegExp {
        return this._parser;
    }

    public get validator(): RegExp {
        return this._validator;
    }

    public get number(): string {
        return this._number;
    }
    public set number(value: string) {
        if (value === this._number) {
            return;
        }
        this._number = value;
        if (!_.isNil(value)) {
            this.commitNumberProperties();
        }
    }

    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        if (value === this._text) {
            return;
        }
        this._text = value;
        if (!_.isNil(value)) {
            this.commitTextProperties();
        }
    }
}


