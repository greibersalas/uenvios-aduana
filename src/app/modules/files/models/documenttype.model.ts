import { Transferable } from '../../../config/Transferable';
import { DocumentTypeDto } from '../dtos/documenttype-dto';

export class DocumentType implements Transferable<DocumentTypeDto> {

    idtypedocument: number;
    code: string;
    name: string;
    code_sunat : string;
    description : string;
   

    ToDTO(): DocumentTypeDto {
        const dto: DocumentTypeDto = ({
            idtypedocument: this.idtypedocument,
            code: this.code,
            name: this.name,
            code_sunat: this.code_sunat,
            description: this.description
        });
        return dto;
    }

    FromDTO(from: DocumentTypeDto): DocumentType {
        this.idtypedocument = from.idtypedocument;
        this.code = from.code;
        this.name = from.name;
        this.code_sunat = from.code_sunat;
        this.description = from.description;
        return this;
    }
}