export class FormInput {
    id: number;
    date: any;
    campus: any;
    client: any;
    name: string;
    lastNameFather: string;
    lastNameMother: string;
    address: string;
    district: any;
    documentNumber: string;
    phone: string;
    email: string;
    relationship: string;
    history: string;
    birthdate: any;
    vip: boolean;
    sex: string;
    ruc: string;
    country: string;
    cellphone: string;
    studyCenter: string;
    knowledge: string;
    referred: string;
    placeOrigen: string;
    birthPlace: string;
    previousAttentions: string;
    insuranceCarrier: any;
    // tslint:disable-next-line: variable-name
    history_correlative?: number;
    attorney?: string;
    // tslint:disable-next-line: variable-name
    invoise_type_document: string;
    // tslint:disable-next-line: variable-name
    invoise_num_document: string;
}

export class OdontograModel{
    name: string;
    clinichistory: number;
    quotation?: number;
    id?: number;
    state?: number;
    createdAt?: string;
    updatedAt?: string;
}

export class AnamnesisModel{

    id: number;
    clinichistory: any;
    // tslint:disable-next-line: variable-name
    emergency_contact_name?: string;
    // tslint:disable-next-line: variable-name
    emergency_contact_cellphone?: string;
    medicine?: boolean;
    // tslint:disable-next-line: variable-name
    medicine_name?: string;
    // tslint:disable-next-line: variable-name
    medic_name?: string;
    // tslint:disable-next-line: variable-name
    medic_cellphone?: string;
    hepatitis?: boolean;
    // tslint:disable-next-line: variable-name
    hepatitis_type?: string;
    diabetes?: boolean;
    compensated?: boolean;
    // tslint:disable-next-line: variable-name
    high_pressure?: boolean;
    // tslint:disable-next-line: variable-name
    suffers_illness?: string;
    // tslint:disable-next-line: variable-name
    visit_frequency?: string;
    // tslint:disable-next-line: variable-name
    traumatic_experiences?: string;
    // tslint:disable-next-line: variable-name
    extracted_molars?: string;
    // tslint:disable-next-line: variable-name
    complication_anesthesia?: string;
    // tslint:disable-next-line: variable-name
    gums_bleed?: boolean;
    // tslint:disable-next-line: variable-name
    last_prophylaxis?: string;
    popping?: string;
    // tslint:disable-next-line: variable-name
    satisfied_aesthetic?: string;
    // tslint:disable-next-line: variable-name
    last_date?: string;
    user?: any;
    state?: number;
    createdAt?: string;
    updatedAt?: string;
}
