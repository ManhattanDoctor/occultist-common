import { UserPreferences } from "../user";

export class LoginUser {
    id: string;
    preferences: Partial<UserPreferences>;
}

export class VkLoginUser extends LoginUser {
    params: string;
}

export class GoUser extends LoginUser {
    constructor(item: any) {
        super();
        this.id = item.sub;
        this.preferences = {
            name: item.name,
            email: item.email,
            locale: item.locale,
            picture: item.picture,
        }
    }
}
