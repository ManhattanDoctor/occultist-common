import { IDestroyable } from '@ts-core/common';
import * as _ from 'lodash';
import * as RandomSeed from 'random-seed';

export class RandomGenerator implements IDestroyable {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    protected item: RandomSeed;

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    constructor(seed?: string) {
        this.item = new RandomSeed(seed);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public string(length: number): string {
        return this.item.string(length);
    }

    public seed(seed: string): void {
        return this.item.seed(seed);
    }

    public reset(): void {
        return this.item.initState();
    }

    public integerFromZeroTo(max: number): number {
        return this.item.range(max);
    }

    public integerBetween(min: number, max: number): number {
        return this.item.intBetween(min, max);
    }

    public floatFromZeroToOne(): number {
        return this.item.random();
    }
    
    public floatBetween(min: number, max: number): number {
        return this.item.floatBetween(min, max);
    }

    public destroy(): void {
        if (_.isNil(this.item)) {
            return;
        }
        this.item.done();
        this.item = null;
    }
}
