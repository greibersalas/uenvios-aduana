import { Transferable } from '../../../config/Transferable';
import { CountryDto } from '../dtos/country-dto';

export class Country implements Transferable<CountryDto> {

    id: number;
    code: string;
    nombre: string;
    idzona: number;
   

    ToDTO(): CountryDto {
        const dto: CountryDto = ({
            id: this.id,
            code: this.code,
            nombre: this.nombre,
            idzona: this.idzona,
        });
        return dto;
    }

    FromDTO(from: CountryDto): Country {
        this.id = from.id;
        this.code = from.code;
        this.nombre = from.nombre;
        this.idzona = from.idzona;
        return this;
    }
}