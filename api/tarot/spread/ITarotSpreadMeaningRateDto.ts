import { TarotSpreadMeaning } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningRateDto extends ITraceable {
    id?: number;
    rating: number;
}

export type ITarotSpreadMeaningRateDtoResponse = TarotSpreadMeaning;