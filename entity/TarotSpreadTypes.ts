import { FilterableMapCollection } from "@ts-core/common";
import { Entity } from "./IEntity";
import { TarotSpreadKind, TarotSpreadType } from "../tarot";

export class TarotSpreadTypes extends FilterableMapCollection<TarotSpreadTypeEntity> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super('name');
        this.addItems([
            new TarotSpreadTypeEntity(TarotSpreadType.CELTIC_CROSS, TarotSpreadKind.UNIVERSAL, 101),
            new TarotSpreadTypeEntity(TarotSpreadType.THREE, TarotSpreadKind.UNIVERSAL, 102),

            new TarotSpreadTypeEntity(TarotSpreadType.STAR, TarotSpreadKind.ANALYTICAL, 201),
            new TarotSpreadTypeEntity(TarotSpreadType.WHEEL_OF_FORTUNE, TarotSpreadKind.ANALYTICAL, 202),
            new TarotSpreadTypeEntity(TarotSpreadType.NEXT_STEP, TarotSpreadKind.ANALYTICAL, 203),
            new TarotSpreadTypeEntity(TarotSpreadType.HUMAN_ANALYSIS, TarotSpreadKind.ANALYTICAL, 204),
            new TarotSpreadTypeEntity(TarotSpreadType.OPEN_DOOR, TarotSpreadKind.ANALYTICAL, 205),
            new TarotSpreadTypeEntity(TarotSpreadType.HELP_YOURSELF, TarotSpreadKind.ANALYTICAL, 206),
            new TarotSpreadTypeEntity(TarotSpreadType.BLACK_STRIPE, TarotSpreadKind.ANALYTICAL, 207),
            new TarotSpreadTypeEntity(TarotSpreadType.MY_DREAM, TarotSpreadKind.ANALYTICAL, 208),
            new TarotSpreadTypeEntity(TarotSpreadType.MY_BLOCKS, TarotSpreadKind.ANALYTICAL, 209),
            new TarotSpreadTypeEntity(TarotSpreadType.WHEN_ITS_VERY_BAD, TarotSpreadKind.ANALYTICAL, 210),

            new TarotSpreadTypeEntity(TarotSpreadType.EXPRESS, TarotSpreadKind.PROPHETIC, 301),
            new TarotSpreadTypeEntity(TarotSpreadType.SITUATION_PROGRESS, TarotSpreadKind.PROPHETIC, 302),
            new TarotSpreadTypeEntity(TarotSpreadType.MONTH, TarotSpreadKind.PROPHETIC, 303),
            new TarotSpreadTypeEntity(TarotSpreadType.HOUSES_12, TarotSpreadKind.PROPHETIC, 304),
            new TarotSpreadTypeEntity(TarotSpreadType.FORK, TarotSpreadKind.PROPHETIC, 305),
            new TarotSpreadTypeEntity(TarotSpreadType.CROSSROAD, TarotSpreadKind.PROPHETIC, 306),
            new TarotSpreadTypeEntity(TarotSpreadType.DECISION, TarotSpreadKind.PROPHETIC, 307),
            new TarotSpreadTypeEntity(TarotSpreadType.TRAVEL_OR_RELOCATION, TarotSpreadKind.PROPHETIC, 308),

            new TarotSpreadTypeEntity(TarotSpreadType.TRAIN_STATION_FOR_TWO_2, TarotSpreadKind.RELATIONSHIP, 401),
            new TarotSpreadTypeEntity(TarotSpreadType.RECIPROCITY_IN_RELATIONSHIPS, TarotSpreadKind.RELATIONSHIP, 402),
            new TarotSpreadTypeEntity(TarotSpreadType.BREAK_OR_RAPPROCHEMENT, TarotSpreadKind.RELATIONSHIP, 403),
            new TarotSpreadTypeEntity(TarotSpreadType.WILL_WE_BE_TOGETHER, TarotSpreadKind.RELATIONSHIP, 404),
            new TarotSpreadTypeEntity(TarotSpreadType.MARRIAGE, TarotSpreadKind.RELATIONSHIP, 405),
            new TarotSpreadTypeEntity(TarotSpreadType.MARRIAGE_2, TarotSpreadKind.RELATIONSHIP, 406),
            new TarotSpreadTypeEntity(TarotSpreadType.RECONCILIATION, TarotSpreadKind.RELATIONSHIP, 407),
            new TarotSpreadTypeEntity(TarotSpreadType.PROSPECTS_IN_RELATIONSHIP, TarotSpreadKind.RELATIONSHIP, 408),
            new TarotSpreadTypeEntity(TarotSpreadType.BLUNDER, TarotSpreadKind.RELATIONSHIP, 409),
            new TarotSpreadTypeEntity(TarotSpreadType.UNREALITY, TarotSpreadKind.RELATIONSHIP, 410),
            new TarotSpreadTypeEntity(TarotSpreadType.TURN_LEFT, TarotSpreadKind.RELATIONSHIP, 411),
            new TarotSpreadTypeEntity(TarotSpreadType.DARK_FOG, TarotSpreadKind.RELATIONSHIP, 412),
            new TarotSpreadTypeEntity(TarotSpreadType.FAMILY_PROBLEMS, TarotSpreadKind.RELATIONSHIP, 413),
            new TarotSpreadTypeEntity(TarotSpreadType.WILL_HE_COMEBACK, TarotSpreadKind.RELATIONSHIP, 414),
            new TarotSpreadTypeEntity(TarotSpreadType.RELATIONSHIP_POTENTIAL, TarotSpreadKind.RELATIONSHIP, 415),
            new TarotSpreadTypeEntity(TarotSpreadType.LEAVE_OR_STAY, TarotSpreadKind.RELATIONSHIP, 416),

            new TarotSpreadTypeEntity(TarotSpreadType.MONEY_TREE, TarotSpreadKind.WEALTH, 501),
            new TarotSpreadTypeEntity(TarotSpreadType.IMPROVE_FINANCIAL_SITUATION, TarotSpreadKind.WEALTH, 502),
            new TarotSpreadTypeEntity(TarotSpreadType.FULL_CAP, TarotSpreadKind.WEALTH, 503),
            new TarotSpreadTypeEntity(TarotSpreadType.WORK, TarotSpreadKind.WEALTH, 504),
        ]);
    }
}

export class TarotSpreadTypeEntity extends Entity<TarotSpreadType> {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(name: TarotSpreadType, public kind: TarotSpreadKind, public index: number) {
        super(name);
    }
}