import { TarotSpread, TarotSpreadColor, TarotSpreadDesk, TarotSpreadPrivacy } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadEditDto extends ITraceable {
    uid?: string;
    desk?: TarotSpreadDesk;
    color?: TarotSpreadColor;
    querent?: string;
    privacy?: TarotSpreadPrivacy
    question?: string
}

export type ITarotSpreadEditDtoResponse = TarotSpread;