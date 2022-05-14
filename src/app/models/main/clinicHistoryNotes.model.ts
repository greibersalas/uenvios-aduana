import { DoctorModel } from '../doctor.model';

export interface ClinicHistoryNotesModel{
    id: number;
    clinichistory: number;
    title: string;
    note: string;
    doctor: any;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;

}