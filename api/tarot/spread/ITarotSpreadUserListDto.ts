import { IPage, IPagination, ITraceable } from "@ts-core/common";
import { User } from "../../../user";

export interface ITarotSpreadUserListDto extends IPage, ITraceable { }

export interface ITarotSpreadUserListDtoResponse extends IPagination<User> { }