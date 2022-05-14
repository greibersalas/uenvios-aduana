export class DocumentsModel{
    id: number;
    name: string;
    description: string;
    length?: number;
    correlative?: number;
    state?: number;
    createdAt?: Date;
    updatedAt?: Date;
}