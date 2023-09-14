import { CoinAccounts } from "../../coin";
import { CoinBonusDto } from "./CoinBonusDto";

export class CoinStatusGetDtoResponse {
    bonus: CoinBonusDto;
    balances: CoinAccounts;
}
