import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { TarotSpread } from '../../../tarot';

export interface ITarotSpreadListDto extends IPaginable<TarotSpread>, ITraceable { }

export interface ITarotSpreadListDtoResponse extends IPagination<TarotSpread> { }
