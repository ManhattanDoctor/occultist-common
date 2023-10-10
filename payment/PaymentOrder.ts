
import * as _ from 'lodash';

export class PaymentOrder {
    id: number;
    name: string;
    status: PaymentOrderStatus;
    amount: string;
    orderId: string;
    quantity: number;
    currency: string;
    createdDate: Date;

    userId?: number;
    paymentId?: number;
    finishedDate?: Date;
}

export enum PaymentOrderStatus {
    CREATED = 'CREATED',
    SUCCEED = 'SUCCEED',
    FAILED = 'FAILED',
}


