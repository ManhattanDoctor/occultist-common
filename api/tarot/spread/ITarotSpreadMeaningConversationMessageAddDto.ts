
import { AiConversationMessage } from '../../../ai';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningConversationMessageAddDto extends ITraceable {
    id?: number;
    text: string;
}

export type ITarotSpreadMeaningConversationMessageAddDtoResponse = AiConversationMessage;