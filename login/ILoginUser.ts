import { UserPreferences } from '@project/common/user';

export class LoginUser {
    id: string;
    preferences: Partial<UserPreferences>;
}

export class VkLoginUser extends LoginUser {
    params: string;
}
