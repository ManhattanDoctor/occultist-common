export * from './TarotSpread';

import { RandomGenerator } from '../util';

export function getTarotSpreadIndexes(seed: string): Array<number> {
    let length = 78;
    let indexes: Array<number> = new Array();
    let generator = new RandomGenerator(seed);
    while (indexes.length < length) {
        let index = generator.integerFromZeroTo(length);
        if (!indexes.includes(index)) {
            indexes.push(index);
        }
    }
    return indexes;
}
