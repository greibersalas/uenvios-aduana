import { Transferable } from '../../../config/Transferable';
import { ShippingTypeDto } from '../dtos/shipping-type-dto';

export class ShippingType implements Transferable<ShippingTypeDto> {

    idshippingtype: number;
    code: string;
    description: string;
       

    ToDTO(): ShippingTypeDto {
        const dto: ShippingTypeDto = ({
            idshippingtype: this.idshippingtype,
            code: this.code,
            description: this.description,
           
        });
        return dto;
    }

    FromDTO(from: ShippingTypeDto): ShippingType {
        this.idshippingtype = from.idshippingtype;
        this.code = from.code;
        this.description = from.description;
        return this;
    }
}