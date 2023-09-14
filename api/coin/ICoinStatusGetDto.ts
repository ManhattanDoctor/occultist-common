import { CoinAccounts } from "../../coin";
import { CoinBonusDto } from "./CoinBonusDto";

export interface CoinStatusGetDtoResponse {
    bonus: CoinBonusDto;
    balances: CoinAccounts;
}
