import { TarotSpread } from "@project/common/tarot";
import { IPaginable, IPagination, ITraceable } from "@ts-core/common";
import { User } from "../../../user";

export interface ITarotSpreadUserListDto extends IPaginable<TarotSpread>, ITraceable { }

export type ITarotSpreadUserListDtoResponse = Array<User>;
