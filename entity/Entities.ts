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
export function getEntityName(item: EntityType): string {
    if (item instanceof Nature) {
        return 'Nature';
    }
    if (item instanceof Planet) {
        return 'Planet';
    }
    if (item instanceof Zodiac) {
        return 'Zodiac';
    }
    if (item instanceof ZodiacAngleSpirit) {
        return 'ZodiacAngleSpirit';
    }
    if (item instanceof ZodiacDecanSpirit) {
        return 'ZodiacDecanSpirit';
    }
    if (item instanceof Hebrew) {
        return 'Hebrew';
    }
    if (item instanceof Sefira) {
        return 'Sefira';
    }
    if (item instanceof Qliphoth) {
        return 'Qliphoth';
    }
    if (item instanceof Tarot) {
        return 'Tarot';
    }
    if (item instanceof Alchemy) {
        return 'Alchemy';
    }
    if (item instanceof Demon) {
        return 'Demon';
    }
    if (item instanceof Genius) {
        return 'Genius';
    }
    if (item instanceof Ahet) {
        return 'Ahet';
    }
    if (item instanceof Sin) {
        return 'Sin';
    }
    return null;
}