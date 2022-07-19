import { Transferable } from '../../../config/Transferable';
import { SeriesDto } from '../dtos/series-dto';

export class Series implements Transferable<SeriesDto> {
    id: number;
    iddeclaration : number;
    idarancel : number; 
    idpais : number;
    codigo_liberacion : string;
    fob : number; 
    fob_expenses : number;
    flete : number;
    sure : number;
    cif : number;
    kilos : number;
    quantity : number;
    units : number;
    idunittype : number;
    business_unit : number; 
    restring : number; 
    quantity_risk : number;
    preceding : string; 
    authorization : string; 
    idstatuscommodity : number;
    transport_document : string;
    name : string;
    mark : string;
    model : string;
    description : string;
    url : string;
    
    
   

    ToDTO(): SeriesDto {
        const dto: SeriesDto = ({
            id : this.id,
            iddeclaration: this.iddeclaration,
            idarancel : this.idarancel,
            idpais : this.idpais,   
            codigo_liberacion : this.codigo_liberacion,
            fob : this.fob,
            fob_expenses : this.fob_expenses,
            flete : this.flete,
            sure : this.sure,
            cif : this.cif,
            kilos : this.kilos,
            quantity: this.quantity,
            units : this.units,
            idunittype : this.idunittype,
            business_unit : this.business_unit,
            restring : this.restring,
            quantity_risk : this.quantity_risk,
            preceding : this.preceding,
            authorization : this.authorization,
            idstatuscommodity : this.idstatuscommodity,
            transport_document : this.transport_document,
            name : this.name,
            mark : this.mark,
            model : this.model,
            description : this.description,
            url : this.url,

          
        });
        return dto;
    }

    FromDTO(from: SeriesDto): Series {
        this.id= from.id;
        this.iddeclaration= from.iddeclaration;
        this.idarancel = from.idarancel;
        this.idpais = from.idpais;   
        this.codigo_liberacion = from.codigo_liberacion;
        this.fob = from.fob;
        this.fob_expenses = from.fob_expenses;
        this.flete = from.flete;
        this.sure = from.sure;
        this.cif = from.cif;
        this.kilos = from.kilos;
        this.quantity= from.quantity;
        this.units = from.units;
        this.idunittype = from.idunittype;
        this.business_unit = from.business_unit;
        this.restring = from.restring;
        this.quantity_risk = from.quantity_risk;
        this.preceding = from.preceding;
        this.authorization = from.authorization;
        this.idstatuscommodity = from.idstatuscommodity;
        this.transport_document = from.transport_document;
        this.name = from.name;
        this.mark = from.mark;
        this.model = from.model;
        this.description = from.description;
        this.url = from.url;

        return this;
    }
}