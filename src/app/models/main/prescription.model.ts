export interface PrescriptionModel{
    id: number;
    name: string;
    amount: number;
    presentation: string;
    indications: string;
    observations: string;
    clinichistory: number;
    medicalact: number;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
}