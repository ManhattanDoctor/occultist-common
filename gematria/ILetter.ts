export interface ILetter<T = string> {
    readonly value: T;
    isMatch(value: string): boolean;
    toString(): string;
}

export class Letter<T> implements ILetter<T> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _value: T;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(value: T) {
        this._value = value;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public isMatch(value: string): boolean {
        return this.value.toString() === value;
    }

    public toString(): string {
        return this.value.toString();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get value(): T {
        return this._value;
    }
}
