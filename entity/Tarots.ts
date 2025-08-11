import * as _ from 'lodash';
import { Hebrew, Hebrews } from './Hebrews';
import { ZodiacType } from './Zodiacs';
import { EntityType } from './Entities';
import { Sefira, SefiraName, Sefiras } from './Sefiras';
import { Nature, NatureName, Natures } from './Natures';
import { Planet, PlanetName, Planets } from './Planets';
import { Zodiac, ZodiacName, Zodiacs } from './Zodiacs';
import { Demon, DemonName, Demons } from './Demons';
import { ArrayUtil, FilterableMapCollection, FilterFunction } from '@ts-core/common';
import { DayTimeRange, ITimeRange } from './TimeRange';
import { Entity } from './IEntity';
import { HebrewAlphabetName } from './HebrewAlphabet';

export enum TarotName {
    FOOL = '0',
    MAGICIAN = '1',
    HIGH_PRIESTESS = '2',
    EMPRESS = '3',
    EMPEROR = '4',
    HIEROPHANT = '5',
    LOVERS = '6',
    CHARIOT = '7',
    STRENGTH = '8',
    HERMIT = '9',
    WHEEL_OF_FORTUNE = '10',
    JUSTICE = '11',
    HANGED_MAN = '12',
    DEATH = '13',
    TEMPERANCE = '14',
    DEVIL = '15',
    TOWER = '16',
    STAR = '17',
    MOON = '18',
    SUN = '19',
    JUDGEMENT = '20',
    WORLD = '21',
    KNIGHT_OF_WANDS = '22',
    QUEEN_OF_WANDS = '23',
    PRINCE_OF_WANDS = '24',
    PRINCESS_OF_WANDS = '25',
    KNIGHT_OF_CUPS = '26',
    QUEEN_OF_CUPS = '27',
    PRINCE_OF_CUPS = '28',
    PRINCESS_OF_CUPS = '29',
    KNIGHT_OF_SWORDS = '30',
    QUEEN_OF_SWORDS = '31',
    PRINCE_OF_SWORDS = '32',
    PRINCESS_OF_SWORDS = '33',
    KNIGHT_OF_DISCS = '34',
    QUEEN_OF_DISCS = '35',
    PRINCE_OF_DISCS = '36',
    PRINCESS_OF_DISCS = '37',
    ACE_OF_WANDS = '38',
    TWO_OF_WANDS = '39',
    THREE_OF_WANDS = '40',
    FOUR_OF_WANDS = '41',
    FIVE_OF_WANDS = '42',
    SIX_OF_WANDS = '43',
    SEVEN_OF_WANDS = '44',
    EIGHT_OF_WANDS = '45',
    NINE_OF_WANDS = '46',
    TEN_OF_WANDS = '47',
    ACE_OF_CUPS = '48',
    TWO_OF_CUPS = '49',
    THREE_OF_CUPS = '50',
    FOUR_OF_CUPS = '51',
    FIVE_OF_CUPS = '52',
    SIX_OF_CUPS = '53',
    SEVEN_OF_CUPS = '54',
    EIGHT_OF_CUPS = '55',
    NINE_OF_CUPS = '56',
    TEN_OF_CUPS = '57',
    ACE_OF_SWORDS = '58',
    TWO_OF_SWORDS = '59',
    THREE_OF_SWORDS = '60',
    FOUR_OF_SWORDS = '61',
    FIVE_OF_SWORDS = '62',
    SIX_OF_SWORDS = '63',
    SEVEN_OF_SWORDS = '64',
    EIGHT_OF_SWORDS = '65',
    NINE_OF_SWORDS = '66',
    TEN_OF_SWORDS = '67',
    ACE_OF_DISKS = '68',
    TWO_OF_DISKS = '69',
    THREE_OF_DISKS = '70',
    FOUR_OF_DISKS = '71',
    FIVE_OF_DISKS = '72',
    SIX_OF_DISKS = '73',
    SEVEN_OF_DISKS = '74',
    EIGHT_OF_DISKS = '75',
    NINE_OF_DISKS = '76',
    TEN_OF_DISKS = '77'
}
export enum TarotType {
    ALL = 'ALL',
    MAJOR = 'MAJOR',
    COURT = 'COURT',
    ACE = 'ACE',
    NUMBER = 'NUMBER'
}
export enum TarotSuit {
    WAND = 'WAND',
    CUP = 'CUP',
    SWORD = 'SWORD',
    DISK = 'DISK'
}
export enum TarotRank {
    KNIGHT = 'KNIGHT',
    QUEEN = 'QUEEN',
    PRINCE = 'PRINCE',
    PRINCESS = 'PRINCESS'
}
export enum TarotPosition {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
    FOUR = 'FOUR',
    FIVE = 'FIVE',
    SIX = 'SIX',
    SEVEN = 'SEVEN',
    EIGHT = 'EIGHT',
    NINE = 'NINE',
    TEN = 'TEN'
}

