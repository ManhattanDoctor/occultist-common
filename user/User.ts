import { Type } from 'class-transformer';
import { LoginResource } from '../api/login';
import { UserAccount } from './UserAccount';
import { UserPreferences } from './UserPreferences';

export class User {
    public id: number;
    public login: string;
    public status: UserStatus;
    public resource: LoginResource;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => UserAccount)
    public account: UserAccount;
    @Type(() => UserPreferences)
    public preferences: UserPreferences;
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    NON_ACTIVE = 'NON_ACTIVE'
}
