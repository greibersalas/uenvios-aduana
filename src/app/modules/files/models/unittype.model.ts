import { Transferable } from '../../../config/Transferable';
import { UnittypeDto } from '../dtos/unittype-dto';

export class Unittype implements Transferable<UnittypeDto> {

    id: number;
    code: string;
    description: string;
  
    ToDTO(): UnittypeDto {
        const dto: UnittypeDto = ({
            id: this.id,
            code: this.code,
            description: this.description,
        });
        return dto;
    }

    FromDTO(from: UnittypeDto): Unittype {
        this.id = from.id;
        this.code = from.code;
        this.description= from.description;
        
        return this;
    }
}