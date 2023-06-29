import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { TarotSpread, TarotSpreadMeaning } from '../../tarot';

export interface IManagementTarotSpreadMeaningListDto extends IPaginable<TarotSpread, TarotSpreadMeaning>, ITraceable { }

export interface IManagementTarotSpreadMeaningListDtoResponse extends IPagination<TarotSpread> { }
