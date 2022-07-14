import { TarotSpread, TarotSpreadDesk, TarotSpreadPrivacy } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadEditDto extends ITraceable {
    uid?: string;
    desk?: TarotSpreadDesk;
    querent?: string;
    privacy?: TarotSpreadPrivacy
    question?: string
}

export type ITarotSpreadEditDtoResponse = TarotSpread;