import { Qliphoth } from './Qliphoth';
import { Hebrew, HebrewName } from './Hebrews';
import { Nature, NatureName } from './Natures';
import { Planet, PlanetName } from './Planets';

import { Sefira, SefiraName } from './Sefiras';
import { Tarot, TarotName } from './Tarots';
import { Zodiac, ZodiacName } from './Zodiacs';
import { ZodiacAngleSpirit, ZodiacAngleSpiritName } from './ZodiacAngleSpirits';
import { ZodiacDecanSpirit, ZodiacDecanSpiritName } from './ZodiacDecanSpirits';
import { Alchemy, AlchemyName } from './Alchemies';
import { Demon, DemonName } from './Demons';
import { Genius, GeniusName } from './Geniuses';
import { Ahet, AhetName } from './Ahets';
import { Sin, SinName } from './Sins';
import { Entity } from './IEntity';

export let Entities = [Nature, Planet, Zodiac, ZodiacAngleSpirit, ZodiacDecanSpirit, Hebrew, Sefira, Qliphoth, Tarot, Alchemy, Demon, Genius, Ahet, Sin];

export type EntityType = Nature | Planet | Zodiac | ZodiacAngleSpirit | ZodiacDecanSpirit | Hebrew | Sefira | Qliphoth | Tarot | Alchemy | Demon | Genius | Ahet | Sin | Entity<string>;
export type EntityTypeName = NatureName | PlanetName | ZodiacName | ZodiacAngleSpiritName | ZodiacDecanSpiritName | HebrewName | SefiraName | TarotName | AlchemyName | DemonName | GeniusName | AhetName | SinName | string;

// Can't use constructor.name coz after compilation it minimized

export enum EntityName {
    SIN = 'Sin',
    AHET = 'Ahet',
    TAROT = 'Tarot',
    NATURE = 'Nature',
    PLANET = 'Planet',
    ZODIAC = 'Zodiac',
    HEBREW = 'Hebrew',
    SEFIRA = 'Sefira',
    DEMON = 'Demon',
    GENIUS = 'Genius',
    ALCHEMY = 'Alchemy',
    QLIPHOTH = 'Qliphoth',
    ZODIAC_ANGLE_SPIRIT = 'ZodiacAngleSpirit',
    ZODIAC_DECAN_SPIRIT = 'ZodiacDecanSpirit',
    //
    TAROT_SPREAD_TYPE = 'TarotSpreadType',
}

export function getEntityName(item: EntityType): EntityName {
    if (item instanceof Nature) {
        return EntityName.NATURE;
    }
    if (item instanceof Planet) {
        return EntityName.PLANET;
    }
    if (item instanceof Zodiac) {
        return EntityName.ZODIAC;
    }
    if (item instanceof ZodiacAngleSpirit) {
        return EntityName.ZODIAC_ANGLE_SPIRIT;
    }
    if (item instanceof ZodiacDecanSpirit) {
        return EntityName.ZODIAC_DECAN_SPIRIT;
    }
    if (item instanceof Hebrew) {
        return EntityName.HEBREW;
    }
    if (item instanceof Sefira) {
        return EntityName.SEFIRA;
    }
    if (item instanceof Qliphoth) {
        return EntityName.QLIPHOTH;
    }
    if (item instanceof Tarot) {
        return EntityName.TAROT;
    }
    if (item instanceof Alchemy) {
        return EntityName.ALCHEMY;
    }
    if (item instanceof Demon) {
        return EntityName.DEMON;
    }
    if (item instanceof Genius) {
        return EntityName.GENIUS;
    }
    if (item instanceof Ahet) {
        return EntityName.AHET;
    }
    if (item instanceof Sin) {
        return EntityName.SIN;
    }
    return null;
}