import { ProvinceModel} from './province.model';

export class DistrictsModel{
    id: number;
    name: string;
    provinces?: any;
    ubigeo?:string;
    users?: number;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
}