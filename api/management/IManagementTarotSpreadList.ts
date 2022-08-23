import { ITraceable, IPaginable } from '@ts-core/common';
import { TarotSpread } from '../../tarot';

export interface IManagementTarotSpreadListDto extends IPaginable<TarotSpread, any>, ITraceable { }
