import { ITraceable } from '@ts-core/common/trace';
import { ILoginAuthToken, LoginUser } from '../../login';
import { LoginResource } from './LoginResource';

export interface ILoginDto extends ITraceable {
    data: LoginData;
    resource: LoginResource;
}

export interface ILoginDtoResponse {
    sid: string;
}

export type LoginData = ILoginAuthToken | LoginUser;