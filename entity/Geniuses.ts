import { FilterableMapCollection, FilterFunction } from '@ts-core/common';
import { Nature } from './Natures';
import { Zodiac } from './Zodiacs';
import { ArrayUtil } from '@ts-core/common';
import { Demon, Demons, DemonType } from './Demons';
import { ZodiacAngleSpirit } from './ZodiacAngleSpirits';
import { Planet } from './Planets';
import { Ahet, Ahets } from './Ahets';
import { Entity } from './IEntity';
import { ITimeRange } from './TimeRange';

export class Genius extends Entity<GeniusName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public pair: Genius
    public demon: Demon;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: GeniusName) {
        super(name, '✝');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get type(): DemonType {
        return this.demon.type;
    }
    public get ahet(): Ahet {
        return this.demon.ahet;
    }
    public get timeRange(): ITimeRange {
        return this.demon.timeRange;
    }
    public get nature(): Nature {
        return this.demon.nature;
    }
    public get status(): Planet {
        return this.demon.status;
    }
    public get zodiac(): Zodiac {
        return this.demon.zodiac;
    }
    public get planet(): Planet {
        return this.demon.planet;
    }
    public get zodiacSpirits(): Array<ZodiacAngleSpirit> {
        return this.demon.zodiacSpirits;
    }
}

export class Geniuses extends FilterableMapCollection<Genius> {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(demons: Demons, ahets: Ahets) {
        super('name');
        for (let item of Object.values(GeniusName)) {
            this.add(new Genius(item));
        }
        for (let i = 0; i < this.collection.length; i++) {
            let item = this.collection[i];
            item.demon = demons.collection[i];
            if (i < 36) {
                let pair = item.pair = this.collection[i + 36];
                pair.pair = item;
            }

            item.nature.addToItems(item, item.nature.geniuses);
            item.status.addToItems(item, item.status.geniuses);
            item.zodiac.addToItems(item, item.zodiac.geniuses);

            item.zodiacSpirits.forEach(spirit => spirit.genius = item);
            item.demon.genius = item;

            let ahet = ahets.collection[i < 36 ? i : i - 36];
            ahet.addGenius(item);
            ahet.addDemon(item.demon);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public setFilter(item: GeniusFilterFunction): void {
        ArrayUtil.clear(this.filters);
        this.filters.push(item);
        this.refresh();
    }
}

export type GeniusFilterFunction = FilterFunction<Genius>;

export enum GeniusName {
    VEHUIAH = '1',
    JELIELL = '2',
    SITAEL = '3',
    ELEMIAH = '4',
    MAHASIAH = '5',
    LELAHEL = '6',
    ACHAIAH = '7',
    CAHETHEL = '8',
    HAZIEL = '9',
    ALADIAH = '10',
    LAUVIAH = '11',
    HAHAIAH = '12',
    IEZALEL = '13',
    MEBAHEL = '14',
    HARIEL = '15',
    HEKAMIAH = '16',
    LEVIAH = '17',
    CALIAEL = '18',
    LEUVIAH = '19',
    PAHALIAH = '20',
    NELCHAEL = '21',
    YEIAYEL = '22',
    MELAHEL = '23',
    HAHEUIAH = '24',
    NITHAIAH = '25',
    HAAIAH = '26',
    YERATHEL = '27',
    SEHEIAH = '28',
    REYIEL = '29',
    OMAEL = '30',
    LACABEL = '31',
    VASARIAH = '32',
    YEHUYAH = '33',
    LEHAHIAH = '34',
    CHAVAKIAH = '35',
    MENADEL = '36',
    ANIEL = '37',
    HAAMIAH = '38',
    REHAEL = '39',
    YEIAZEL = '40',
    HAHAHEL = '41',
    MIKAEL = '42',
    VEULIAH = '43',
    YELALIAH = '44',
    SEALIAH = '45',
    ARIEL = '46',
    ASALIAH = '47',
    MIHAEL = '48',
    VEHUEL = '49',
    DANIEL = '50',
    HAHASIAH = '51',
    IMAMIAH = '52',
    NANAEL = '53',
    NITHAEL = '54',
    MEBAHIAH = '55',
    POYEL = '56',
    NEMAMIAH = '57',
    YEIALEL = '58',
    HARAEL = '59',
    MITZRAEL = '60',
    UMABEL = '61',
    IAHEL = '62',
    ANAUEL = '63',
    MEHIEL = '64',
    DAMABIAH = '65',
    MANAKEL = '66',
    EYAEL = '67',
    HABUHUAH = '68',
    ROCHEL = '69',
    JABAMIAH = '70',
    HAIAIEL = '71',
    MUMIAH = '72',
}