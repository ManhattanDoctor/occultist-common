import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { TarotSpread } from '../../tarot';

export interface IManagementTarotSpreadListDto extends IPaginable<TarotSpread, any>, ITraceable { }

export interface IManagementTarotSpreadListDtoResponse extends IPagination<TarotSpread> { }
