import { IPaginable, IPagination } from '@ts-core/common';
import { ITraceable } from '@ts-core/common';
import { User, UserPreferences } from '../../user';

export interface IUserListDto extends IPaginable<User, UserPreferences>, ITraceable { }

export interface IUserListDtoResponse extends IPagination<User> { }
