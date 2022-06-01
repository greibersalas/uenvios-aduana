import { Transferable } from '../../../config/Transferable';
import { TransportRouteDto } from '../dtos/transport-route-dto';

export class TransportRoute implements Transferable<TransportRouteDto> {

    idtransportroute: number;
    code: string;
    description: string;
 
    ToDTO(): TransportRouteDto {
        const dto: TransportRouteDto = ({
            idtransportroute: this.idtransportroute,
            code: this.code,
            description: this.description,
            
        });
        return dto;
    }

    FromDTO(from: TransportRouteDto): TransportRoute {
        this.idtransportroute = from.idtransportroute;
        this.code = from.code;
        this.description = from.description;
        return this;
    }
}