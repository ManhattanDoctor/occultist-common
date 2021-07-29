import { ITraceable } from '@ts-core/common/trace';
import { LoginResource } from './LoginResource';

export interface ILoginDto extends ITraceable {
    data: any;
    resource: LoginResource;
}

export interface ILoginDtoResponse {
    sid: string;
}
