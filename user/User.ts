import { Type } from 'class-transformer';
import { UserAccount } from './UserAccount';
import { UserPreferences } from './UserPreferences';
import { UserStatistics } from './UserStatistics';

export class User {
    public id: number;
    public login: string;
    public status: UserStatus;
    public resource: UserResource;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => UserAccount)
    public account: UserAccount;

    @Type(() => UserPreferences)
    public preferences: UserPreferences;

    @Type(() => UserStatistics)
    public statistics?: UserStatistics;
}

export enum UserResource {
    VK = 'VK',
    MAIL = 'MAIL',
    YANDEX = 'YANDEX',
    GOOGLE = 'GOOGLE',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    NON_ACTIVE = 'NON_ACTIVE'
}

