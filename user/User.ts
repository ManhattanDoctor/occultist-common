import { Type } from 'class-transformer';
import { UserAccount } from './UserAccount';
import { UserPreferences } from './UserPreferences';

export class User {
    public id: number;
    public login: string;
    public status: UserStatus;

    @Type(() => Date)
    public createdDate: Date;
    public isTwoFaEnabled: boolean;

    public account: UserAccount;
    public preferences: UserPreferences;
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    NON_ACTIVE = 'NON_ACTIVE'
}
