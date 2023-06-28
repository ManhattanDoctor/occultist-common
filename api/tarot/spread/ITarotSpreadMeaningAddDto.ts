
import { TarotSpreadMeaning } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningAddDto extends ITraceable {
    uid: string;
    comment?: string;
}

export type ITarotSpreadMeaningAddDtoResponse = TarotSpreadMeaning;