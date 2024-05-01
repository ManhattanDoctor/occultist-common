import { ITraceable } from "@ts-core/common";

export interface IVkDonatersCheckDto extends ITraceable {
    token: string;
}

export interface IVkDonatersCheckDtoResponse {
    added: number;
    removed: number;
}