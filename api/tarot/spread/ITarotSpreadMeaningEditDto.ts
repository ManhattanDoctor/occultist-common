import { TarotSpreadMeaning } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningEditDto extends ITraceable {
    id?: number;
    value: string;
}

export type ITarotSpreadMeaningEditDtoResponse = TarotSpreadMeaning;