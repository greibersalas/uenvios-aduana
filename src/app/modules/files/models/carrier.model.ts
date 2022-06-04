import { Transferable } from '../../../config/Transferable';
import { CarrierDto } from '../dtos/carrier-dto';

export class Carrier implements Transferable<CarrierDto> {

    idcarrier: number;
    ruc: string;
    description: string;
    phone: string;
    email:string;
    address:string;
  
    ToDTO(): CarrierDto {
        const dto: CarrierDto = ({
            idcarrier: this.idcarrier,
            ruc: this.ruc,
            description: this.description,
            phone: this.phone,
            email : this.email,
            address : this.address
        });
        return dto;
    }

    FromDTO(from: CarrierDto): Carrier {
        this.idcarrier = from.idcarrier;
        this.ruc = from.ruc;
        this.description= from.description;
        this.phone = from.phone;
        this.email = from.email;
        this.address = from.address;
        
        return this;
    }
}