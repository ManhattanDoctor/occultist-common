import { ITraceable } from "@ts-core/common";

export interface IStatisticsGetDto extends ITraceable { }

export interface IStatisticsGetDtoResponse {
    usersCount: number;
    tarotSpreadsCount: number;
    tarotSpreadMeaningsCount: number;
}