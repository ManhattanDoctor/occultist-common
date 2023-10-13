import { ITraceable } from "@ts-core/common";
import { Type } from 'class-transformer';
import { CoinAccounts } from "../../coin";
import { IUserDetails } from "../user";
import { CoinBonusDto } from "./CoinBonusDto";

export interface ICoinStatusGetDto extends ITraceable {
    details?: IUserDetails
}

export class CoinStatusGetDtoResponse {
    @Type(() => CoinBonusDto)
    bonus: CoinBonusDto;

    balances: CoinAccounts;
}
