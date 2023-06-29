import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { TarotSpread, TarotSpreadMeaning } from '../../tarot';

export interface IManagementTarotSpreadMeaningListDto extends IPaginable<TarotSpreadMeaning, TarotSpread>, ITraceable { }

export interface IManagementTarotSpreadMeaningListDtoResponse extends IPagination<TarotSpreadMeaning> { }