export class TarotAceZodiac {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _timeRange: ITimeRange;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(public items: Array<Zodiac>) {
        this._timeRange = {
            start: items[0].timeRange.start,
            finish: items[2].timeRange.finish
        };
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get timeRange(): ITimeRange {
        return this._timeRange;
    }
}

export class TarotCourtZodiac {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(public type: ZodiacType, public major: Zodiac, public minor: Zodiac, public timeRange: ITimeRange) { }
}

export class Tarot extends Entity<TarotName> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: TarotName, public type: TarotType, links: Array<EntityType>) {
        super(name, '✧', links);
    }
}

export class TarotMajor extends Tarot {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: TarotName, public hebrew: Hebrew) {
        super(name, TarotType.MAJOR, [hebrew, hebrew.manager, ...hebrew.cinnarot]);
    }
}

export class TarotCourt extends Tarot {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        name: TarotName,
        public suit: TarotSuit,
        public rank: TarotRank,
        public suitNature: Nature,
        public rankNature: Nature,
        public zodiac: TarotCourtZodiac
    ) {
        super(name, TarotType.COURT, [suitNature, rankNature]);
        if (!_.isNil(zodiac)) {
            this.addLink(this.zodiac.major);
            this.addLink(this.zodiac.minor);
        }
    }
}

export class TarotCourtPrincess extends TarotCourt {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: TarotName, suit: TarotSuit, suitNature: Nature, rankNature: Nature, public manager: TarotAceZodiac) {
        super(name, suit, TarotRank.PRINCESS, suitNature, rankNature, null);
        manager.items.forEach(item => this.addLink(item));
    }
}

export class TarotAce extends Tarot {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        name: TarotName,
        public suit: TarotSuit,
        public position: TarotPosition,
        public nature: Nature,
        public sefira: Sefira,
        public manager: TarotAceZodiac
    ) {
        super(name, TarotType.ACE, [nature, sefira, ...manager.items]);
    }
}

export class TarotNumber extends Tarot {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        name: TarotName,
        public suit: TarotSuit,
        public position: TarotPosition,
        public nature: Nature,
        public sefira: Sefira,
        public planet: Planet,
        public zodiac: Zodiac,
        public timeRange: ITimeRange,
        public demons: Array<Demon>,
    ) {
        super(name, TarotType.NUMBER, [planet, zodiac, sefira, nature, sefira.nature]);
        // demons.forEach(item => this.addLink(item));
    }
}

