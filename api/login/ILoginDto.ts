import { ITraceable } from '@ts-core/common';
import { VkUser, IOAuthDto } from '@ts-core/oauth';
import { LoginResource } from './LoginResource';

export interface ILoginDto<T = LoginData> extends ITraceable {
    data: T;
    resource: LoginResource;
}

export interface ILoginDtoResponse {
    sid: string;
}

export type LoginData = IOAuthDto | VkUser;