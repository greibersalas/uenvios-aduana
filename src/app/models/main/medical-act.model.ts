export interface MedicalActModel{
    id: number;
    examine_income: string;
    reason: string;
    bone_scan: boolean;
    periodontogram: boolean;
    clinical_photography: boolean;
    laboratory_exams: boolean;
    study_models: boolean;
    radiographic_report: string;
    reservation: number;
    state?: number;
    createdAt?: string;
    updatedAt?: string;
}

export class MedicalActAttentionModel{
    medicalact: any;
    businessline: any;
    specialty: any;
    tariff: any;
    quantity: number;
    doctor: any;
    user: any;
    date: string;
    patient: any;
    lab_cost: number;
    idpaymentmethod: number;
    commission: number;
    value?: number;
    co?: any;
    id?: number;
    state?: number;
}
