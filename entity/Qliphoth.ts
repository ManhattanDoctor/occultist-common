import { FilterableMapCollection } from '@ts-core/common';
import { Sefira, SefiraName, Sefiras } from './Sefiras';
import { Entity } from './IEntity';

export type QliphothName = SefiraName;

export class Qliphoth extends Entity<QliphothName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public sefira: Sefira;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: QliphothName, icon: string) {
        super(name, icon);
    }
}

export class Qliphoths extends FilterableMapCollection<Qliphoth> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super('name');
        this.add(new Qliphoth(SefiraName.KETER, 'fas fa-dice'));
        this.add(new Qliphoth(SefiraName.CHOKHMAH, 'fas fa-bahai'));
        this.add(new Qliphoth(SefiraName.BINAH, 'fas fa-spider'));
        this.add(new Qliphoth(SefiraName.CHESED, 'fas fa-heart-broken'));
        this.add(new Qliphoth(SefiraName.GEVURAH, 'fas fa-burn'));
        this.add(new Qliphoth(SefiraName.TIFERET, 'fas fa-balance-scale-left'));
        this.add(new Qliphoth(SefiraName.NETZACH, 'fas fa-crow'));
        this.add(new Qliphoth(SefiraName.HOD, 'fas fa-book-dead'));
        this.add(new Qliphoth(SefiraName.YESOD, 'fas fa-moon'));
        this.add(new Qliphoth(SefiraName.MALKUTH, 'fas fa-globe'));
        Sefiras.sort(this as any);
    }
}
