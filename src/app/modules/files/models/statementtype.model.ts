import { Transferable } from '../../../config/Transferable';
import { StatementTypeDto } from '../dtos/statementtype-dto';

export class StatementType implements Transferable<StatementTypeDto> {

    idtypedeclaration: number;
    code: string;
    description: string;
   

    ToDTO(): StatementTypeDto {
        const dto: StatementTypeDto = ({
            idtypedeclaration: this.idtypedeclaration,
            code: this.code,
            description: this.description,
        });
        return dto;
    }

    FromDTO(from: StatementTypeDto): StatementType {
        this.idtypedeclaration = from.idtypedeclaration;
        this.code = from.code;
        this.description = from.description
        return this;
    }
}