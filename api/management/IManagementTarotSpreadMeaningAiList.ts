import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { TarotSpread, TarotSpreadMeaningAi } from '../../tarot';

export interface IManagementTarotSpreadMeaningAiListDto extends IPaginable<TarotSpreadMeaningAi, TarotSpread>, ITraceable { }

export interface IManagementTarotSpreadMeaningAiListDtoResponse extends IPagination<TarotSpreadMeaningAi> { }
