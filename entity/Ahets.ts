import { FilterableMapCollection } from "@ts-core/common";
import { Demon, DemonType } from "./Demons";
import { Genius } from "./Geniuses";
import { Entity } from "./IEntity";

export class Ahets extends FilterableMapCollection<Ahet> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super('name');
        this.add(new Ahet(AhetName.SITAS));
        this.add(new Ahet(AhetName.CONNECTIVITIA));
        this.add(new Ahet(AhetName.PROCURSUS));
        this.add(new Ahet(AhetName.COMPLEXUS));
        this.add(new Ahet(AhetName.COMMERCIUM));
        this.add(new Ahet(AhetName.EMINENTIA));
        this.add(new Ahet(AhetName.INDULGENTIA));
        this.add(new Ahet(AhetName.CAUSALITAS));
        this.add(new Ahet(AhetName.DILATATIO));
        this.add(new Ahet(AhetName.SALVOS));
        this.add(new Ahet(AhetName.USUS));
        this.add(new Ahet(AhetName.ATTRACTIO));
        this.add(new Ahet(AhetName.CONGRUENTIA));
        this.add(new Ahet(AhetName.AEQUILIBRIUM));
        this.add(new Ahet(AhetName.AUCTORITAS));
        this.add(new Ahet(AhetName.SOCIALITATEM));
        this.add(new Ahet(AhetName.INCITAMENTUM));
        this.add(new Ahet(AhetName.SUBSIDIUM));
        this.add(new Ahet(AhetName.COGITATIO));
        this.add(new Ahet(AhetName.PHYLOKALIA));
        this.add(new Ahet(AhetName.DEFENITO));
        this.add(new Ahet(AhetName.INVENTARIUM));
        this.add(new Ahet(AhetName.CATALOGUS));
        this.add(new Ahet(AhetName.ARTE));
        this.add(new Ahet(AhetName.OPPOSITIO));
        this.add(new Ahet(AhetName.PURIFICATIO));
        this.add(new Ahet(AhetName.AESTIMATIO));
        this.add(new Ahet(AhetName.CONTINUITAS));
        this.add(new Ahet(AhetName.IMAGINEM_FACTIO));
        this.add(new Ahet(AhetName.EXHIBENT));
        this.add(new Ahet(AhetName.RATIO));
        this.add(new Ahet(AhetName.INTEGRITAS));
        this.add(new Ahet(AhetName.FACTU));
        this.add(new Ahet(AhetName.PRUDENTIAM));
        this.add(new Ahet(AhetName.PROFUSUM));
        this.add(new Ahet(AhetName.VEXILLUM));
    }
}

export class Ahet extends Entity<AhetName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public demonDay: Demon;
    public demonNight: Demon;

    public geniusDay: Genius;
    public geniusNight: Genius;

    public demons: Array<Demon> = new Array();
    public geniuses: Array<Genius> = new Array();

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: AhetName) {
        super(name, '☉');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public addGenius(item: Genius): Genius {
        switch (item.type) {
            case DemonType.DAY:
                this.geniusDay = item;
                break;
            case DemonType.NIGHT:
                this.geniusNight = item;
                break;
        }
        return super.addToItems(item, this.geniuses);
    }

    public addDemon(item: Demon): Demon {
        item.ahet = this;
        switch (item.type) {
            case DemonType.DAY:
                this.demonDay = item;
                break;
            case DemonType.NIGHT:
                this.demonNight = item;
                break;
        }
        return super.addToItems(item, this.demons);
    }

}
export enum AhetName {
    SITAS = '1',
    CONNECTIVITIA = '2',
    PROCURSUS = '3',
    COMPLEXUS = '4',
    COMMERCIUM = '5',
    EMINENTIA = '6',
    INDULGENTIA = '7',
    CAUSALITAS = '8',
    DILATATIO = '9',
    SALVOS = '10',
    USUS = '11',
    ATTRACTIO = '12',
    CONGRUENTIA = '13',
    AEQUILIBRIUM = '14',
    AUCTORITAS = '15',
    SOCIALITATEM = '16',
    INCITAMENTUM = '17',
    SUBSIDIUM = '18',
    COGITATIO = '19',
    PHYLOKALIA = '20',
    DEFENITO = '21',
    INVENTARIUM = '22',
    CATALOGUS = '23',
    ARTE = '24',
    OPPOSITIO = '25',
    PURIFICATIO = '26',
    AESTIMATIO = '27',
    CONTINUITAS = '28',
    IMAGINEM_FACTIO = '29',
    EXHIBENT = '30',
    RATIO = '31',
    INTEGRITAS = '32',
    FACTU = '33',
    PRUDENTIAM = '34',
    PROFUSUM = '35',
    VEXILLUM = '36',
}