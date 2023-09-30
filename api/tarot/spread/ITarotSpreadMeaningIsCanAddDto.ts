import { ITraceable } from '@ts-core/common';
import { TarotSpreadType } from '../../../tarot';

export interface ITarotSpreadMeaningIsCanAddDto extends ITraceable {
    type?: TarotSpreadType;
}