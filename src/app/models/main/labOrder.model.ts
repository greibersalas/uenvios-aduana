export class LabOrderModel{
    quotation_detail: any;
    doctor: any;
    date: string;
    tariff: any;
    color: string;
    chip: boolean;
    assistant: string;
    job: string;
    instalation: string;
    elaboration: string;
    hour:string;
    technique: string;
    observation: string;
    cpt?: string;
    superior_indications?: string;
    lower_indications?: string;
    observation_prescription?: string;
    reason: string;
    id?: number;
    state?: number;
    createdAt?: string;
    updatedAt?: string;
}

export class LabOrderLabeledModel{
    date: string;
    status: any;
    laborder: number;
    id?: number;
    state?: number;
    createdAt?: string;
    updatedAt?: string;
}