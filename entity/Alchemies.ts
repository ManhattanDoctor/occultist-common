import * as _ from 'lodash';
import { Planet, PlanetName, Planets } from './Planets';
import { FilterableMapCollection } from '@ts-core/common';
import { Zodiac, ZodiacName, Zodiacs } from './Zodiacs';
import { NatureName, Natures } from './Natures';
import { TarotName, Tarots } from './Tarots';
import { Sefiras } from './Sefiras';
import { EntityTypeName } from './Entities';
import { Entity } from './IEntity';

export enum AlchemyName {
    CALCINATION = '1',
    DISSOLUTION = '2',
    SEPARATION = '3',
    CONJUNCTION = '4',
    FERMENTATION = '5',
    DISTILLATION = '6',
    COAGULATION = '7',
}

export class Alchemy extends Entity<AlchemyName> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        name: AlchemyName,
        icon: string,
        public planet: Planet,
        public zodiac: Zodiac,
        links?: Array<Entity<EntityTypeName>>
    ) {
        super(name, icon);
        if (_.isNil(links)) {
            links = new Array();
        }
        links.push(planet, zodiac);
        links.forEach(item => item.addLink(this));
    }
}

export class Alchemies extends FilterableMapCollection<Alchemy> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(natures: Natures, planets: Planets, zodiacs: Zodiacs, tarots: Tarots, sefiras: Sefiras) {
        super('name');
        this.add(new Alchemy(AlchemyName.CALCINATION, 'aG', planets.get(PlanetName.SATURN), zodiacs.get(ZodiacName.ARIES), [natures.get(NatureName.FIRE), tarots.get(TarotName.EMPEROR)]));
        this.add(new Alchemy(AlchemyName.DISSOLUTION, 'dF', planets.get(PlanetName.JUPITER), zodiacs.get(ZodiacName.CANCER), [natures.get(NatureName.WATER), tarots.get(TarotName.MOON)]));
        this.add(new Alchemy(AlchemyName.SEPARATION, 'hE', planets.get(PlanetName.MARS), zodiacs.get(ZodiacName.SCORPIO), [natures.get(NatureName.AIR), tarots.get(TarotName.TOWER)]));
        this.add(new Alchemy(AlchemyName.CONJUNCTION, 'iA', planets.get(PlanetName.SUN), zodiacs.get(ZodiacName.SAGITTARIUS), [tarots.get(TarotName.HANGED_MAN), tarots.get(TarotName.TEMPERANCE)]));
        this.add(new Alchemy(AlchemyName.FERMENTATION, 'jD', planets.get(PlanetName.VENUS), zodiacs.get(ZodiacName.CAPRICORNUS), [natures.get(NatureName.EARTH), tarots.get(TarotName.DEATH)]));
        this.add(new Alchemy(AlchemyName.DISTILLATION, 'fC', planets.get(PlanetName.MERCURY), zodiacs.get(ZodiacName.VIRGO), [tarots.get(TarotName.HERMIT), tarots.get(TarotName.JUDGEMENT)]));
        this.add(new Alchemy(AlchemyName.COAGULATION, 'bB', planets.get(PlanetName.MOON), zodiacs.get(ZodiacName.TAURUS), [tarots.get(TarotName.MAGICIAN), tarots.get(TarotName.HIGH_PRIESTESS)]));
    }
}
