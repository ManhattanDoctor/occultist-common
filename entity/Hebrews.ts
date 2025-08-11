import * as _ from 'lodash';
import { NatureName, Natures } from './Natures';
import { PlanetName, Planets } from './Planets';
import { ZodiacName, Zodiacs } from './Zodiacs';
import { Sefira, SefiraName, Sefiras } from './Sefiras';
import { EntityType } from './Entities';
import { ArrayUtil, FilterableMapCollection, FilterFunction } from '@ts-core/common';
import { HebrewAlphabet, HebrewAlphabetLetter, HebrewAlphabetName, HebrewAlphabetNumber, HebrewAlphabetType, HebrewAlphabetValue } from './HebrewAlphabet';
import { Entity } from './IEntity';

export type HebrewName = HebrewAlphabetName;

export class Hebrew extends Entity<HebrewName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _letter: HebrewAlphabetLetter;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(letter: HebrewAlphabetLetter, public manager: EntityType, public cinnarot: Array<Sefira>, public seferYetzirahManager?: EntityType) {
        super(letter.name, letter.value);
        this._letter = letter;

        cinnarot.forEach(item => item.addLink(this));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get letter(): HebrewAlphabetLetter {
        return this._letter;
    }

    public get label(): string {
        return this.letter.label;
    }

    public get number(): HebrewAlphabetNumber {
        return this.letter.number;
    }

    public get value(): HebrewAlphabetValue {
        return this.letter.value;
    }

    public get type(): HebrewAlphabetType {
        return this.letter.type;
    }

    public get last(): HebrewAlphabetLetter {
        return this.letter.last;
    }
}

export class Hebrews extends FilterableMapCollection<Hebrew> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(sefiras: Sefiras, natures: Natures, planets: Planets, zodiacs: Zodiacs) {
        super('name');

        this.addItems([
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.ALEPH), natures.get(NatureName.AIR), [sefiras.get(SefiraName.KETER), sefiras.get(SefiraName.CHOKHMAH)], natures.get(NatureName.AIR)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.BET), planets.get(PlanetName.MERCURY), [sefiras.get(SefiraName.KETER), sefiras.get(SefiraName.BINAH)], planets.get(PlanetName.SATURN)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.GIMEL), planets.get(PlanetName.MOON), [sefiras.get(SefiraName.KETER), sefiras.get(SefiraName.TIFERET)], planets.get(PlanetName.JUPITER)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.DALET), planets.get(PlanetName.VENUS), [sefiras.get(SefiraName.CHOKHMAH), sefiras.get(SefiraName.BINAH)], planets.get(PlanetName.MARS)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.HE), zodiacs.get(ZodiacName.AQUARIUS), [sefiras.get(SefiraName.CHOKHMAH), sefiras.get(SefiraName.TIFERET)], zodiacs.get(ZodiacName.ARIES)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.WAW), zodiacs.get(ZodiacName.TAURUS), [sefiras.get(SefiraName.CHOKHMAH), sefiras.get(SefiraName.CHESED)], zodiacs.get(ZodiacName.TAURUS)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.ZAYIN), zodiacs.get(ZodiacName.GEMINI), [sefiras.get(SefiraName.BINAH), sefiras.get(SefiraName.TIFERET)], zodiacs.get(ZodiacName.GEMINI)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.HETH), zodiacs.get(ZodiacName.CANCER), [sefiras.get(SefiraName.BINAH), sefiras.get(SefiraName.GEVURAH)], zodiacs.get(ZodiacName.CANCER)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.TETH), zodiacs.get(ZodiacName.LEO), [sefiras.get(SefiraName.CHESED), sefiras.get(SefiraName.GEVURAH)], zodiacs.get(ZodiacName.LEO)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.YODH), zodiacs.get(ZodiacName.VIRGO), [sefiras.get(SefiraName.CHESED), sefiras.get(SefiraName.TIFERET)], zodiacs.get(ZodiacName.VIRGO)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.KAPH), planets.get(PlanetName.JUPITER), [sefiras.get(SefiraName.CHESED), sefiras.get(SefiraName.NETZACH)], planets.get(PlanetName.SUN)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.LAMED), zodiacs.get(ZodiacName.LIBRA), [sefiras.get(SefiraName.GEVURAH), sefiras.get(SefiraName.TIFERET)], zodiacs.get(ZodiacName.LIBRA)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.MEM), natures.get(NatureName.WATER), [sefiras.get(SefiraName.GEVURAH), sefiras.get(SefiraName.HOD)], natures.get(NatureName.WATER)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.NUN), zodiacs.get(ZodiacName.SCORPIO), [sefiras.get(SefiraName.TIFERET), sefiras.get(SefiraName.NETZACH)], zodiacs.get(ZodiacName.SCORPIO)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.SAMEKH), zodiacs.get(ZodiacName.SAGITTARIUS), [sefiras.get(SefiraName.TIFERET), sefiras.get(SefiraName.YESOD)], zodiacs.get(ZodiacName.SAGITTARIUS)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.AYIN), zodiacs.get(ZodiacName.CAPRICORNUS), [sefiras.get(SefiraName.TIFERET), sefiras.get(SefiraName.HOD)], zodiacs.get(ZodiacName.CAPRICORNUS)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.PE), planets.get(PlanetName.MARS), [sefiras.get(SefiraName.HOD), sefiras.get(SefiraName.NETZACH)], planets.get(PlanetName.VENUS)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.TSADHE), zodiacs.get(ZodiacName.ARIES), [sefiras.get(SefiraName.NETZACH), sefiras.get(SefiraName.YESOD)], zodiacs.get(ZodiacName.AQUARIUS)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.QOPH), zodiacs.get(ZodiacName.PISCES), [sefiras.get(SefiraName.NETZACH), sefiras.get(SefiraName.MALKUTH)], zodiacs.get(ZodiacName.PISCES)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.RESH), planets.get(PlanetName.SUN), [sefiras.get(SefiraName.HOD), sefiras.get(SefiraName.YESOD)], planets.get(PlanetName.MERCURY)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.SHIN), natures.get(NatureName.FIRE), [sefiras.get(SefiraName.HOD), sefiras.get(SefiraName.MALKUTH)], natures.get(NatureName.FIRE)),
            new Hebrew(HebrewAlphabet.names.get(HebrewAlphabetName.TAW), planets.get(PlanetName.SATURN), [sefiras.get(SefiraName.HOD), sefiras.get(SefiraName.MALKUTH)], planets.get(PlanetName.MOON))
        ]);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public setFilter(item: HebrewFilterFunction): void {
        ArrayUtil.clear(this.filters);
        this.filters.push(item);
        this.refresh();
    }
}

export type HebrewFilterFunction = FilterFunction<Hebrew>;
