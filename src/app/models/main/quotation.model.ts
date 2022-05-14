import { DoctorModel } from '../doctor.model';
import { SpecialtyModel } from '../specialty.model';
import { QuotationDetailModel } from './quotation-detail.model';

export class QuotationModel{
    date: string;
    clinicHistory: any;
    businessLine: number;
    specialty: SpecialtyModel;
    doctor: DoctorModel;
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    detail: any[];
    id?: number;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
    odontograma?: any;
}