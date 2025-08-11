import { FilterableMapCollection } from '@ts-core/common';
import { Entity } from './IEntity';

export class Natures extends FilterableMapCollection<Nature> {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super('name');
        this.add(new Nature(NatureName.FIRE, '🜂'));
        this.add(new Nature(NatureName.WATER, '🜄'));
        this.add(new Nature(NatureName.AIR, '🜁'));
        this.add(new Nature(NatureName.EARTH, '🜃'));
    }
}

export enum NatureName {
    FIRE = '1',
    WATER = '2',
    AIR = '3',
    EARTH = '4'
}

export class Nature extends Entity<NatureName> {
    public demons: Array<Entity> = new Array();
    public sefiras: Array<Entity> = new Array();
    public zodiacs: Array<Entity> = new Array();
    public planets: Array<Entity> = new Array();
    public geniuses: Array<Entity> = new Array();
}
