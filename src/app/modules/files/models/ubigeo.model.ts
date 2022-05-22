import { Transferable } from '../../../config/Transferable';
import { UbigeoDto } from '../dtos/ubigeo-dto';

export class Ubigeo implements Transferable<UbigeoDto> {

    IdUbigeo: number;
    IdDepartamento: string;
    IdProvincia: string;
    IdDistrito: string;
    Description: string;

    ToDTO(): UbigeoDto {
        const dto: UbigeoDto = ({
            IdUbigeo: this.IdUbigeo,
            IdDepartamento: this.IdDepartamento,
            IdProvincia: this.IdProvincia,
            IdDistrito: this.IdDistrito,
            Description: this.Description,
        });
        return dto;
    }

    FromDTO(from: UbigeoDto): Ubigeo {
        this.IdUbigeo = from.IdUbigeo;
        this.IdDepartamento = from.IdDepartamento;
        this.IdProvincia = from.IdProvincia;
        this.IdDistrito = from.IdDistrito;
        this.Description = from.Description;
        return this;
    }
}
