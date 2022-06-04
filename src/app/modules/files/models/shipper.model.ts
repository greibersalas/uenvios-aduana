import { Transferable } from '../../../config/Transferable';
import { ShipperDto } from '../dtos/shipper-dto';

export class Shipper implements Transferable<ShipperDto> {

    idshipper: number;
    code: string;
    description: string;
  
    ToDTO(): ShipperDto {
        const dto: ShipperDto = ({
            idshipper: this.idshipper,
            code: this.code,
            description: this.description,
        });
        return dto;
    }

    FromDTO(from: ShipperDto): Shipper {
        this.idshipper = from.idshipper;
        this.code = from.code;
        this.description= from.description;
        
        return this;
    }
}