import { ITraceable, IFilterable } from '@ts-core/common';
import { User, UserMaster } from '../../../user';

export interface ITarotSpreadMeaningMasterListDto extends IFilterable<User, UserMaster>, ITraceable { }

export interface ITarotSpreadMeaningMasterListDtoResponse extends Array<User> { }
