
import { TarotSpreadMeaning, TarotSpreadMeaningRejectReason, TarotSpreadMeaningStatus } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningEditDto extends ITraceable {
    id?: number;
    value?: string;
    status?: TarotSpreadMeaningStatus;
    reason?: TarotSpreadMeaningRejectReason;
}

export type ITarotSpreadMeaningEditDtoResponse = TarotSpreadMeaning;