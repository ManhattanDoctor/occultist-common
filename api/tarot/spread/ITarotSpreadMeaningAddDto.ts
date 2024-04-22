
import { TarotSpreadMeaning } from '../../../tarot';
import { ITraceable } from '@ts-core/common';

export interface ITarotSpreadMeaningAddDto extends ITraceable {
    uid: string;
    bonus?: string;
    comment?: string;
    masterId?: number;
}

export interface ITarotSpreadMeaningAddDtoResponse {
    queue: number;
    meaning: TarotSpreadMeaning;
}