import { User } from "../../user";

export interface IStatisticsPeopleGetDtoResponse {
    masters: Array<User>;
    donaters: Array<User>;
}