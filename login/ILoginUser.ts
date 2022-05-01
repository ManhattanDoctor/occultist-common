import { Type } from 'class-transformer';

export class LoginUser {
    id: string;
    name: string;

    isMale?: boolean;
    picture?: string;
    location?: string;
    description?: string;

    @Type(() => Date)
    birthday?: Date;

    vk?: string;
    facebook?: string;
    telegram?: string;
    instagram?: string;
}

export class VkLoginUser extends LoginUser {
    params: string;
}
