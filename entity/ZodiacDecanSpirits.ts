import { FilterableMapCollection } from '@ts-core/common';
import { Zodiac, Zodiacs } from './Zodiacs';
import { ZodiacAngleSpirit, ZodiacAngleSpirits } from './ZodiacAngleSpirits';
import { Demon, Demons } from './Demons';
import { Entity } from './IEntity';
import { DayTimeRange, ITimeRange } from './TimeRange';

export type ZodiacDecanSpiritName = string;

export class ZodiacDecanSpirit extends Entity<ZodiacDecanSpiritName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public degree: string;
    public zodiac: Zodiac;
    public demons: Array<Demon>;
    public angleSpirits: Array<ZodiacAngleSpirit>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: ZodiacDecanSpiritName | number, public timeRange: ITimeRange) {
        super(name.toString());
    }
}

export class ZodiacDecanSpirits extends FilterableMapCollection<ZodiacDecanSpirit> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(zodiacs: Zodiacs, zodiacAngles: ZodiacAngleSpirits, demons: Demons) {
        super('name');

        let timeRanges = [
            new DayTimeRange({ date: 21, month: 2 }, { date: 30, month: 2 }),
            new DayTimeRange({ date: 31, month: 2 }, { date: 9, month: 3 }),
            new DayTimeRange({ date: 10, month: 3 }, { date: 20, month: 3 }),
            new DayTimeRange({ date: 21, month: 3 }, { date: 30, month: 3 }),
            new DayTimeRange({ date: 31, month: 3 }, { date: 9, month: 4 }),
            new DayTimeRange({ date: 10, month: 4 }, { date: 21, month: 4 }),
            new DayTimeRange({ date: 22, month: 4 }, { date: 31, month: 4 }),
            new DayTimeRange({ date: 1, month: 5 }, { date: 10, month: 5 }),
            new DayTimeRange({ date: 11, month: 5 }, { date: 21, month: 5 }),
            new DayTimeRange({ date: 22, month: 5 }, { date: 1, month: 6 }),
            new DayTimeRange({ date: 2, month: 6 }, { date: 11, month: 6 }),
            new DayTimeRange({ date: 12, month: 6 }, { date: 23, month: 6 }),
            new DayTimeRange({ date: 24, month: 6 }, { date: 2, month: 7 }),
            new DayTimeRange({ date: 3, month: 7 }, { date: 12, month: 7 }),
            new DayTimeRange({ date: 13, month: 7 }, { date: 23, month: 7 }),
            new DayTimeRange({ date: 24, month: 7 }, { date: 2, month: 8 }),
            new DayTimeRange({ date: 3, month: 8 }, { date: 12, month: 8 }),
            new DayTimeRange({ date: 13, month: 8 }, { date: 23, month: 8 }),
            new DayTimeRange({ date: 24, month: 8 }, { date: 3, month: 9 }),
            new DayTimeRange({ date: 4, month: 9 }, { date: 13, month: 9 }),
            new DayTimeRange({ date: 14, month: 9 }, { date: 23, month: 9 }),
            new DayTimeRange({ date: 24, month: 9 }, { date: 2, month: 10 }),
            new DayTimeRange({ date: 3, month: 10 }, { date: 12, month: 10 }),
            new DayTimeRange({ date: 13, month: 10 }, { date: 22, month: 10 }),
            new DayTimeRange({ date: 23, month: 10 }, { date: 2, month: 11 }),
            new DayTimeRange({ date: 3, month: 11 }, { date: 12, month: 11 }),
            new DayTimeRange({ date: 13, month: 11 }, { date: 21, month: 11 }),
            new DayTimeRange({ date: 22, month: 11 }, { date: 31, month: 11 }),
            new DayTimeRange({ date: 1, month: 0 }, { date: 10, month: 0 }),
            new DayTimeRange({ date: 11, month: 0 }, { date: 20, month: 0 }),
            new DayTimeRange({ date: 21, month: 0 }, { date: 30, month: 0 }),
            new DayTimeRange({ date: 31, month: 0 }, { date: 9, month: 1 }),
            new DayTimeRange({ date: 10, month: 1 }, { date: 19, month: 1 }),
            new DayTimeRange({ date: 20, month: 1 }, { date: 29, month: 1 }),
            new DayTimeRange({ date: 30, month: 1 }, { date: 9, month: 2 }),
            new DayTimeRange({ date: 10, month: 2 }, { date: 20, month: 2 })
        ];

        for (let i = 0; i < 36; i++) {
            let item = this.add(new ZodiacDecanSpirit(i + 1, timeRanges[i]));
            item.degree = item.icon = `${i * 10 + 1}-${i * 10 + 10}°`;
            item.zodiac = zodiacs.collection[Math.floor(i / 3)];
            item.zodiac.decanSpirits.push(item);

            item.demons = demons.collection.slice(i * 2, i * 2 + 2);
            item.angleSpirits = zodiacAngles.collection.slice(i * 10, (i + 1) * 10);

            item.angleSpirits.forEach(spirit => spirit.decanSpirit = item);
            for (let demon of item.demons) {
                demon.zodiacDecanSpirit = item;
                demon.addLink(item);
            }
        }
    }
}


