import { TarotSpread, TarotSpreadColor, TarotDesk, TarotSpreadPrivacy } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadEditDto extends ITraceable {
    uid?: string;
    desk?: TarotDesk;
    color?: TarotSpreadColor;
    querent?: string;
    privacy?: TarotSpreadPrivacy
}

export type ITarotSpreadEditDtoResponse = TarotSpread;