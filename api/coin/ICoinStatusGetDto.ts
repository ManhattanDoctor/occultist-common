import { ITraceable } from "@ts-core/common";
import { CoinAccounts } from "../../coin";
import { IUserDetails } from "../user";
import { CoinBonusDto } from "./CoinBonusDto";

export interface ICoinStatusGetDto extends ITraceable {
    details?: IUserDetails
}

export class CoinStatusGetDtoResponse {
    bonus: CoinBonusDto;
    balances: CoinAccounts;
}
