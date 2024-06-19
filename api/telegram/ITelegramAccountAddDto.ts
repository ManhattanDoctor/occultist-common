import { ITraceable } from "@ts-core/common";
import { TgUser } from "@ts-core/oauth";

export interface ITelegramAccountAddDto extends ITraceable {
    user: TgUser;
}
