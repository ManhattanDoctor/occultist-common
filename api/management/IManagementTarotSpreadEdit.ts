import { ITraceable, } from '@ts-core/common';
import { TarotDesk, TarotSpreadColor, TarotSpreadPrivacy } from '../../tarot';

export interface IManagementTarotSpreadEditDto extends ITraceable {
    desk?: TarotDesk;
    color?: TarotSpreadColor;
    privacy?: TarotSpreadPrivacy;
}
