import { CampusModel } from './campus.model';
import { DistrictsModel } from './districts.model';

export class ClinicHistoryModel{
    id: number;
    campus?: CampusModel;
    client?: number;
    name?: string;
    date?: Date;
    lastNameFather?: string;
    lastNameMother?: string;
    address?: string;
    district?: DistrictsModel;
    documentNumber?: string;
    phone?: string;
    email?: string;
    relationship?: string;
    history?: string;
    birthdate?: Date;
    vip?: boolean;
    sex?: string;
    ruc?: string;
    country?: string;
    cellphone?: string;
    studyCenter?: string;
    knowledge?: string;
    referred?: string;
    placeOrigen?: string;
    birthPlace?: string;
    previousAttentions?: string;
    insuranceCarrier?: number;
    // tslint:disable-next-line: variable-name
    history_correlative?: number;
    attorney?: string;
    // tslint:disable-next-line: variable-name
    invoise_type_document?: string;
    // tslint:disable-next-line: variable-name
    invoise_num_document?: string;
}
