import { ArrayUtil, FilterableMapCollection, FilterFunction } from '@ts-core/common';
import { NatureName, Nature, Natures } from './Natures';
import { Planet, PlanetName, Planets } from './Planets';
import moment, { Moment } from 'moment';
import * as _ from 'lodash';
import { Entity } from './IEntity';
import { DayTimeRange, ITimeRange } from './TimeRange';

export enum ZodiacName {
    ARIES = '1',
    TAURUS = '2',
    GEMINI = '3',
    CANCER = '4',
    LEO = '5',
    VIRGO = '6',
    LIBRA = '7',
    SCORPIO = '8',
    SAGITTARIUS = '9',
    CAPRICORNUS = '10',
    AQUARIUS = '11',
    PISCES = '12'
}

export enum ZodiacType {
    CARDINAL = 'CARDINAL',
    FIXED = 'FIXED',
    MUTABLE = 'MUTABLE'
}

export enum ZodiacSex {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export class Zodiac extends Entity<ZodiacName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public degree: string;
    public demons: Array<Entity> = new Array();
    public geniuses: Array<Entity> = new Array();
    public sefiras: Array<Entity> = new Array();
    public angleSpirits: Array<Entity> = new Array();
    public decanSpirits: Array<Entity> = new Array();

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        name: ZodiacName,
        icon: string,
        public type: ZodiacType,
        public sex: ZodiacSex,
        public timeRange: ITimeRange,
        public nature: Nature,
        public dignity: Array<Planet>,
        public exaltation: Planet,
        public detriment: Planet,
        public fall?: Planet
    ) {
        super(name, icon);

        nature.addToItems(this, nature.zodiacs);

        dignity.forEach(item => item.dignity.push(this));
        detriment.detriment = this;
        exaltation.exaltation = this;
        if (!_.isNil(fall)) {
            fall.fall = this;
        }
    }
}

export class Zodiacs extends FilterableMapCollection<Zodiac> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(natures: Natures, planets: Planets) {
        super('name');

