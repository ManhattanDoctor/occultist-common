import { ITraceable } from '@ts-core/common';

export interface IPaymentOrderInitDto extends ITraceable {
    quantity: string;
}
export interface IPaymentOrderInitDtoResponse {
    name: string;
    amount: string;
    orderId: string;
    quantity: number;
    signature: string;
}
