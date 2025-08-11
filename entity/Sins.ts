import * as _ from 'lodash';
import { FilterableMapCollection } from '@ts-core/common';
import { Demon } from './Demons';
import { Entity } from './IEntity';

export enum SinName {
    STULTITIA = '1',
    TRISTITIA = '2',
    INANIS_GLORIA = '3',
    IRA = '4',
    SUPERBIA = '5',
    INVIDIA = '6',
    AVARITIA = '7',
    GULA = '8',
    LUXURIA = '9',
}

export enum SinType {
    PUSH = 'PUSH',
    PULL = 'PULL',
    HALT = 'HALT',
}

export enum SinKind {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
}

export class Sin extends Entity<SinName> {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public king: Demon;
    public primary: Sin;
    public secondaries: Array<Sin>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: SinName, public type: SinType, public kind: SinKind) {
        super(name, '☇');
    }


    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public addSecondaries(items: Array<Sin>): void {
        if (_.isNil(this.secondaries)) {
            this.secondaries = new Array();
        }
        for (let item of items) {
            if (this.secondaries.includes(item)) {
                continue;
            }
            item.primary = this;
            this.secondaries.push(item);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get entourage(): Array<Demon> {
        return this.king.entourage;
    }
}

export class Sins extends FilterableMapCollection<Sin> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super('name');
        this.add(new Sin(SinName.STULTITIA, SinType.HALT, SinKind.PRIMARY));
        this.add(new Sin(SinName.TRISTITIA, SinType.HALT, SinKind.SECONDARY));
        this.add(new Sin(SinName.INANIS_GLORIA, SinType.HALT, SinKind.SECONDARY));
        this.add(new Sin(SinName.IRA, SinType.PUSH, SinKind.PRIMARY));
        this.add(new Sin(SinName.SUPERBIA, SinType.PUSH, SinKind.SECONDARY));
        this.add(new Sin(SinName.INVIDIA, SinType.PUSH, SinKind.SECONDARY));
        this.add(new Sin(SinName.AVARITIA, SinType.PULL, SinKind.PRIMARY));
        this.add(new Sin(SinName.GULA, SinType.PULL, SinKind.SECONDARY));
        this.add(new Sin(SinName.LUXURIA, SinType.PULL, SinKind.SECONDARY));

        this.primaries.forEach(item => item.addSecondaries(_.filter(this.collection, { type: item.type, kind: SinKind.SECONDARY })));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get primaries(): Array<Sin> {
        return _.filter(this.collection, { kind: SinKind.PRIMARY });
    }

    public get secondaries(): Array<Sin> {
        return _.filter(this.collection, { kind: SinKind.SECONDARY });
    }
}
