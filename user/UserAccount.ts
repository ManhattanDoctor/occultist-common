export class UserAccount {
    type: UserAccountType;
}

export enum UserAccountType {
    FREE = 'FREE',
    ADVANCED = 'ADVANCED',
    ADMINISTRATOR = 'ADMINISTRATOR'
}
