import { Transferable } from '../../../config/Transferable';
import { ArancelDto } from '../dtos/arancel-dto';

export class Arancel implements Transferable<ArancelDto> {

    id: number;
    code: string;
    description: string;
    adv: number;
    isc: number;
    igv: number;
    imp: number;
    de: number;
    da: number;
    insurance: number;
    tax_surcharge: number;
    measure_unit: string;
    penalty_surtax: number;
  
    ToDTO(): ArancelDto {
        const dto: ArancelDto = ({
            id: this.id,
            code: this.code,
            description: this.description,
            adv: this.adv,
            isc: this.isc,
            igv: this.igv,
            imp: this.imp,
            de: this.de,
            da: this.da,
            insurance: this.insurance,
            tax_surcharge: this.tax_surcharge,
            measure_unit: this.measure_unit,
            penalty_surtax: this.penalty_surtax,
        });
        return dto;
    }

    FromDTO(from: ArancelDto): Arancel {
        this.id = from.id;
        this.code = from.code;
        this.description= from.description;
        this.adv = from.adv;
        this.isc = from.isc;
        this.igv = from.igv;
        this.imp = from.imp;
        this.de = from.de;
        this.insurance = from.insurance;
        this.tax_surcharge = from.tax_surcharge;
        this.measure_unit = from.measure_unit;
        this.penalty_surtax = from.penalty_surtax;
        return this;
    }
}