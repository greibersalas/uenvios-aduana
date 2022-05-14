export class EnvironmentDoctorModel{
    id: number;
    name: string;
    description?: string;
    interval: number;
    campus: any;
    businessline: string;
    schedule_morning_since: string;
    schedule_morning_until: string;
    lunch_since: string;
    lunch_until: string;
    schedule_afternoon_since: string;
    schedule_afternoon_until: string;
    time_cleaning?: number;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
}