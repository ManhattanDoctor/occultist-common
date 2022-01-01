import { ITraceable } from '@ts-core/common/trace';
import { User, UserAccount, UserPreferences } from '../../user';

export interface IUserEditDto extends ITraceable {
    uid?: string | number;
    account?: Partial<UserAccount>;
    preferences?: Partial<UserPreferences>;
}
export declare type IUserEditDtoResponse = User;