export class Tarots extends FilterableMapCollection<Tarot> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(hebrews: Hebrews, sefiras: Sefiras, natures: Natures, planets: Planets, zodiacs: Zodiacs, demons: Demons) {
        super('name');
        this.addItems([
            new TarotMajor(TarotName.FOOL, hebrews.get(HebrewAlphabetName.ALEPH)),
            new TarotMajor(TarotName.MAGICIAN, hebrews.get(HebrewAlphabetName.BET)),
            new TarotMajor(TarotName.HIGH_PRIESTESS, hebrews.get(HebrewAlphabetName.GIMEL)),
            new TarotMajor(TarotName.EMPRESS, hebrews.get(HebrewAlphabetName.DALET)),
            new TarotMajor(TarotName.EMPEROR, hebrews.get(HebrewAlphabetName.TSADHE)),
            new TarotMajor(TarotName.HIEROPHANT, hebrews.get(HebrewAlphabetName.WAW)),
            new TarotMajor(TarotName.LOVERS, hebrews.get(HebrewAlphabetName.ZAYIN)),
            new TarotMajor(TarotName.CHARIOT, hebrews.get(HebrewAlphabetName.HETH)),
            new TarotMajor(TarotName.STRENGTH, hebrews.get(HebrewAlphabetName.TETH)),
            new TarotMajor(TarotName.HERMIT, hebrews.get(HebrewAlphabetName.YODH)),
            new TarotMajor(TarotName.WHEEL_OF_FORTUNE, hebrews.get(HebrewAlphabetName.KAPH)),
            new TarotMajor(TarotName.JUSTICE, hebrews.get(HebrewAlphabetName.LAMED)),
            new TarotMajor(TarotName.HANGED_MAN, hebrews.get(HebrewAlphabetName.MEM)),
            new TarotMajor(TarotName.DEATH, hebrews.get(HebrewAlphabetName.NUN)),
            new TarotMajor(TarotName.TEMPERANCE, hebrews.get(HebrewAlphabetName.SAMEKH)),
            new TarotMajor(TarotName.DEVIL, hebrews.get(HebrewAlphabetName.AYIN)),
            new TarotMajor(TarotName.TOWER, hebrews.get(HebrewAlphabetName.PE)),
            new TarotMajor(TarotName.STAR, hebrews.get(HebrewAlphabetName.HE)),
            new TarotMajor(TarotName.MOON, hebrews.get(HebrewAlphabetName.QOPH)),
            new TarotMajor(TarotName.SUN, hebrews.get(HebrewAlphabetName.RESH)),
            new TarotMajor(TarotName.JUDGEMENT, hebrews.get(HebrewAlphabetName.SHIN)),
            new TarotMajor(TarotName.WORLD, hebrews.get(HebrewAlphabetName.TAW)),

            new TarotCourt(
                TarotName.KNIGHT_OF_WANDS,
                TarotSuit.WAND,
                TarotRank.KNIGHT,
                natures.get(NatureName.FIRE),
                natures.get(NatureName.FIRE),
                new TarotCourtZodiac(
                    ZodiacType.MUTABLE,
                    zodiacs.get(ZodiacName.SAGITTARIUS),
                    zodiacs.get(ZodiacName.SCORPIO),
                    new DayTimeRange({ date: 13, month: 10 }, { date: 11, month: 11 })
                )
            ),
            new TarotCourt(
                TarotName.QUEEN_OF_WANDS,
                TarotSuit.WAND,
                TarotRank.QUEEN,
                natures.get(NatureName.FIRE),
                natures.get(NatureName.WATER),
                new TarotCourtZodiac(
                    ZodiacType.CARDINAL,
                    zodiacs.get(ZodiacName.ARIES),
                    zodiacs.get(ZodiacName.PISCES),
                    new DayTimeRange({ date: 11, month: 2 }, { date: 10, month: 3 })
                )
            ),
            new TarotCourt(
                TarotName.PRINCE_OF_WANDS,
                TarotSuit.WAND,
                TarotRank.PRINCE,
                natures.get(NatureName.FIRE),
                natures.get(NatureName.AIR),
                new TarotCourtZodiac(
                    ZodiacType.FIXED,
                    zodiacs.get(ZodiacName.LEO),
                    zodiacs.get(ZodiacName.CANCER),
                    new DayTimeRange({ date: 12, month: 6 }, { date: 11, month: 7 })
                )
            ),
            new TarotCourtPrincess(
                TarotName.PRINCESS_OF_WANDS,
                TarotSuit.WAND,
                natures.get(NatureName.FIRE),
                natures.get(NatureName.EARTH),
                new TarotAceZodiac([zodiacs.get(ZodiacName.CANCER), zodiacs.get(ZodiacName.LEO), zodiacs.get(ZodiacName.VIRGO)])
            ),

            new TarotCourt(
                TarotName.KNIGHT_OF_CUPS,
                TarotSuit.CUP,
                TarotRank.KNIGHT,
                natures.get(NatureName.WATER),
                natures.get(NatureName.FIRE),
                new TarotCourtZodiac(
                    ZodiacType.MUTABLE,
                    zodiacs.get(ZodiacName.PISCES),
                    zodiacs.get(ZodiacName.AQUARIUS),
                    new DayTimeRange({ date: 9, month: 1 }, { date: 10, month: 2 })
                )
            ),
            new TarotCourt(
                TarotName.QUEEN_OF_CUPS,
                TarotSuit.CUP,
                TarotRank.QUEEN,
                natures.get(NatureName.WATER),
                natures.get(NatureName.WATER),
                new TarotCourtZodiac(
                    ZodiacType.CARDINAL,
                    zodiacs.get(ZodiacName.CANCER),
                    zodiacs.get(ZodiacName.GEMINI),
                    new DayTimeRange({ date: 11, month: 5 }, { date: 11, month: 6 })
                )
            ),
            new TarotCourt(
                TarotName.PRINCE_OF_CUPS,
                TarotSuit.CUP,
                TarotRank.PRINCE,
                natures.get(NatureName.WATER),
                natures.get(NatureName.AIR),
                new TarotCourtZodiac(
                    ZodiacType.FIXED,
                    zodiacs.get(ZodiacName.SCORPIO),
                    zodiacs.get(ZodiacName.LIBRA),
                    new DayTimeRange({ date: 14, month: 9 }, { date: 12, month: 10 })
                )
            ),
            new TarotCourtPrincess(
                TarotName.PRINCESS_OF_CUPS,
                TarotSuit.CUP,
                natures.get(NatureName.WATER),
                natures.get(NatureName.EARTH),
                new TarotAceZodiac([zodiacs.get(ZodiacName.LIBRA), zodiacs.get(ZodiacName.SCORPIO), zodiacs.get(ZodiacName.SAGITTARIUS)])
            ),

            new TarotCourt(
                TarotName.KNIGHT_OF_SWORDS,
                TarotSuit.SWORD,
                TarotRank.KNIGHT,
                natures.get(NatureName.AIR),
                natures.get(NatureName.FIRE),
                new TarotCourtZodiac(
                    ZodiacType.MUTABLE,
                    zodiacs.get(ZodiacName.GEMINI),
                    zodiacs.get(ZodiacName.TAURUS),
                    new DayTimeRange({ date: 11, month: 4 }, { date: 10, month: 5 })
                )
            ),
            new TarotCourt(
                TarotName.QUEEN_OF_SWORDS,
                TarotSuit.SWORD,
                TarotRank.QUEEN,
                natures.get(NatureName.AIR),
                natures.get(NatureName.WATER),
                new TarotCourtZodiac(
                    ZodiacType.CARDINAL,
                    zodiacs.get(ZodiacName.LIBRA),
                    zodiacs.get(ZodiacName.VIRGO),
                    new DayTimeRange({ date: 13, month: 8 }, { date: 13, month: 9 })
                )
            ),
            new TarotCourt(
                TarotName.PRINCE_OF_SWORDS,
                TarotSuit.SWORD,
                TarotRank.PRINCE,
                natures.get(NatureName.AIR),
                natures.get(NatureName.AIR),
                new TarotCourtZodiac(
                    ZodiacType.FIXED,
                    zodiacs.get(ZodiacName.AQUARIUS),
                    zodiacs.get(ZodiacName.CAPRICORNUS),
                    new DayTimeRange({ date: 11, month: 0 }, { date: 8, month: 1 })
                )
            ),
            new TarotCourtPrincess(
                TarotName.PRINCESS_OF_SWORDS,
                TarotSuit.SWORD,
                natures.get(NatureName.AIR),
                natures.get(NatureName.EARTH),
                new TarotAceZodiac([zodiacs.get(ZodiacName.CAPRICORNUS), zodiacs.get(ZodiacName.AQUARIUS), zodiacs.get(ZodiacName.PISCES)])
            ),

            new TarotCourt(
                TarotName.KNIGHT_OF_DISCS,
                TarotSuit.DISK,
                TarotRank.KNIGHT,
                natures.get(NatureName.EARTH),
                natures.get(NatureName.FIRE),
                new TarotCourtZodiac(
                    ZodiacType.MUTABLE,
                    zodiacs.get(ZodiacName.VIRGO),
                    zodiacs.get(ZodiacName.LEO),
                    new DayTimeRange({ date: 12, month: 7 }, { date: 12, month: 8 })
                )
            ),
            new TarotCourt(
                TarotName.QUEEN_OF_DISCS,
                TarotSuit.DISK,
                TarotRank.QUEEN,
                natures.get(NatureName.EARTH),
                natures.get(NatureName.WATER),
                new TarotCourtZodiac(
                    ZodiacType.CARDINAL,
                    zodiacs.get(ZodiacName.CAPRICORNUS),
                    zodiacs.get(ZodiacName.SAGITTARIUS),
                    new DayTimeRange({ date: 12, month: 11 }, { date: 10, month: 0 })
                )
            ),
            new TarotCourt(
                TarotName.PRINCE_OF_DISCS,
                TarotSuit.DISK,
                TarotRank.PRINCE,
                natures.get(NatureName.EARTH),
                natures.get(NatureName.AIR),
                new TarotCourtZodiac(
                    ZodiacType.FIXED,
                    zodiacs.get(ZodiacName.TAURUS),
                    zodiacs.get(ZodiacName.ARIES),
                    new DayTimeRange({ date: 11, month: 3 }, { date: 10, month: 4 })
                )
            ),
            new TarotCourtPrincess(
                TarotName.PRINCESS_OF_DISCS,
                TarotSuit.DISK,
                natures.get(NatureName.EARTH),
                natures.get(NatureName.EARTH),
                new TarotAceZodiac([zodiacs.get(ZodiacName.ARIES), zodiacs.get(ZodiacName.TAURUS), zodiacs.get(ZodiacName.GEMINI)])
            ),

            new TarotAce(
                TarotName.ACE_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.ONE,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.KETER),
                new TarotAceZodiac([zodiacs.get(ZodiacName.CANCER), zodiacs.get(ZodiacName.LEO), zodiacs.get(ZodiacName.VIRGO)])
            ),
            new TarotNumber(
                TarotName.TWO_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.TWO,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.CHOKHMAH),
                planets.get(PlanetName.MARS),
                zodiacs.get(ZodiacName.ARIES),
                new DayTimeRange({ date: 21, month: 2 }, { date: 30, month: 2 }),
                [demons.get(DemonName.BAEL), demons.get(DemonName.AGARES)]
            ),
            new TarotNumber(
                TarotName.THREE_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.THREE,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.BINAH),
                planets.get(PlanetName.SUN),
                zodiacs.get(ZodiacName.ARIES),
                new DayTimeRange({ date: 31, month: 2 }, { date: 10, month: 3 }),
                [demons.get(DemonName.VASSAGO), demons.get(DemonName.GAMIGIN)]
            ),
            new TarotNumber(
                TarotName.FOUR_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.FOUR,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.CHESED),
                planets.get(PlanetName.VENUS),
                zodiacs.get(ZodiacName.ARIES),
                new DayTimeRange({ date: 11, month: 3 }, { date: 20, month: 3 }),
                [demons.get(DemonName.MARBAS), demons.get(DemonName.VELEFOR)]
            ),
            new TarotNumber(
                TarotName.FIVE_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.FIVE,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.GEVURAH),
                planets.get(PlanetName.SATURN),
                zodiacs.get(ZodiacName.LEO),
                new DayTimeRange({ date: 22, month: 6 }, { date: 1, month: 7 }),
                [demons.get(DemonName.GLASSYA_LABOLAS), demons.get(DemonName.BUNE)]
            ),
            new TarotNumber(
                TarotName.SIX_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.SIX,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.TIFERET),
                planets.get(PlanetName.JUPITER),
                zodiacs.get(ZodiacName.LEO),
                new DayTimeRange({ date: 2, month: 7 }, { date: 11, month: 7 }),
                [demons.get(DemonName.RONOVE), demons.get(DemonName.BERITH)]
            ),
            new TarotNumber(
                TarotName.SEVEN_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.SEVEN,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.NETZACH),
                planets.get(PlanetName.MARS),
                zodiacs.get(ZodiacName.LEO),
                new DayTimeRange({ date: 12, month: 7 }, { date: 22, month: 7 }),
                [demons.get(DemonName.ASTAROT), demons.get(DemonName.FORNEUS)]
            ),
            new TarotNumber(
                TarotName.EIGHT_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.EIGHT,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.HOD),
                planets.get(PlanetName.MERCURY),
                zodiacs.get(ZodiacName.SAGITTARIUS),
                new DayTimeRange({ date: 23, month: 10 }, { date: 2, month: 11 }),
                [demons.get(DemonName.CROCEL), demons.get(DemonName.FURCAS)]
            ),
            new TarotNumber(
                TarotName.NINE_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.NINE,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.YESOD),
                planets.get(PlanetName.MOON),
                zodiacs.get(ZodiacName.SAGITTARIUS),
                new DayTimeRange({ date: 3, month: 11 }, { date: 12, month: 11 }),
                [demons.get(DemonName.BALAM), demons.get(DemonName.ALLOCES)]
            ),
            new TarotNumber(
                TarotName.TEN_OF_WANDS,
                TarotSuit.WAND,
                TarotPosition.TEN,
                natures.get(NatureName.FIRE),
                sefiras.get(SefiraName.MALKUTH),
                planets.get(PlanetName.SATURN),
                zodiacs.get(ZodiacName.SAGITTARIUS),
                new DayTimeRange({ date: 13, month: 11 }, { date: 21, month: 11 }),
                [demons.get(DemonName.CAMIO), demons.get(DemonName.MURMUR)]
            ),
            new TarotAce(
                TarotName.ACE_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.ONE,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.KETER),
                new TarotAceZodiac([zodiacs.get(ZodiacName.LIBRA), zodiacs.get(ZodiacName.SCORPIO), zodiacs.get(ZodiacName.SAGITTARIUS)])
            ),

            new TarotNumber(
                TarotName.TWO_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.TWO,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.CHOKHMAH),
                planets.get(PlanetName.VENUS),
                zodiacs.get(ZodiacName.CANCER),
                new DayTimeRange({ date: 21, month: 5 }, { date: 1, month: 6 }),
                [demons.get(DemonName.SALLOS), demons.get(DemonName.PURSON)]
            ),
            new TarotNumber(
                TarotName.THREE_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.THREE,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.BINAH),
                planets.get(PlanetName.MERCURY),
                zodiacs.get(ZodiacName.CANCER),
                new DayTimeRange({ date: 2, month: 6 }, { date: 11, month: 6 }),
                [demons.get(DemonName.MARAX), demons.get(DemonName.YPOS)]
            ),
            new TarotNumber(
                TarotName.FOUR_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.FOUR,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.CHESED),
                planets.get(PlanetName.MOON),
                zodiacs.get(ZodiacName.CANCER),
                new DayTimeRange({ date: 12, month: 6 }, { date: 21, month: 6 }),
                [demons.get(DemonName.AIM), demons.get(DemonName.NABERIUS)]
            ),
            new TarotNumber(
                TarotName.FIVE_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.FIVE,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.GEVURAH),
                planets.get(PlanetName.MARS),
                zodiacs.get(ZodiacName.SCORPIO),
                new DayTimeRange({ date: 23, month: 9 }, { date: 1, month: 10 }),
                [demons.get(DemonName.SABNOK), demons.get(DemonName.SHAX)]
            ),
            new TarotNumber(
                TarotName.SIX_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.SIX,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.TIFERET),
                planets.get(PlanetName.SUN),
                zodiacs.get(ZodiacName.SCORPIO),
                new DayTimeRange({ date: 2, month: 10 }, { date: 11, month: 10 }),
                [demons.get(DemonName.VINE), demons.get(DemonName.BIFRONS)]
            ),
            new TarotNumber(
                TarotName.SEVEN_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.SEVEN,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.NETZACH),
                planets.get(PlanetName.VENUS),
                zodiacs.get(ZodiacName.SCORPIO),
                new DayTimeRange({ date: 12, month: 10 }, { date: 22, month: 10 }),
                [demons.get(DemonName.VUAL), demons.get(DemonName.HAAGENTI)]
            ),
            new TarotNumber(
                TarotName.EIGHT_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.EIGHT,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.HOD),
                planets.get(PlanetName.SATURN),
                zodiacs.get(ZodiacName.PISCES),
                new DayTimeRange({ date: 19, month: 1 }, { date: 28, month: 1 }),
                [demons.get(DemonName.AMDUCIAS), demons.get(DemonName.BELIAL)]
            ),
            new TarotNumber(
                TarotName.NINE_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.NINE,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.YESOD),
                planets.get(PlanetName.JUPITER),
                zodiacs.get(ZodiacName.PISCES),
                new DayTimeRange({ date: 1, month: 2 }, { date: 10, month: 2 }),
                [demons.get(DemonName.DECARABIA), demons.get(DemonName.SEERE)]

            ),
            new TarotNumber(
                TarotName.TEN_OF_CUPS,
                TarotSuit.CUP,
                TarotPosition.TEN,
                natures.get(NatureName.WATER),
                sefiras.get(SefiraName.MALKUTH),
                planets.get(PlanetName.MARS),
                zodiacs.get(ZodiacName.PISCES),
                new DayTimeRange({ date: 11, month: 2 }, { date: 20, month: 2 }),
                [demons.get(DemonName.DANTALION), demons.get(DemonName.ANDROMALIUS)]
            ),
            new TarotAce(
                TarotName.ACE_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.ONE,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.KETER),
                new TarotAceZodiac([zodiacs.get(ZodiacName.CAPRICORNUS), zodiacs.get(ZodiacName.AQUARIUS), zodiacs.get(ZodiacName.PISCES)])
            ),

            new TarotNumber(
                TarotName.TWO_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.TWO,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.CHOKHMAH),
                planets.get(PlanetName.MOON),
                zodiacs.get(ZodiacName.LIBRA),
                new DayTimeRange({ date: 23, month: 8 }, { date: 2, month: 9 }),
                [demons.get(DemonName.PHENEX), demons.get(DemonName.HALPHAS)]
            ),
            new TarotNumber(
                TarotName.THREE_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.THREE,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.BINAH),
                planets.get(PlanetName.SATURN),
                zodiacs.get(ZodiacName.LIBRA),
                new DayTimeRange({ date: 3, month: 9 }, { date: 12, month: 9 }),
                [demons.get(DemonName.MALPHAS), demons.get(DemonName.RAUM)]
            ),
            new TarotNumber(
                TarotName.FOUR_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.FOUR,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.CHESED),
                planets.get(PlanetName.JUPITER),
                zodiacs.get(ZodiacName.LIBRA),
                new DayTimeRange({ date: 13, month: 9 }, { date: 22, month: 9 }),
                [demons.get(DemonName.FOCALOR), demons.get(DemonName.VEPAR)]
            ),
            new TarotNumber(
                TarotName.FIVE_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.FIVE,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.GEVURAH),
                planets.get(PlanetName.VENUS),
                zodiacs.get(ZodiacName.AQUARIUS),
                new DayTimeRange({ date: 20, month: 0 }, { date: 29, month: 0 }),
                [demons.get(DemonName.ZAGAN), demons.get(DemonName.VALAC)]
            ),
            new TarotNumber(
                TarotName.SIX_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.SIX,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.TIFERET),
                planets.get(PlanetName.MERCURY),
                zodiacs.get(ZodiacName.AQUARIUS),
                new DayTimeRange({ date: 30, month: 0 }, { date: 8, month: 1 }),
                [demons.get(DemonName.ANDRAS), demons.get(DemonName.HAURES)]
            ),
            new TarotNumber(
                TarotName.SEVEN_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.SEVEN,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.NETZACH),
                planets.get(PlanetName.MOON),
                zodiacs.get(ZodiacName.AQUARIUS),
                new DayTimeRange({ date: 9, month: 1 }, { date: 18, month: 1 }),
                [demons.get(DemonName.ANDREALPHUS), demons.get(DemonName.KIMARIS)]
            ),
            new TarotNumber(
                TarotName.EIGHT_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.EIGHT,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.HOD),
                planets.get(PlanetName.JUPITER),
                zodiacs.get(ZodiacName.GEMINI),
                new DayTimeRange({ date: 21, month: 4 }, { date: 31, month: 4 }),
                [demons.get(DemonName.BELETH), demons.get(DemonName.LERAIE)]
            ),
            new TarotNumber(
                TarotName.NINE_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.NINE,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.YESOD),
                planets.get(PlanetName.MARS),
                zodiacs.get(ZodiacName.GEMINI),
                new DayTimeRange({ date: 1, month: 5 }, { date: 10, month: 5 }),
                [demons.get(DemonName.ELIGOS), demons.get(DemonName.ZEPAR)]
            ),
            new TarotNumber(
                TarotName.TEN_OF_SWORDS,
                TarotSuit.SWORD,
                TarotPosition.TEN,
                natures.get(NatureName.AIR),
                sefiras.get(SefiraName.MALKUTH),
                planets.get(PlanetName.SUN),
                zodiacs.get(ZodiacName.GEMINI),
                new DayTimeRange({ date: 11, month: 5 }, { date: 20, month: 5 }),
                [demons.get(DemonName.BOTIS), demons.get(DemonName.BATHIN)]
            ),
            new TarotAce(
                TarotName.ACE_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.ONE,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.KETER),
                new TarotAceZodiac([zodiacs.get(ZodiacName.ARIES), zodiacs.get(ZodiacName.TAURUS), zodiacs.get(ZodiacName.GEMINI)])
            ),
            new TarotNumber(
                TarotName.TWO_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.TWO,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.CHOKHMAH),
                planets.get(PlanetName.JUPITER),
                zodiacs.get(ZodiacName.CAPRICORNUS),
                new DayTimeRange({ date: 22, month: 11 }, { date: 30, month: 11 }),
                [demons.get(DemonName.OROBAS), demons.get(DemonName.GREMORY)]
            ),
            new TarotNumber(
                TarotName.THREE_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.THREE,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.BINAH),
                planets.get(PlanetName.MARS),
                zodiacs.get(ZodiacName.CAPRICORNUS),
                new DayTimeRange({ date: 31, month: 11 }, { date: 9, month: 0 }),
                [demons.get(DemonName.OSE), demons.get(DemonName.AMY)]
            ),
            new TarotNumber(
                TarotName.FOUR_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.FOUR,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.CHOKHMAH),
                planets.get(PlanetName.SUN),
                zodiacs.get(ZodiacName.CAPRICORNUS),
                new DayTimeRange({ date: 10, month: 0 }, { date: 19, month: 0 }),
                [demons.get(DemonName.ORIAS), demons.get(DemonName.VAPULA)]
            ),
            new TarotNumber(
                TarotName.FIVE_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.FIVE,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.GEVURAH),
                planets.get(PlanetName.MERCURY),
                zodiacs.get(ZodiacName.TAURUS),
                new DayTimeRange({ date: 21, month: 3 }, { date: 30, month: 3 }),
                [demons.get(DemonName.AMON), demons.get(DemonName.BARBATOS)]
            ),
            new TarotNumber(
                TarotName.SIX_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.SIX,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.TIFERET),
                planets.get(PlanetName.MOON),
                zodiacs.get(ZodiacName.TAURUS),
                new DayTimeRange({ date: 1, month: 4 }, { date: 10, month: 4 }),
                [demons.get(DemonName.PAIMON), demons.get(DemonName.BUER)]
            ),
            new TarotNumber(
                TarotName.SEVEN_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.SEVEN,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.NETZACH),
                planets.get(PlanetName.SATURN),
                zodiacs.get(ZodiacName.TAURUS),
                new DayTimeRange({ date: 11, month: 4 }, { date: 20, month: 4 }),
                [demons.get(DemonName.GUSION), demons.get(DemonName.SITRI)]
            ),
            new TarotNumber(
                TarotName.EIGHT_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.EIGHT,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.HOD),
                planets.get(PlanetName.SUN),
                zodiacs.get(ZodiacName.VIRGO),
                new DayTimeRange({ date: 23, month: 7 }, { date: 1, month: 8 }),
                [demons.get(DemonName.FORAS), demons.get(DemonName.ASMODAI)]
            ),
            new TarotNumber(
                TarotName.NINE_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.NINE,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.YESOD),
                planets.get(PlanetName.VENUS),
                zodiacs.get(ZodiacName.VIRGO),
                new DayTimeRange({ date: 2, month: 8 }, { date: 11, month: 8 }),
                [demons.get(DemonName.GAAP), demons.get(DemonName.FURFUR)]
            ),
            new TarotNumber(
                TarotName.TEN_OF_DISKS,
                TarotSuit.DISK,
                TarotPosition.TEN,
                natures.get(NatureName.EARTH),
                sefiras.get(SefiraName.MALKUTH),
                planets.get(PlanetName.MERCURY),
                zodiacs.get(ZodiacName.VIRGO),
                new DayTimeRange({ date: 12, month: 8 }, { date: 22, month: 8 }),
                [demons.get(DemonName.MARCHOSIAS), demons.get(DemonName.STOLAS)]
            )
        ]);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public getByIndex(index: number): Tarot {
        return !_.isNaN(index) && index > -1 ? this.collection[index] : null;
    }

    public getIndex(item: Tarot): number {
        return !_.isNil(item) ? this.collection.indexOf(item) : -1;
    }

    public setFilter(item: TarotFilterFunction): void {
        ArrayUtil.clear(this.filters);
        this.filters.push(item);
        this.refresh();
    }
}

export type TarotFilterFunction = FilterFunction<Tarot>;
