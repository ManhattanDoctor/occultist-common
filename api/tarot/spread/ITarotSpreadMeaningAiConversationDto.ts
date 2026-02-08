import { ITraceable } from '@ts-core/common';
import { TarotSpreadMeaningAi } from '../../../tarot';

export interface ITarotSpreadMeaningAiConversationDtoResponse extends ITraceable {
    meaning: TarotSpreadMeaningAi;
    amount: string;
}