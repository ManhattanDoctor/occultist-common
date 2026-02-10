import { TarotSpreadType } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadGuessDto extends ITraceable {
    question: string
}

export interface ITarotSpreadGuessDtoResponse {
    type?: TarotSpreadType;
}