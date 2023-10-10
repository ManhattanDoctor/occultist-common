import { ITraceable } from '@ts-core/common';

export interface IPaymentOrderInitDto extends ITraceable {
    amount: string;
}
export interface IPaymentOrderInitDtoResponse {
    name: string;
    amount: string;
    orderId: string;
    quantity: number;
    signature: string;
}
