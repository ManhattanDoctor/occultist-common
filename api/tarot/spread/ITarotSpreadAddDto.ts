import { TarotSpread, TarotSpreadColor, TarotDesk, TarotSpreadMode, TarotSpreadPrivacy, TarotSpreadType } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadAddDto extends ITraceable {
    type: TarotSpreadType;
    mode: TarotSpreadMode;
    desk: TarotDesk;
    privacy: TarotSpreadPrivacy
    question: string
    indexesAmount: number;

    color?: TarotSpreadColor;
    advice?: number;
    comment?: string;
    querent?: string;
    indexes?: Array<number>;
    isNeedAdvice?: boolean;
}

export type ITarotSpreadAddDtoResponse = TarotSpread;