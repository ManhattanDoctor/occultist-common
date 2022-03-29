import { ITraceable } from '@ts-core/common/trace';
import { TarotSpread } from '../../../tarot';

export interface ITarotSpreadDto extends ITraceable {
    comment?: string;
    querent?: string;
}

export type ITarotSpreadDtoResponse = TarotSpread;


