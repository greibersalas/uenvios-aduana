import { ReservaDetail } from "./reserva-detail";

export class FormSearchResult{
    numberquo: number;
    patient_id:number;
    doctor: string;
    doctor_id: number;
    patient: string;
    date?: string;
    detail?:ReservaDetail[];
    specialty:string;
}