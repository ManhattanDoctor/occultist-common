import { ITraceable, IPaginable } from '@ts-core/common';
import { TarotSpread } from '../../tarot';
import { UserPreferences } from '../../user';

export interface IManagementTarotSpreadListDto extends IPaginable<TarotSpread, UserPreferences>, ITraceable { }
