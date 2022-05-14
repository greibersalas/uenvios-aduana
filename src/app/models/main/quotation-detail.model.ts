import { TariffModel } from '../tariff.model';

export class QuotationDetailModel{
    tariff: TariffModel;
    price: number;
    quantity: number;
    porce_discount: boolean;
    discount: number;
    total: number;
    coin?: any;
    id?: number;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
    quotation?: number
}