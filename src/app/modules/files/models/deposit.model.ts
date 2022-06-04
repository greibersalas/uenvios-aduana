import { Transferable } from '../../../config/Transferable';
import { DepositDto } from '../dtos/deposit-dto';

export class Deposit implements Transferable<DepositDto> {

    iddeposit: number;
    code: string;
    ruc: string;
    description: string;
    phone: string;
    email:string;
    address:string;
  
    ToDTO(): DepositDto {
        const dto: DepositDto = ({
            iddeposit: this.iddeposit,
            code: this.code,
            ruc: this.ruc,
            description: this.description,
            phone: this.phone,
            email : this.email,
            address : this.address
        });
        return dto;
    }

    FromDTO(from: DepositDto): Deposit {
        this.iddeposit = from.iddeposit;
        this.code = from.code
        this.ruc = from.ruc;
        this.description= from.description;
        this.phone = from.phone;
        this.email = from.email;
        this.address = from.address;
        
        return this;
    }
}