
import { TarotSpreadMeaningAi } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningAiAddDto extends ITraceable {
    uid: string;
}

export type ITarotSpreadMeaningAiAddDtoResponse = TarotSpreadMeaningAi;