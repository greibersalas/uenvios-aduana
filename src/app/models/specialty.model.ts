import { BusinessLineModel } from './business-line.model'
export class SpecialtyModel{
    id: number;
    name: string;
    format?: string;
    description?: string;
    businessLines?: any;
    laboratory?: boolean;
    odontograma?: boolean;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
}