        this.add(
            new Zodiac(
                ZodiacName.ARIES,
                'a',
                ZodiacType.CARDINAL,
                ZodiacSex.MALE,
                new DayTimeRange({ date: 21, month: 2 }, { date: 20, month: 3 }),
                natures.get(NatureName.FIRE),
                [planets.get(PlanetName.MARS), planets.get(PlanetName.PLUTO)],
                planets.get(PlanetName.SUN),
                planets.get(PlanetName.VENUS),
                planets.get(PlanetName.SATURN)
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.TAURUS,
                'b',
                ZodiacType.FIXED,
                ZodiacSex.FEMALE,
                new DayTimeRange({ date: 21, month: 3 }, { date: 21, month: 4 }),
                natures.get(NatureName.EARTH),
                [planets.get(PlanetName.VENUS)],
                planets.get(PlanetName.MOON),
                planets.get(PlanetName.MARS),
                null
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.GEMINI,
                'c',
                ZodiacType.MUTABLE,
                ZodiacSex.MALE,
                new DayTimeRange({ date: 22, month: 4 }, { date: 21, month: 5 }),
                natures.get(NatureName.AIR),
                [planets.get(PlanetName.MERCURY)],
                planets.get(PlanetName.MERCURY),
                planets.get(PlanetName.JUPITER),
                null
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.CANCER,
                'd',
                ZodiacType.CARDINAL,
                ZodiacSex.FEMALE,
                new DayTimeRange({ date: 22, month: 5 }, { date: 23, month: 6 }),
                natures.get(NatureName.WATER),
                [planets.get(PlanetName.MOON)],
                planets.get(PlanetName.JUPITER),
                planets.get(PlanetName.SATURN),
                planets.get(PlanetName.MARS)
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.LEO,
                'e',
                ZodiacType.FIXED,
                ZodiacSex.MALE,
                new DayTimeRange({ date: 24, month: 6 }, { date: 23, month: 7 }),
                natures.get(NatureName.FIRE),
                [planets.get(PlanetName.SUN)],
                planets.get(PlanetName.PLUTO),
                planets.get(PlanetName.SATURN),
                null
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.VIRGO,
                'f',
                ZodiacType.MUTABLE,
                ZodiacSex.FEMALE,
                new DayTimeRange({ date: 24, month: 7 }, { date: 23, month: 8 }),
                natures.get(NatureName.EARTH),
                [planets.get(PlanetName.MERCURY)],
                planets.get(PlanetName.MERCURY),
                planets.get(PlanetName.JUPITER),
                planets.get(PlanetName.VENUS)
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.LIBRA,
                'g',
                ZodiacType.CARDINAL,
                ZodiacSex.MALE,
                new DayTimeRange({ date: 24, month: 8 }, { date: 23, month: 9 }),
                natures.get(NatureName.AIR),
                [planets.get(PlanetName.VENUS)],
                planets.get(PlanetName.SATURN),
                planets.get(PlanetName.MARS),
                planets.get(PlanetName.SUN)
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.SCORPIO,
                'h',
                ZodiacType.FIXED,
                ZodiacSex.FEMALE,
                new DayTimeRange({ date: 24, month: 9 }, { date: 22, month: 10 }),
                natures.get(NatureName.WATER),
                [planets.get(PlanetName.MARS), planets.get(PlanetName.PLUTO)],
                planets.get(PlanetName.URANUS),
                planets.get(PlanetName.VENUS),
                planets.get(PlanetName.MOON)
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.SAGITTARIUS,
                'i',
                ZodiacType.MUTABLE,
                ZodiacSex.MALE,
                new DayTimeRange({ date: 23, month: 10 }, { date: 21, month: 11 }),
                natures.get(NatureName.FIRE),
                [planets.get(PlanetName.JUPITER), planets.get(PlanetName.NEPTUNE)],
                planets.get(PlanetName.VENUS),
                planets.get(PlanetName.MERCURY),
                null
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.CAPRICORNUS,
                'j',
                ZodiacType.CARDINAL,
                ZodiacSex.FEMALE,
                new DayTimeRange({ date: 22, month: 11 }, { date: 20, month: 0 }),
                natures.get(NatureName.EARTH),
                [planets.get(PlanetName.SATURN), planets.get(PlanetName.URANUS)],
                planets.get(PlanetName.MARS),
                planets.get(PlanetName.MOON),
                planets.get(PlanetName.JUPITER)
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.AQUARIUS,
                'k',
                ZodiacType.FIXED,
                ZodiacSex.MALE,
                new DayTimeRange({ date: 21, month: 0 }, { date: 19, month: 1 }),
                natures.get(NatureName.AIR),
                [planets.get(PlanetName.SATURN), planets.get(PlanetName.URANUS)],
                planets.get(PlanetName.NEPTUNE),
                planets.get(PlanetName.SUN),
                null
            )
        );
        this.add(
            new Zodiac(
                ZodiacName.PISCES,
                'l',
                ZodiacType.MUTABLE,
                ZodiacSex.FEMALE,
                new DayTimeRange({ date: 20, month: 1 }, { date: 20, month: 2 }),
                natures.get(NatureName.WATER),
                [planets.get(PlanetName.JUPITER), planets.get(PlanetName.NEPTUNE)],
                planets.get(PlanetName.VENUS),
                planets.get(PlanetName.MERCURY),
                planets.get(PlanetName.MERCURY)
            )
        );

        for (let i = 0; i < 12; i++) {
            this.collection[i].degree = `${i * 30 + 1}-${i * 30 + 30}°`;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public getByDate(date: Date | Moment): Zodiac {
        if (_.isNil(date)) {
            return null;
        }
        if (!moment.isMoment(date)) {
            date = moment(date);
        }
        let value = { date: date.date(), month: date.month() };
        for (let item of this.collection) {
            if (DayTimeRange.isBetween(value, item.timeRange)) {
                return item;
            }
        }
        return null;
    }

    public setFilter(item: ZodiacFilterFunction): void {
        ArrayUtil.clear(this.filters);
        this.filters.push(item);
        this.refresh();
    }
}

export type ZodiacFilterFunction = FilterFunction<Zodiac>;
