import { ITraceable } from '@ts-core/common';
import { TarotSpreadMeaning } from '../../../tarot';

export interface ITarotSpreadMeaningConversationDtoResponse extends ITraceable {
    meaning: TarotSpreadMeaning;
    amount: string;
}