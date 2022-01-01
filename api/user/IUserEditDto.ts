import { UserUid } from '@ts-core/angular';
import { ITraceable } from '@ts-core/common/trace';
import { User, UserAccount, UserPreferences } from '../../user';

export interface IUserEditDto extends ITraceable {
    uid?: UserUid;
    account?: Partial<UserAccount>;
    preferences?: Partial<UserPreferences>;
}
export declare type IUserEditDtoResponse = User;
