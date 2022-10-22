import { ITraceable } from '@ts-core/common';
import { ILoginAuthCode, LoginUser } from '../../login';
import { LoginResource } from './LoginResource';

export interface ILoginDto<T = LoginData> extends ITraceable {
    data: T;
    resource: LoginResource;
}

export interface ILoginDtoResponse {
    sid: string;
}

export type LoginData = ILoginAuthCode | LoginUser;