import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningPriceDto extends ITraceable {
    uid?: string;
    masterId?: number;
}

export type ITarotSpreadMeaningPriceDtoResponse = string;