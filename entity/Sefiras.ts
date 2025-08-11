import * as _ from 'lodash';
import { ColumnName } from './Columns';
import { Nature, NatureName, Natures } from './Natures';
import { Qliphoth, Qliphoths } from './Qliphoth';
import { Planet, PlanetName, Planets } from './Planets';
import { ArrayUtil, FilterableMapCollection, MapCollection } from '@ts-core/common';
import { Entity } from './IEntity';

export enum SefiraName {
    KETER = '1',
    CHOKHMAH = '2',
    BINAH = '3',
    CHESED = '4',
    GEVURAH = '5',
    TIFERET = '6',
    NETZACH = '7',
    HOD = '8',
    YESOD = '9',
    MALKUTH = '10'
}

export class Sefira extends Entity<SefiraName> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        name: SefiraName,
        icon: string,
        public column: ColumnName,
        public nature: Nature,
        public world: Nature,
        public qliphoth: Qliphoth,
        public planet: Planet
    ) {
        super(name, icon);

        if (!_.isNil(nature)) {
            nature.addToItems(this, nature.sefiras);
        }
        if (!_.isNil(qliphoth)) {
            this.addLink(qliphoth);
            qliphoth.sefira = this;
        }
        if (!_.isNil(planet)) {
            this.addLink(planet);
            planet.sefira = this;
        }
    }
}

export class Sefiras extends FilterableMapCollection<Sefira> {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static sort<T>(map: MapCollection<Entity<T>>): void {
        ArrayUtil.clear(map.collection);
        map.collection.push(
            map.get(SefiraName.BINAH),
            map.get(SefiraName.KETER),
            map.get(SefiraName.CHOKHMAH),
            map.get(SefiraName.GEVURAH),
            map.get(SefiraName.TIFERET),
            map.get(SefiraName.CHESED),
            map.get(SefiraName.HOD),
            map.get(SefiraName.YESOD),
            map.get(SefiraName.NETZACH),
            map.get(SefiraName.MALKUTH)
        );
    }

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(natures: Natures, planets: Planets, qliphoths: Qliphoths) {
        super('name');
        this.addItems([
            new Sefira(
                SefiraName.KETER,
                'fas fa-crown',
                ColumnName.CENTER,
                natures.get(NatureName.AIR),
                natures.get(NatureName.FIRE),
                qliphoths.get(SefiraName.KETER),
                planets.get(PlanetName.PLUTO)
            ),
            new Sefira(
                SefiraName.CHOKHMAH,
                'fas fa-star-of-david',
                ColumnName.RIGHT,
                natures.get(NatureName.FIRE),
                natures.get(NatureName.WATER),
                qliphoths.get(SefiraName.CHOKHMAH),
                planets.get(PlanetName.NEPTUNE)
            ),
            new Sefira(
                SefiraName.BINAH,
                'fas fa-torah',
                ColumnName.LEFT,
                natures.get(NatureName.WATER),
                natures.get(NatureName.WATER),
                qliphoths.get(SefiraName.BINAH),
                planets.get(PlanetName.SATURN)
            ),
            new Sefira(
                SefiraName.CHESED,
                'fas fa-hand-holding-heart',
                ColumnName.RIGHT,
                natures.get(NatureName.WATER),
                natures.get(NatureName.AIR),
                qliphoths.get(SefiraName.CHESED),
                planets.get(PlanetName.JUPITER)
            ),
            new Sefira(
                SefiraName.GEVURAH,
                'fas fa-fist-raised',
                ColumnName.LEFT,
                natures.get(NatureName.FIRE),
                natures.get(NatureName.AIR),
                qliphoths.get(SefiraName.GEVURAH),
                planets.get(PlanetName.MARS)
            ),
            new Sefira(
                SefiraName.TIFERET,
                'fas fa-balance-scale',
                ColumnName.CENTER,
                natures.get(NatureName.AIR),
                natures.get(NatureName.AIR),
                qliphoths.get(SefiraName.TIFERET),
                planets.get(PlanetName.SUN)
            ),
            new Sefira(
                SefiraName.NETZACH,
                'fas fa-fire',
                ColumnName.RIGHT,
                natures.get(NatureName.FIRE),
                natures.get(NatureName.AIR),
                qliphoths.get(SefiraName.NETZACH),
                planets.get(PlanetName.VENUS)
            ),
            new Sefira(
                SefiraName.HOD,
                'fas fa-university',
                ColumnName.LEFT,
                natures.get(NatureName.AIR),
                natures.get(NatureName.AIR),
                qliphoths.get(SefiraName.HOD),
                planets.get(PlanetName.MERCURY)
            ),
            new Sefira(
                SefiraName.YESOD,
                'fas fa-cube',
                ColumnName.CENTER,
                natures.get(NatureName.WATER),
                natures.get(NatureName.AIR),
                qliphoths.get(SefiraName.YESOD),
                planets.get(PlanetName.MOON)
            ),
            new Sefira(
                SefiraName.MALKUTH,
                'fas fa-globe',
                ColumnName.CENTER,
                natures.get(NatureName.EARTH),
                natures.get(NatureName.EARTH),
                qliphoths.get(SefiraName.MALKUTH),
                null
            )
        ]);
        // Sefiras.sort(this as any);
    }
}
