import { User } from "@project/common/user";
import { ITraceable } from "@ts-core/common";

export interface IStatisticsGetDto extends ITraceable { }

export interface IStatisticsGetDtoResponse {
    usersCount: number;
    tarotSpreadsCount: number;
    tarotSpreadMeaningsCount: number;

    masters: Array<User>;
    donaters: Array<User>;
}