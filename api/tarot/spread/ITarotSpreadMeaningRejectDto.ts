import { TarotSpreadMeaning, TarotSpreadMeaningRejectReason } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningRejectDto extends ITraceable {
    id?: number;
    reason: TarotSpreadMeaningRejectReason;
    comment?: string;
    isNeedRefund?: boolean;
}

export type ITarotSpreadMeaningRejectDtoResponse = TarotSpreadMeaning;