import { FilterableMapCollection } from '@ts-core/common';
import { Sefira } from './Sefiras';
import { NatureName, Nature, Natures } from './Natures';
import { Zodiac } from './Zodiacs';
import { Entity } from './IEntity';

export enum PlanetName {
    SATURN = '1',
    JUPITER = '2',
    MARS = '3',
    SUN = '4',
    VENUS = '5',
    MERCURY = '6',
    MOON = '7',
    URANUS = '8',
    NEPTUNE = '9',
    PLUTO = '10'
}

export class Planet extends Entity<PlanetName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public fall: Zodiac;
    public detriment: Zodiac;
    public dignity: Array<Zodiac> = new Array();
    public exaltation: Zodiac;

    public sefira: Sefira;

    public demons: Array<Entity> = new Array();
    public geniuses: Array<Entity> = new Array();
    
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: PlanetName, icon: string, public nature: Nature) {
        super(name, icon);
        nature.addToItems(this, nature.planets);
    }
}

export class Planets extends FilterableMapCollection<Planet> {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static ROW = [PlanetName.SATURN, PlanetName.JUPITER, PlanetName.MARS, PlanetName.SUN, PlanetName.VENUS, PlanetName.MERCURY, PlanetName.MOON];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(natures: Natures) {
        super('name');
        this.add(new Planet(PlanetName.SATURN, 'G', natures.get(NatureName.EARTH)));
        this.add(new Planet(PlanetName.JUPITER, 'F', natures.get(NatureName.FIRE)));
        this.add(new Planet(PlanetName.MARS, 'E', natures.get(NatureName.FIRE)));
        this.add(new Planet(PlanetName.SUN, 'A', natures.get(NatureName.FIRE)));
        this.add(new Planet(PlanetName.VENUS, 'D', natures.get(NatureName.WATER)));
        this.add(new Planet(PlanetName.MERCURY, 'C', natures.get(NatureName.AIR)));
        this.add(new Planet(PlanetName.MOON, 'B', natures.get(NatureName.WATER)));
        this.add(new Planet(PlanetName.URANUS, 'H', natures.get(NatureName.AIR)));
        this.add(new Planet(PlanetName.NEPTUNE, 'I', natures.get(NatureName.WATER)));
        this.add(new Planet(PlanetName.PLUTO, 'J', natures.get(NatureName.FIRE)));
    }
}
