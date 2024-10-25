import { ITraceable } from '@ts-core/common';
import { TarotSpreadType } from '../../../tarot';

export interface ITarotSpreadMeaningAiIsCanAddDto extends ITraceable {
    type?: TarotSpreadType;
}