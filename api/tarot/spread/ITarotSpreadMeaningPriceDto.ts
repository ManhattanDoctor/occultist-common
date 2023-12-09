import { ITraceable } from '@ts-core/common';
import { ICoinAmount } from '../../../coin';
import { TarotSpreadType } from '../../../tarot';

export interface ITarotSpreadMeaningPriceDto extends ITraceable {
    type: TarotSpreadType;
    masterId?: number;
}

export type ITarotSpreadMeaningPriceDtoResponse = ICoinAmount;