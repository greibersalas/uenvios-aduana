import { CoinModel } from '../../models/coin.model';
import { BusinessLineModel } from '../../models/business-line.model';
import { DoctorModel } from '../../models/doctor.model';
import { SpecialtyModel } from '../../models/specialty.model';
import { TariffModel } from '../../models/tariff.model';
import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';


export class FormInput {
    id: number;
    date: string;
    document_number: string;
    patient: any;
    cellphone: string;
    age: number;
    bl: BusinessLineModel;
    specialty: SpecialtyModel;
    doctor: any;
    total: number;
    subtotal: number;
    tax: number;
    discount: number;
    odontograma?: any;
    clinicHistory?: ClinicHistoryModel;
    businessLine?: BusinessLineModel;
    history?: string;
}

export class FormDetail{
    id: number;
    tariff: any;
    price: number;
    quantity: number;
    discount: number;
    total: number;
    coin?: any;
    porce_discount: boolean;
    quotation?: number;
}

export interface QuotationDetail{
    idDentalStatus: number,
    idtariff: number,
    quantity: number,
    tariff: TariffModel,
    coin: any
}