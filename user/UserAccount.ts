export class UserAccount {
    type: UserAccountType;
    isDisableBonuses?: boolean;
    isDisableCommentAdd?: boolean;
    isDisableTarotSpreadMeaningAdd?: boolean;
}

export enum UserAccountType {
    FREE = 'FREE',
    MASTER = 'MASTER',
    ADMINISTRATOR = 'ADMINISTRATOR'
}
