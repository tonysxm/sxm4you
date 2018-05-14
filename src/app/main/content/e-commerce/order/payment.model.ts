import { FuseUtils } from '@fuse/utils';

export class Payment
{
    id: string;
    orderId: number;
    paymentMethod: number;
    amount: number;
    date: string;

    constructor(payment?)
    {
        payment = payment || {};
        this.id = payment.id || FuseUtils.generateGUID();
        this.orderId = payment.orderId || payment.order_id || '';
        this.paymentMethod = payment.paymentMethod || payment.payment_method || '';
        this.amount = payment.amount || '';
        this.date = payment.date || payment.payment_date || new Date();
    }
}
