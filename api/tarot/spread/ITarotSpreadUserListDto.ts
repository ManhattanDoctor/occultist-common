import { ITraceable } from "@ts-core/common";
import { User } from "../../../user";

export interface ITarotSpreadUserListDto extends ITraceable {
    pageIndex: number;
}

export type ITarotSpreadUserListDtoResponse = Array<User>;
