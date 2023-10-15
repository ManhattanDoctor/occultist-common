import { TarotSpreadMeaning } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningApproveDto extends ITraceable {
    id?: number;
    value?: string;
    delta?: number;
    comment?: string;
    isShowcase?: boolean;
}

export type ITarotSpreadMeaningApproveDtoResponse = TarotSpreadMeaning;