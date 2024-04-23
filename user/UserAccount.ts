export class UserAccount {
    type: UserAccountType;
    isPreferred?: boolean;
    isDisableBonuses?: boolean;
    isDisableCommentAdd?: boolean;
    isDisableTarotSpreadMeaningAdd?: boolean;
}

export enum UserAccountType {
    FREE = 'FREE',
    MASTER = 'MASTER',
    ADMINISTRATOR = 'ADMINISTRATOR'
}
