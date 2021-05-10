import { ITraceable } from '@ts-core/common/trace';

export interface ILoginDto extends ITraceable {
    resource: string;
    data: any;
}

export interface ILoginDtoResponse {
    sid: string;
}
