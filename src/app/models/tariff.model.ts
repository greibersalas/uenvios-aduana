
export class TariffModel{
    id: number;
    name: string;
    // tslint:disable-next-line: variable-name
    price_sol: number;
    // tslint:disable-next-line: variable-name
    price_usd: number;
    odontograma: boolean;
    bracket: boolean;
    cost?: number;
    // tslint:disable-next-line: variable-name
    cost_usd?: number;
    // tslint:disable-next-line: variable-name
    dental_status?: any;
    description?: string;
    specialty?: any;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
    idkeyfacil?: string;
}
