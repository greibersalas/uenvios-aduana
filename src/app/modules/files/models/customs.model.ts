import { Transferable } from '../../../config/Transferable';
import { CustomsDto } from '../dtos/customs-dto';

export class Customs implements Transferable<CustomsDto> {

    idcustoms: number;
    code: string;
    description: string;
  
    ToDTO(): CustomsDto {
        const dto: CustomsDto = ({
            idcustoms: this.idcustoms,
            code: this.code,
            description: this.description,
        });
        return dto;
    }

    FromDTO(from: CustomsDto): Customs {
        this.idcustoms = from.idcustoms;
        this.code = from.code;
        this.description= from.description;
        
        return this;
    }
}