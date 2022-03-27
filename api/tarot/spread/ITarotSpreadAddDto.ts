import { ITarotSpreadDto } from './ITarotSpreadDto';
import { TarotSpread, TarotSpreadDesk, TarotSpreadMode, TarotSpreadPrivacy, TarotSpreadType } from '../../../tarot';

export interface ITarotSpreadAddDto extends ITarotSpreadDto {
    type: TarotSpreadType;
    mode: TarotSpreadMode;
    desk: TarotSpreadDesk;
    privacy: TarotSpreadPrivacy
    indexes?: Array<number>;
}

export type ITarotSpreadAddDtoResponse = TarotSpread;