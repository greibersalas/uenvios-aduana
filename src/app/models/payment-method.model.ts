export class PaymentMethodModel{
    id: number;
    name: string;
    description: string;
    commission: number;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
