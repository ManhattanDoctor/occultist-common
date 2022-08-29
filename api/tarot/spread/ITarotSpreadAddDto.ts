import { TarotSpread, TarotSpreadColor, TarotSpreadDesk, TarotSpreadMode, TarotSpreadPrivacy, TarotSpreadType } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadAddDto extends ITraceable {
    type: TarotSpreadType;
    mode: TarotSpreadMode;
    desk: TarotSpreadDesk;
    privacy: TarotSpreadPrivacy
    question: string
    indexesAmount: number;
    
    color?: TarotSpreadColor;
    comment?: string;
    querent?: string;
    indexes?: Array<number>;
}

export type ITarotSpreadAddDtoResponse = TarotSpread;