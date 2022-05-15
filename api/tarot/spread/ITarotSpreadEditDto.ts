import { TarotSpread, TarotSpreadDesk, TarotSpreadPrivacy } from '../../../tarot';
import { ITraceable } from '@ts-core/common/trace';

export interface ITarotSpreadEditDto extends ITraceable {
    desk?: TarotSpreadDesk;
    querent?: string;
    privacy?: TarotSpreadPrivacy
    question?: string
}

export type ITarotSpreadEditDtoResponse = TarotSpread;