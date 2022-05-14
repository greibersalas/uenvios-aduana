import { FileGroupModel } from './files-group.model';

export class FilesModel{
    id: number;
    desciption: string;
    fila_name: string;
    file_ext: string;
    state: number;
    createdAt: string;
    updatedAt: string;
    filegroup: FileGroupModel
}