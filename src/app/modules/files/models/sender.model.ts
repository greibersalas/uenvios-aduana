import { Transferable } from '../../../config/Transferable';
import { SenderDto } from '../dtos/sender-dto';

export class Sender implements Transferable<SenderDto> {

    idsender: number;
    code: string;
    description: string;
  
    ToDTO(): SenderDto {
        const dto: SenderDto = ({
            idsender: this.idsender,
            code: this.code,
            description: this.description,
        });
        return dto;
    }

    FromDTO(from: SenderDto): Sender {
        this.idsender = from.idsender;
        this.code = from.code;
        this.description= from.description;
        
        return this;
    }
}