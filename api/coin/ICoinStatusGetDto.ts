import { ITraceable } from "@ts-core/common";
import { CoinAccounts } from "../../coin";
import { CoinBonusDto } from "./CoinBonusDto";

export interface ICoinStatusGetDto extends ITraceable {
    vkInternalParams?: string;
}

export class CoinStatusGetDtoResponse {
    bonus: CoinBonusDto;
    balances: CoinAccounts;
}
