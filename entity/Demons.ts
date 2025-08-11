import { ArrayUtil, FilterableMapCollection, FilterFunction } from '@ts-core/common';
import { Zodiac, Zodiacs } from './Zodiacs';
import { Nature, NatureName, Natures } from './Natures';
import { Planet, PlanetName, Planets } from './Planets';
import { ZodiacAngleSpirit, ZodiacAngleSpirits } from './ZodiacAngleSpirits';
import { Ahet } from './Ahets';
import { Genius } from './Geniuses';
import { ZodiacDecanSpirit } from './ZodiacDecanSpirits';
import { Sin, SinName, Sins } from './Sins';
import * as _ from 'lodash';
import { Entity } from './IEntity';
import { DayTimeRange, ITimeRange } from './TimeRange';

export class Demon extends Entity<DemonName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public king: Demon;
    public ahet: Ahet;
    public pair: Demon
    public type: DemonType;
    public degree: string;
    public genius: Genius;
    public zodiac: Zodiac;

    public zodiacSpirits: Array<ZodiacAngleSpirit>;
    public zodiacDecanSpirit: ZodiacDecanSpirit;

    public demons: Array<Entity> = new Array();

    protected _sin: Sin;
    protected _similar: Array<Demon>;
    protected _entourage: Array<Demon>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: DemonName, public nature: Nature, public status: Planet, public planet: Planet, public timeRange: ITimeRange) {
        super(name, '✦');
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitSinProperties(): void {
        if (this.status.name === PlanetName.SUN) {
            this.sin.king = this;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public addSimilar(...items: Array<Demon>): void {
        for (let item of items) {
            if (this.similar.includes(item)) {
                continue;
            }
            this.similar.push(item);
        }
    }

    public addEntourage(...items: Array<Demon>): void {
        for (let item of items) {
            if (this.entourage.includes(item)) {
                continue;
            }
            item.sin = this.sin;
            item.king = this;
            this.entourage.push(item);
        }
    }

    public destroy(): void {
        super.destroy();
        this._sin = null;
        this._similar = null;
        this._entourage = null;
        this.zodiacSpirits = null;
        this.zodiacDecanSpirit = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get similar(): Array<Demon> {
        if (_.isNil(this._similar)) {
            this._similar = new Array();
        }
        return this._similar;
    }
    public get entourage(): Array<Demon> {
        if (_.isNil(this._entourage)) {
            this._entourage = new Array();
        }
        return this._entourage;
    }

    public get sin(): Sin {
        return this._sin;
    }
    public set sin(value: Sin) {
        this._sin = value;
        if (!_.isNil(value)) {
            this.commitSinProperties();
        }
    }
}

export class Demons extends FilterableMapCollection<Demon> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(natures: Natures, planets: Planets, private zodiacs: Zodiacs, private zodiacSpirits: ZodiacAngleSpirits, private sins: Sins) {
        super('name');
        this.add(new Demon(DemonName.BAEL, natures.get(NatureName.AIR), planets.get(PlanetName.SUN), planets.get(PlanetName.MARS), new DayTimeRange({ date: 21, month: 2 }, { date: 25, month: 2 })));
        this.add(new Demon(DemonName.AGARES, natures.get(NatureName.AIR), planets.get(PlanetName.VENUS), planets.get(PlanetName.MARS), new DayTimeRange({ date: 26, month: 2 }, { date: 30, month: 2 })));
        this.add(new Demon(DemonName.VASSAGO, natures.get(NatureName.AIR), planets.get(PlanetName.JUPITER), planets.get(PlanetName.SUN), new DayTimeRange({ date: 31, month: 2 }, { date: 4, month: 3 })));
        this.add(new Demon(DemonName.GAMIGIN, natures.get(NatureName.EARTH), planets.get(PlanetName.MOON), planets.get(PlanetName.SUN), new DayTimeRange({ date: 5, month: 3 }, { date: 9, month: 3 })));
        this.add(new Demon(DemonName.MARBAS, natures.get(NatureName.EARTH), planets.get(PlanetName.MERCURY), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 10, month: 3 }, { date: 14, month: 3 })));
        this.add(new Demon(DemonName.VELEFOR, natures.get(NatureName.EARTH), planets.get(PlanetName.VENUS), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 15, month: 3 }, { date: 20, month: 3 })));
        this.add(new Demon(DemonName.AMON, natures.get(NatureName.EARTH), planets.get(PlanetName.MOON), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 21, month: 3 }, { date: 25, month: 3 })));
        this.add(new Demon(DemonName.BARBATOS, natures.get(NatureName.EARTH), planets.get(PlanetName.VENUS), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 26, month: 3 }, { date: 30, month: 3 })));
        this.add(new Demon(DemonName.PAIMON, natures.get(NatureName.EARTH), planets.get(PlanetName.SUN), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 1, month: 4 }, { date: 5, month: 4 })));
        this.add(new Demon(DemonName.BUER, natures.get(NatureName.EARTH), planets.get(PlanetName.MERCURY), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 6, month: 4 }, { date: 10, month: 4 })));
        this.add(new Demon(DemonName.GUSION, natures.get(NatureName.EARTH), planets.get(PlanetName.VENUS), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 11, month: 4 }, { date: 15, month: 4 })));
        this.add(new Demon(DemonName.SITRI, natures.get(NatureName.EARTH), planets.get(PlanetName.JUPITER), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 16, month: 4 }, { date: 21, month: 4 })));
        this.add(new Demon(DemonName.BELETH, natures.get(NatureName.WATER), planets.get(PlanetName.SUN), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 22, month: 4 }, { date: 26, month: 4 })));
        this.add(new Demon(DemonName.LERAIE, natures.get(NatureName.WATER), planets.get(PlanetName.MOON), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 27, month: 4 }, { date: 31, month: 4 })));
        this.add(new Demon(DemonName.ELIGOS, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 1, month: 5 }, { date: 5, month: 5 })));
        this.add(new Demon(DemonName.ZEPAR, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 6, month: 5 }, { date: 10, month: 5 })));
        this.add(new Demon(DemonName.BOTIS, natures.get(NatureName.WATER), planets.get(PlanetName.MERCURY), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 11, month: 5 }, { date: 15, month: 5 })));
        this.add(new Demon(DemonName.BATHIN, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 16, month: 5 }, { date: 21, month: 5 })));
        this.add(new Demon(DemonName.SALLOS, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.MOON), new DayTimeRange({ date: 22, month: 5 }, { date: 26, month: 5 })));
        this.add(new Demon(DemonName.PURSON, natures.get(NatureName.WATER), planets.get(PlanetName.SUN), planets.get(PlanetName.MOON), new DayTimeRange({ date: 27, month: 5 }, { date: 1, month: 6 })));
        this.add(new Demon(DemonName.MARAX, natures.get(NatureName.WATER), planets.get(PlanetName.MARS), planets.get(PlanetName.MARS), new DayTimeRange({ date: 2, month: 6 }, { date: 6, month: 6 })));
        this.add(new Demon(DemonName.YPOS, natures.get(NatureName.FIRE), planets.get(PlanetName.JUPITER), planets.get(PlanetName.MARS), new DayTimeRange({ date: 7, month: 6 }, { date: 11, month: 6 })));
        this.add(new Demon(DemonName.AIM, natures.get(NatureName.FIRE), planets.get(PlanetName.VENUS), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 12, month: 6 }, { date: 16, month: 6 })));
        this.add(new Demon(DemonName.NABERIUS, natures.get(NatureName.FIRE), planets.get(PlanetName.MOON), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 17, month: 6 }, { date: 23, month: 6 })));
        this.add(new Demon(DemonName.GLASSYA_LABOLAS, natures.get(NatureName.FIRE), planets.get(PlanetName.MERCURY), planets.get(PlanetName.SUN), new DayTimeRange({ date: 24, month: 6 }, { date: 28, month: 6 })));
        this.add(new Demon(DemonName.BUNE, natures.get(NatureName.FIRE), planets.get(PlanetName.VENUS), planets.get(PlanetName.SUN), new DayTimeRange({ date: 29, month: 6 }, { date: 2, month: 7 })));
        this.add(new Demon(DemonName.RONOVE, natures.get(NatureName.FIRE), planets.get(PlanetName.VENUS), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 3, month: 7 }, { date: 7, month: 7 })));
        this.add(new Demon(DemonName.BERITH, natures.get(NatureName.FIRE), planets.get(PlanetName.VENUS), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 8, month: 7 }, { date: 12, month: 7 })));
        this.add(new Demon(DemonName.ASTAROT, natures.get(NatureName.FIRE), planets.get(PlanetName.VENUS), planets.get(PlanetName.MARS), new DayTimeRange({ date: 13, month: 7 }, { date: 17, month: 7 })));
        this.add(new Demon(DemonName.FORNEUS, natures.get(NatureName.FIRE), planets.get(PlanetName.MOON), planets.get(PlanetName.MARS), new DayTimeRange({ date: 18, month: 7 }, { date: 23, month: 7 })));
        this.add(new Demon(DemonName.FORAS, natures.get(NatureName.AIR), planets.get(PlanetName.MERCURY), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 24, month: 7 }, { date: 28, month: 7 })));
        this.add(new Demon(DemonName.ASMODAI, natures.get(NatureName.AIR), planets.get(PlanetName.SUN), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 29, month: 7 }, { date: 2, month: 8 })));
        this.add(new Demon(DemonName.GAAP, natures.get(NatureName.AIR), planets.get(PlanetName.MERCURY), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 3, month: 8 }, { date: 7, month: 8 })));
        this.add(new Demon(DemonName.FURFUR, natures.get(NatureName.AIR), planets.get(PlanetName.MARS), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 8, month: 8 }, { date: 12, month: 8 })));
        this.add(new Demon(DemonName.MARCHOSIAS, natures.get(NatureName.AIR), planets.get(PlanetName.MOON), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 13, month: 8 }, { date: 17, month: 8 })));
        this.add(new Demon(DemonName.STOLAS, natures.get(NatureName.AIR), planets.get(PlanetName.JUPITER), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 18, month: 8 }, { date: 23, month: 8 })));

        this.add(new Demon(DemonName.PHENEX, natures.get(NatureName.AIR), planets.get(PlanetName.MOON), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 24, month: 8 }, { date: 28, month: 8 })));
        this.add(new Demon(DemonName.HALPHAS, natures.get(NatureName.AIR), planets.get(PlanetName.MARS), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 29, month: 8 }, { date: 3, month: 9 })));
        this.add(new Demon(DemonName.MALPHAS, natures.get(NatureName.AIR), planets.get(PlanetName.MERCURY), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 4, month: 9 }, { date: 8, month: 9 })));
        this.add(new Demon(DemonName.RAUM, natures.get(NatureName.EARTH), planets.get(PlanetName.MARS), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 9, month: 9 }, { date: 13, month: 9 })));
        this.add(new Demon(DemonName.FOCALOR, natures.get(NatureName.EARTH), planets.get(PlanetName.VENUS), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 14, month: 9 }, { date: 18, month: 9 })));
        this.add(new Demon(DemonName.VEPAR, natures.get(NatureName.EARTH), planets.get(PlanetName.VENUS), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 19, month: 9 }, { date: 23, month: 9 })));
        this.add(new Demon(DemonName.SABNOK, natures.get(NatureName.EARTH), planets.get(PlanetName.MOON), planets.get(PlanetName.MARS), new DayTimeRange({ date: 24, month: 9 }, { date: 28, month: 9 })));
        this.add(new Demon(DemonName.SHAX, natures.get(NatureName.EARTH), planets.get(PlanetName.MOON), planets.get(PlanetName.MARS), new DayTimeRange({ date: 29, month: 9 }, { date: 2, month: 10 })));
        this.add(new Demon(DemonName.VINE, natures.get(NatureName.EARTH), planets.get(PlanetName.SUN), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 3, month: 10 }, { date: 7, month: 10 })));
        this.add(new Demon(DemonName.BIFRONS, natures.get(NatureName.EARTH), planets.get(PlanetName.MARS), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 8, month: 10 }, { date: 12, month: 10 })));
        this.add(new Demon(DemonName.VUAL, natures.get(NatureName.EARTH), planets.get(PlanetName.VENUS), planets.get(PlanetName.MOON), new DayTimeRange({ date: 13, month: 10 }, { date: 17, month: 10 })));
        this.add(new Demon(DemonName.HAAGENTI, natures.get(NatureName.EARTH), planets.get(PlanetName.MERCURY), planets.get(PlanetName.MOON), new DayTimeRange({ date: 18, month: 10 }, { date: 22, month: 10 })));
        this.add(new Demon(DemonName.CROCEL, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 23, month: 10 }, { date: 27, month: 10 })));
        this.add(new Demon(DemonName.FURCAS, natures.get(NatureName.WATER), planets.get(PlanetName.SATURN), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 28, month: 10 }, { date: 2, month: 11 })));
        this.add(new Demon(DemonName.BALAM, natures.get(NatureName.WATER), planets.get(PlanetName.SUN), planets.get(PlanetName.MARS), new DayTimeRange({ date: 3, month: 11 }, { date: 7, month: 11 })));
        this.add(new Demon(DemonName.ALLOCES, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.MARS), new DayTimeRange({ date: 8, month: 11 }, { date: 12, month: 11 })));
        this.add(new Demon(DemonName.CAMIO, natures.get(NatureName.WATER), planets.get(PlanetName.MERCURY), planets.get(PlanetName.SUN), new DayTimeRange({ date: 13, month: 11 }, { date: 17, month: 11 })));
        this.add(new Demon(DemonName.MURMUR, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.SUN), new DayTimeRange({ date: 18, month: 11 }, { date: 21, month: 11 })));
        this.add(new Demon(DemonName.OROBAS, natures.get(NatureName.WATER), planets.get(PlanetName.JUPITER), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 22, month: 11 }, { date: 26, month: 11 })));
        this.add(new Demon(DemonName.GREMORY, natures.get(NatureName.WATER), planets.get(PlanetName.VENUS), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 27, month: 11 }, { date: 31, month: 11 })));
        this.add(new Demon(DemonName.OSE, natures.get(NatureName.WATER), planets.get(PlanetName.MERCURY), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 1, month: 0 }, { date: 5, month: 0 })));
        this.add(new Demon(DemonName.AMY, natures.get(NatureName.FIRE), planets.get(PlanetName.MERCURY), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 6, month: 0 }, { date: 10, month: 0 })));
        this.add(new Demon(DemonName.ORIAS, natures.get(NatureName.FIRE), planets.get(PlanetName.MOON), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 11, month: 0 }, { date: 15, month: 0 })));
        this.add(new Demon(DemonName.VAPULA, natures.get(NatureName.FIRE), planets.get(PlanetName.VENUS), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 16, month: 0 }, { date: 20, month: 0 })));
        this.add(new Demon(DemonName.ZAGAN, natures.get(NatureName.FIRE), planets.get(PlanetName.SUN), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 21, month: 0 }, { date: 25, month: 0 })));
        this.add(new Demon(DemonName.VALAC, natures.get(NatureName.FIRE), planets.get(PlanetName.MERCURY), planets.get(PlanetName.SATURN), new DayTimeRange({ date: 26, month: 0 }, { date: 30, month: 0 })));
        this.add(new Demon(DemonName.ANDRAS, natures.get(NatureName.FIRE), planets.get(PlanetName.MOON), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 31, month: 0 }, { date: 4, month: 1 })));
        this.add(new Demon(DemonName.HAURES, natures.get(NatureName.FIRE), planets.get(PlanetName.VENUS), planets.get(PlanetName.MERCURY), new DayTimeRange({ date: 5, month: 1 }, { date: 9, month: 1 })));
        this.add(new Demon(DemonName.ANDREALPHUS, natures.get(NatureName.FIRE), planets.get(PlanetName.MOON), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 10, month: 1 }, { date: 14, month: 1 })));
        this.add(new Demon(DemonName.KIMARIS, natures.get(NatureName.FIRE), planets.get(PlanetName.MOON), planets.get(PlanetName.VENUS), new DayTimeRange({ date: 15, month: 1 }, { date: 19, month: 1 })));
        this.add(new Demon(DemonName.AMDUCIAS, natures.get(NatureName.AIR), planets.get(PlanetName.VENUS), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 20, month: 1 }, { date: 24, month: 1 })));
        this.add(new Demon(DemonName.BELIAL, natures.get(NatureName.AIR), planets.get(PlanetName.SUN), planets.get(PlanetName.JUPITER), new DayTimeRange({ date: 25, month: 1 }, { date: 1, month: 2 })));
        this.add(new Demon(DemonName.DECARABIA, natures.get(NatureName.AIR), planets.get(PlanetName.MOON), planets.get(PlanetName.MOON), new DayTimeRange({ date: 2, month: 2 }, { date: 6, month: 2 })));
        this.add(new Demon(DemonName.SEERE, natures.get(NatureName.AIR), planets.get(PlanetName.JUPITER), planets.get(PlanetName.MOON), new DayTimeRange({ date: 7, month: 2 }, { date: 11, month: 2 })));
        this.add(new Demon(DemonName.DANTALION, natures.get(NatureName.AIR), planets.get(PlanetName.VENUS), planets.get(PlanetName.MARS), new DayTimeRange({ date: 12, month: 2 }, { date: 16, month: 2 })));
        this.add(new Demon(DemonName.ANDROMALIUS, natures.get(NatureName.AIR), planets.get(PlanetName.MARS), planets.get(PlanetName.MARS), new DayTimeRange({ date: 17, month: 2 }, { date: 20, month: 2 })));

        this.addSins();
        this.addSimilar();
        this.addDetails();
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private addSimilar(): void {
        this.get(DemonName.BAEL).addSimilar(this.get(DemonName.GAAP), this.get(DemonName.MARBAS), this.get(DemonName.GUSION), this.get(DemonName.YPOS), this.get(DemonName.SABNOK), this.get(DemonName.AMDUCIAS));
        this.get(DemonName.AGARES).addSimilar(this.get(DemonName.AMON), this.get(DemonName.HALPHAS), this.get(DemonName.MALPHAS), this.get(DemonName.OROBAS), this.get(DemonName.VALAC), this.get(DemonName.DANTALION));
        this.get(DemonName.VASSAGO).addSimilar(this.get(DemonName.PHENEX), this.get(DemonName.HAAGENTI), this.get(DemonName.DECARABIA));
        this.get(DemonName.GAMIGIN).addSimilar(this.get(DemonName.FURFUR), this.get(DemonName.RAUM));
        this.get(DemonName.MARBAS).addSimilar(this.get(DemonName.BAEL), this.get(DemonName.BUER), this.get(DemonName.BARBATOS), this.get(DemonName.AMDUCIAS), this.get(DemonName.SABNOK), this.get(DemonName.SEERE));
        this.get(DemonName.VELEFOR).addSimilar(this.get(DemonName.PAIMON), this.get(DemonName.RONOVE), this.get(DemonName.VEPAR), this.get(DemonName.OSE));
        this.get(DemonName.AMON).addSimilar(this.get(DemonName.AGARES), this.get(DemonName.BOTIS), this.get(DemonName.PHENEX), this.get(DemonName.BIFRONS), this.get(DemonName.OROBAS), this.get(DemonName.DANTALION), this.get(DemonName.MALPHAS));
        this.get(DemonName.BARBATOS).addSimilar(this.get(DemonName.MARBAS), this.get(DemonName.AMDUCIAS));
        this.get(DemonName.PAIMON).addSimilar(this.get(DemonName.VELEFOR), this.get(DemonName.RONOVE), this.get(DemonName.ZAGAN), this.get(DemonName.ANDREALPHUS));
        this.get(DemonName.BUER).addSimilar(this.get(DemonName.SEERE), this.get(DemonName.MARBAS));
        this.get(DemonName.GUSION).addSimilar(this.get(DemonName.BAEL), this.get(DemonName.MARAX), this.get(DemonName.SABNOK));
        this.get(DemonName.SITRI).addSimilar(this.get(DemonName.ASMODAI), this.get(DemonName.BALAM), this.get(DemonName.GREMORY));
        this.get(DemonName.BELETH).addSimilar(this.get(DemonName.ELIGOS), this.get(DemonName.SALLOS), this.get(DemonName.BERITH), this.get(DemonName.FORNEUS), this.get(DemonName.CROCEL));
        this.get(DemonName.LERAIE).addSimilar(this.get(DemonName.AIM), this.get(DemonName.GAAP), this.get(DemonName.FOCALOR), this.get(DemonName.VAPULA), this.get(DemonName.ANDREALPHUS), this.get(DemonName.ANDROMALIUS));
        this.get(DemonName.ELIGOS).addSimilar(this.get(DemonName.PHENEX), this.get(DemonName.BELETH), this.get(DemonName.SALLOS), this.get(DemonName.BERITH), this.get(DemonName.CROCEL), this.get(DemonName.FURCAS));
        this.get(DemonName.ZEPAR).addSimilar(this.get(DemonName.MARCHOSIAS), this.get(DemonName.MALPHAS), this.get(DemonName.VUAL), this.get(DemonName.ASMODAI), this.get(DemonName.BELIAL));
        this.get(DemonName.BOTIS).addSimilar(this.get(DemonName.AMON), this.get(DemonName.BUNE), this.get(DemonName.HALPHAS), this.get(DemonName.BIFRONS));
        this.get(DemonName.BATHIN).addSimilar(this.get(DemonName.STOLAS), this.get(DemonName.VEPAR), this.get(DemonName.MURMUR), this.get(DemonName.AMY), this.get(DemonName.ORIAS), this.get(DemonName.BERITH));
        this.get(DemonName.SALLOS).addSimilar(this.get(DemonName.BELETH), this.get(DemonName.ELIGOS), this.get(DemonName.MARAX), this.get(DemonName.FORNEUS), this.get(DemonName.CROCEL));
        this.get(DemonName.PURSON).addSimilar(this.get(DemonName.MARAX), this.get(DemonName.NABERIUS), this.get(DemonName.FORAS), this.get(DemonName.STOLAS), this.get(DemonName.SHAX), this.get(DemonName.CAMIO), this.get(DemonName.ORIAS), this.get(DemonName.ZAGAN));
        this.get(DemonName.MARAX).addSimilar(this.get(DemonName.PURSON), this.get(DemonName.GUSION), this.get(DemonName.SALLOS), this.get(DemonName.YPOS), this.get(DemonName.MURMUR), this.get(DemonName.AMY));
        this.get(DemonName.YPOS).addSimilar(this.get(DemonName.MARAX), this.get(DemonName.BAEL), this.get(DemonName.ANDRAS), this.get(DemonName.ANDREALPHUS));
        this.get(DemonName.AIM).addSimilar(this.get(DemonName.LERAIE), this.get(DemonName.GAAP), this.get(DemonName.CAMIO), this.get(DemonName.ANDREALPHUS), this.get(DemonName.ANDROMALIUS));
        this.get(DemonName.NABERIUS).addSimilar(this.get(DemonName.ASTAROT), this.get(DemonName.PURSON), this.get(DemonName.SHAX), this.get(DemonName.BAEL), this.get(DemonName.CAMIO), this.get(DemonName.ZAGAN));
        this.get(DemonName.GLASSYA_LABOLAS).addSimilar(this.get(DemonName.FOCALOR), this.get(DemonName.OSE), this.get(DemonName.HAURES));
        this.get(DemonName.BUNE).addSimilar(this.get(DemonName.AMON), this.get(DemonName.BOTIS), this.get(DemonName.BIFRONS), this.get(DemonName.ANDRAS));
        this.get(DemonName.RONOVE).addSimilar(this.get(DemonName.PAIMON), this.get(DemonName.VELEFOR), this.get(DemonName.VELEFOR), this.get(DemonName.VINE), this.get(DemonName.OSE), this.get(DemonName.VAPULA));
        this.get(DemonName.BERITH).addSimilar(this.get(DemonName.ELIGOS), this.get(DemonName.BELETH), this.get(DemonName.BATHIN), this.get(DemonName.ORIAS));
        this.get(DemonName.ASTAROT).addSimilar(this.get(DemonName.NABERIUS), this.get(DemonName.STOLAS), this.get(DemonName.CAMIO), this.get(DemonName.ANDRAS), this.get(DemonName.AMDUCIAS), this.get(DemonName.FORAS));
        this.get(DemonName.FORNEUS).addSimilar(this.get(DemonName.BELETH), this.get(DemonName.SALLOS));
        this.get(DemonName.FORAS).addSimilar(this.get(DemonName.PURSON), this.get(DemonName.AMDUCIAS), this.get(DemonName.ASTAROT));
        this.get(DemonName.ASMODAI).addSimilar(this.get(DemonName.SEERE), this.get(DemonName.SITRI), this.get(DemonName.GREMORY), this.get(DemonName.BELIAL));
        this.get(DemonName.GAAP).addSimilar(this.get(DemonName.LERAIE), this.get(DemonName.AIM), this.get(DemonName.FOCALOR), this.get(DemonName.SABNOK), this.get(DemonName.HAURES), this.get(DemonName.ANDROMALIUS));
        this.get(DemonName.FURFUR).addSimilar(this.get(DemonName.GAMIGIN), this.get(DemonName.SALLOS), this.get(DemonName.MARCHOSIAS), this.get(DemonName.RAUM), this.get(DemonName.ALLOCES));
        this.get(DemonName.MARCHOSIAS).addSimilar(this.get(DemonName.ZEPAR), this.get(DemonName.FURFUR), this.get(DemonName.RAUM), this.get(DemonName.VUAL), this.get(DemonName.ALLOCES), this.get(DemonName.BELIAL));
        this.get(DemonName.STOLAS).addSimilar(this.get(DemonName.ASTAROT), this.get(DemonName.BATHIN), this.get(DemonName.PURSON), this.get(DemonName.AMY));
        this.get(DemonName.PHENEX).addSimilar(this.get(DemonName.VASSAGO), this.get(DemonName.AGARES), this.get(DemonName.AMON), this.get(DemonName.ELIGOS));
        this.get(DemonName.HALPHAS).addSimilar(this.get(DemonName.MALPHAS), this.get(DemonName.BOTIS), this.get(DemonName.AGARES), this.get(DemonName.OROBAS));
        this.get(DemonName.MALPHAS).addSimilar(this.get(DemonName.HALPHAS), this.get(DemonName.AGARES), this.get(DemonName.ZEPAR), this.get(DemonName.AMON), this.get(DemonName.HAAGENTI), this.get(DemonName.MURMUR), this.get(DemonName.OROBAS), this.get(DemonName.VALAC), this.get(DemonName.DECARABIA), this.get(DemonName.KIMARIS));
        this.get(DemonName.RAUM).addSimilar(this.get(DemonName.GAMIGIN), this.get(DemonName.FURFUR), this.get(DemonName.MARCHOSIAS));
        this.get(DemonName.FOCALOR).addSimilar(this.get(DemonName.LERAIE), this.get(DemonName.GAAP), this.get(DemonName.GLASSYA_LABOLAS), this.get(DemonName.VAPULA), this.get(DemonName.HAURES), this.get(DemonName.ANDROMALIUS));
        this.get(DemonName.VEPAR).addSimilar(this.get(DemonName.VELEFOR), this.get(DemonName.RONOVE), this.get(DemonName.BATHIN));
        this.get(DemonName.SABNOK).addSimilar(this.get(DemonName.GAAP), this.get(DemonName.BAEL), this.get(DemonName.GUSION), this.get(DemonName.MARBAS));
        this.get(DemonName.SHAX).addSimilar(this.get(DemonName.NABERIUS), this.get(DemonName.PURSON), this.get(DemonName.CAMIO));
        this.get(DemonName.VINE).addSimilar(this.get(DemonName.FOCALOR), this.get(DemonName.RONOVE), this.get(DemonName.VAPULA));
        this.get(DemonName.BIFRONS).addSimilar(this.get(DemonName.BOTIS), this.get(DemonName.BUNE), this.get(DemonName.AMON));
        this.get(DemonName.VUAL).addSimilar(this.get(DemonName.ZEPAR), this.get(DemonName.MARCHOSIAS), this.get(DemonName.BELIAL));
        this.get(DemonName.HAAGENTI).addSimilar(this.get(DemonName.VASSAGO), this.get(DemonName.MALPHAS), this.get(DemonName.OROBAS), this.get(DemonName.DECARABIA));
        this.get(DemonName.CROCEL).addSimilar(this.get(DemonName.BELETH), this.get(DemonName.SALLOS), this.get(DemonName.ELIGOS));
        this.get(DemonName.FURCAS).addSimilar(this.get(DemonName.SALLOS), this.get(DemonName.ELIGOS));
        this.get(DemonName.BALAM).addSimilar(this.get(DemonName.SITRI), this.get(DemonName.NABERIUS), this.get(DemonName.CAMIO), this.get(DemonName.KIMARIS));
        this.get(DemonName.ALLOCES).addSimilar(this.get(DemonName.MARCHOSIAS), this.get(DemonName.FURFUR), this.get(DemonName.VALAC));
        this.get(DemonName.CAMIO).addSimilar(this.get(DemonName.NABERIUS), this.get(DemonName.AIM), this.get(DemonName.BALAM), this.get(DemonName.ASTAROT), this.get(DemonName.PURSON), this.get(DemonName.SHAX), this.get(DemonName.ZAGAN));
        this.get(DemonName.MURMUR).addSimilar(this.get(DemonName.MALPHAS), this.get(DemonName.AIM), this.get(DemonName.MARAX), this.get(DemonName.BATHIN), this.get(DemonName.DANTALION));
        this.get(DemonName.OROBAS).addSimilar(this.get(DemonName.AGARES), this.get(DemonName.AMON), this.get(DemonName.HALPHAS), this.get(DemonName.MALPHAS), this.get(DemonName.HAAGENTI), this.get(DemonName.SEERE), this.get(DemonName.DANTALION));
        this.get(DemonName.GREMORY).addSimilar(this.get(DemonName.SITRI), this.get(DemonName.ASMODAI));
        this.get(DemonName.OSE).addSimilar(this.get(DemonName.GLASSYA_LABOLAS), this.get(DemonName.RONOVE), this.get(DemonName.VELEFOR), this.get(DemonName.ANDRAS));
        this.get(DemonName.AMY).addSimilar(this.get(DemonName.STOLAS), this.get(DemonName.BATHIN), this.get(DemonName.MARAX));
        this.get(DemonName.ORIAS).addSimilar(this.get(DemonName.BATHIN), this.get(DemonName.PURSON), this.get(DemonName.BERITH));
        this.get(DemonName.VAPULA).addSimilar(this.get(DemonName.FOCALOR), this.get(DemonName.VINE), this.get(DemonName.RONOVE), this.get(DemonName.LERAIE), this.get(DemonName.ANDREALPHUS));
        this.get(DemonName.ZAGAN).addSimilar(this.get(DemonName.NABERIUS), this.get(DemonName.CAMIO), this.get(DemonName.PURSON), this.get(DemonName.PAIMON));
        this.get(DemonName.VALAC).addSimilar(this.get(DemonName.AGARES), this.get(DemonName.MALPHAS), this.get(DemonName.ALLOCES));
        this.get(DemonName.ANDRAS).addSimilar(this.get(DemonName.ASTAROT), this.get(DemonName.BUNE), this.get(DemonName.OSE), this.get(DemonName.YPOS));
        this.get(DemonName.HAURES).addSimilar(this.get(DemonName.GLASSYA_LABOLAS), this.get(DemonName.FOCALOR), this.get(DemonName.GAAP));
        this.get(DemonName.ANDREALPHUS).addSimilar(this.get(DemonName.VAPULA), this.get(DemonName.LERAIE), this.get(DemonName.PAIMON), this.get(DemonName.AIM), this.get(DemonName.YPOS), this.get(DemonName.KIMARIS));
        this.get(DemonName.KIMARIS).addSimilar(this.get(DemonName.ANDREALPHUS), this.get(DemonName.MALPHAS), this.get(DemonName.BALAM));
        this.get(DemonName.AMDUCIAS).addSimilar(this.get(DemonName.ASTAROT), this.get(DemonName.BARBATOS), this.get(DemonName.BAEL), this.get(DemonName.MARBAS), this.get(DemonName.FORAS), this.get(DemonName.VAPULA));
        this.get(DemonName.BELIAL).addSimilar(this.get(DemonName.ZEPAR), this.get(DemonName.MARCHOSIAS), this.get(DemonName.VUAL), this.get(DemonName.ASMODAI));
        this.get(DemonName.DECARABIA).addSimilar(this.get(DemonName.HAAGENTI), this.get(DemonName.VASSAGO), this.get(DemonName.MALPHAS));
        this.get(DemonName.SEERE).addSimilar(this.get(DemonName.BUER), this.get(DemonName.OROBAS), this.get(DemonName.MARBAS), this.get(DemonName.ASMODAI));
        this.get(DemonName.DANTALION).addSimilar(this.get(DemonName.MURMUR), this.get(DemonName.HALPHAS), this.get(DemonName.AGARES), this.get(DemonName.OROBAS), this.get(DemonName.AMON));
        this.get(DemonName.ANDROMALIUS).addSimilar(this.get(DemonName.AIM), this.get(DemonName.LERAIE), this.get(DemonName.FOCALOR), this.get(DemonName.GAAP));
    }

    private addSins(): void {
        let king = this.get(DemonName.BAEL);
        king.sin = this.sins.get(SinName.STULTITIA);
        king.addEntourage(this.get(DemonName.BOTIS), this.get(DemonName.MARBAS), this.get(DemonName.GUSION), this.get(DemonName.SABNOK), this.get(DemonName.OROBAS), this.get(DemonName.MALPHAS), this.get(DemonName.DANTALION));

        king = this.get(DemonName.BELIAL);
        king.sin = this.sins.get(SinName.IRA);
        king.addEntourage(this.get(DemonName.OSE), this.get(DemonName.GAAP), this.get(DemonName.LERAIE), this.get(DemonName.ANDRAS), this.get(DemonName.HAURES), this.get(DemonName.NABERIUS), this.get(DemonName.GLASSYA_LABOLAS));

        king = this.get(DemonName.ASMODAI);
        king.sin = this.sins.get(SinName.AVARITIA);
        king.addEntourage(this.get(DemonName.BUNE), this.get(DemonName.VUAL), this.get(DemonName.BERITH), this.get(DemonName.STOLAS), this.get(DemonName.VAPULA), this.get(DemonName.VELEFOR), this.get(DemonName.BARBATOS));

        king = this.get(DemonName.VINE);
        king.sin = this.sins.get(SinName.TRISTITIA);
        king.addEntourage(this.get(DemonName.AMON), this.get(DemonName.CROCEL), this.get(DemonName.AGARES), this.get(DemonName.ELIGOS), this.get(DemonName.HALPHAS), this.get(DemonName.BIFRONS), this.get(DemonName.MARCHOSIAS));

        king = this.get(DemonName.ZAGAN);
        king.sin = this.sins.get(SinName.INANIS_GLORIA);
        king.addEntourage(this.get(DemonName.CAMIO), this.get(DemonName.VEPAR), this.get(DemonName.MARAX), this.get(DemonName.RONOVE), this.get(DemonName.MURMUR), this.get(DemonName.FORNEUS), this.get(DemonName.KIMARIS));

        king = this.get(DemonName.PAIMON);
        king.sin = this.sins.get(SinName.SUPERBIA);
        king.addEntourage(this.get(DemonName.AIM), this.get(DemonName.YPOS), this.get(DemonName.ORIAS), this.get(DemonName.VALAC), this.get(DemonName.VASSAGO), this.get(DemonName.HAAGENTI), this.get(DemonName.ANDREALPHUS));

        king = this.get(DemonName.BALAM);
        king.sin = this.sins.get(SinName.INVIDIA);
        king.addEntourage(this.get(DemonName.FURCAS), this.get(DemonName.PHENEX), this.get(DemonName.SALLOS), this.get(DemonName.GAMIGIN), this.get(DemonName.ASTAROT), this.get(DemonName.FOCALOR), this.get(DemonName.ALLOCES));

        king = this.get(DemonName.PURSON);
        king.sin = this.sins.get(SinName.GULA);
        king.addEntourage(this.get(DemonName.AMY), this.get(DemonName.BUER), this.get(DemonName.RAUM), this.get(DemonName.SEERE), this.get(DemonName.BATHIN), this.get(DemonName.FURFUR), this.get(DemonName.AMDUCIAS));

        king = this.get(DemonName.BELETH);
        king.sin = this.sins.get(SinName.LUXURIA);
        king.addEntourage(this.get(DemonName.SHAX), this.get(DemonName.SITRI), this.get(DemonName.ZEPAR), this.get(DemonName.FORAS), this.get(DemonName.GREMORY), this.get(DemonName.DECARABIA), this.get(DemonName.ANDROMALIUS));
    }

    private addDetails(): void {
        for (let i = 0; i < this.collection.length; i++) {
            let item = this.collection[i];
            item.degree = `${i * 5 + 1}-${i * 5 + 5}°`;
            item.zodiac = this.zodiacs.collection[Math.floor(i / 6)];
            item.zodiacSpirits = this.zodiacSpirits.collection.slice(i * 5, 5 * (i + 1));
            if (i < 36) {
                item.type = DemonType.DAY;
                let pair = item.pair = this.collection[i + 36];
                pair.pair = item;
            }
            else {
                item.type = DemonType.NIGHT;
            }
            item.nature.addToItems(item, item.nature.demons);
            item.status.addToItems(item, item.status.demons);
            item.zodiac.addToItems(item, item.zodiac.demons);
            item.zodiacSpirits.forEach(spirit => spirit.demon = item);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public getPrimarySins(): Array<Demon> {
        return [this.get(DemonName.BAEL), this.get(DemonName.BELIAL), this.get(DemonName.ASMODAI)];
    }

    public getSecondarySins(): Array<Demon> {
        return [this.get(DemonName.VINE), this.get(DemonName.ZAGAN), this.get(DemonName.PAIMON), this.get(DemonName.BALAM), this.get(DemonName.PURSON), this.get(DemonName.BELETH)];
    }

    public setFilter(item: DemonFilterFunction): void {
        ArrayUtil.clear(this.filters);
        this.filters.push(item);
        this.refresh();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return this.uidPropertyName;
    }
}

export type DemonFilterFunction = FilterFunction<Demon>;

export enum DemonName {
    BAEL = '1',
    AGARES = '2',
    VASSAGO = '3',
    GAMIGIN = '4',
    MARBAS = '5',
    VELEFOR = '6',
    AMON = '7',
    BARBATOS = '8',
    PAIMON = '9',
    BUER = '10',
    GUSION = '11',
    SITRI = '12',
    BELETH = '13',
    LERAIE = '14',
    ELIGOS = '15',
    ZEPAR = '16',
    BOTIS = '17',
    BATHIN = '18',
    SALLOS = '19',
    PURSON = '20',
    MARAX = '21',
    YPOS = '22',
    AIM = '23',
    NABERIUS = '24',
    GLASSYA_LABOLAS = '25',
    BUNE = '26',
    RONOVE = '27',
    BERITH = '28',
    ASTAROT = '29',
    FORNEUS = '30',
    FORAS = '31',
    ASMODAI = '32',
    GAAP = '33',
    FURFUR = '34',
    MARCHOSIAS = '35',
    STOLAS = '36',
    PHENEX = '37',
    HALPHAS = '38',
    MALPHAS = '39',
    RAUM = '40',
    FOCALOR = '41',
    VEPAR = '42',
    SABNOK = '43',
    SHAX = '44',
    VINE = '45',
    BIFRONS = '46',
    VUAL = '47',
    HAAGENTI = '48',
    CROCEL = '49',
    FURCAS = '50',
    BALAM = '51',
    ALLOCES = '52',
    CAMIO = '53',
    MURMUR = '54',
    OROBAS = '55',
    GREMORY = '56',
    OSE = '57',
    AMY = '58',
    ORIAS = '59',
    VAPULA = '60',
    ZAGAN = '61',
    VALAC = '62',
    ANDRAS = '63',
    HAURES = '64',
    ANDREALPHUS = '65',
    KIMARIS = '66',
    AMDUCIAS = '67',
    BELIAL = '68',
    DECARABIA = '69',
    SEERE = '70',
    DANTALION = '71',
    ANDROMALIUS = '72',
}
export enum DemonType {
    DAY = 'DAY',
    NIGHT = 'NIGHT',
}

