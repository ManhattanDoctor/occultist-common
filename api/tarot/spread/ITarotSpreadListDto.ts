import { IPaginable, IPagination } from '@ts-core/common/dto';
import { ITraceable } from '@ts-core/common/trace';
import { TarotSpread } from '../../../tarot';

export interface ITarotSpreadListDto extends IPaginable<TarotSpread>, ITraceable {}

export interface ITarotSpreadListDtoResponse extends IPagination<TarotSpread> {}
