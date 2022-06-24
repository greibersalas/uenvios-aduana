import { Transferable } from '../../../config/Transferable';
import { DeclarationDto } from '../dtos/declaration-dto';

export class Declaration implements Transferable<DeclarationDto> {

    id: number;
    dispatch_date : string;
    number_packages : number;
    idcustoms : number;
    total_units : number;
    idconsignee : number;
    gross_kilos : number;
    idshippingtype : number;
    fob : number;
    fob_bills : number;
    freight : number;
    sure : number;
    idinsurancecarrie : number;
    iddispatcher : number;
    idcategories : number;
    customer_reference : string;
    idtransportroute : number;
    idcarrier : number;
    iddeposit : number;
    idimporterrisk : number;
    idshipper : number;
    idsender : number;
    contents : string;
    idtechnical : null;
    idcommissionagent : null;
    electronicpayment : null;
    date_preliquidation : string;
    series_number : number;
    type_proration : number;
    nombre : string;
    dni: string;
    ruc: string;
    departamento: string;
    provincia: string;
    distrito: string;
    direccion : string;
    cod_customs : string;
    customs : string;
   

    ToDTO(): DeclarationDto {
        const dto: DeclarationDto = ({
            id: this.id,
            dispatch_date: this.dispatch_date,
            number_packages: this.number_packages,
            idcustoms : this.idcustoms,
            total_units : this.total_units,
            idconsignee : this.idconsignee,
            gross_kilos : this.gross_kilos,
            idshippingtype : this.idshippingtype,
            fob: this.fob,
            fob_bills : this.fob_bills,
            freight : this.freight,
            sure : this.sure,
            idinsurancecarrie : this.idinsurancecarrie,
            iddispatcher : this.iddispatcher,
            idcategories : this.idcategories,
            customer_reference : this.customer_reference,
            idtransportroute : this.idtransportroute,
            idcarrier : this.idcarrier,
            iddeposit : this.iddeposit,
            idimporterrisk : this.idimporterrisk,
            idshipper : this.idshipper,
            idsender : this.idsender,
            contents : this.contents,
            idtechnical : this.idtechnical,
            idcommissionagent : this.idcommissionagent,
            electronicpayment : this.electronicpayment,
            date_preliquidation : this.date_preliquidation,
            series_number : this.series_number,
            type_proration : this.type_proration,
            nombre : this.nombre,
            dni : this.dni,
            ruc : this.ruc,
            departamento : this.departamento,
            provincia : this.provincia,
            distrito : this.distrito,
            direccion : this.direccion,
            cod_customs : this.cod_customs,
            customs : this.customs,
        });
        return dto;
    }

    FromDTO(from: DeclarationDto): Declaration {
        this.id = from.id;
        this.dispatch_date = from.dispatch_date;
        this.number_packages = from.number_packages;
        this.idcustoms = from.idcustoms;
        this.total_units = from.total_units;
        this.idconsignee = from.idconsignee;
        this.gross_kilos = from.gross_kilos;
        this.idshippingtype = from.idshippingtype;
        this.fob = from.fob;
        this.fob_bills = from.fob_bills;
        this.freight = from.freight;
        this.sure = from.sure;
        this.idinsurancecarrie = from.idinsurancecarrie;
        this.iddispatcher = from.iddispatcher;
        this.idcategories = from.idcategories;
        this.customer_reference = from.customer_reference;
        this.idcarrier = from.idcarrier;
        this.iddeposit = from.iddeposit;
        this.idimporterrisk = from.idimporterrisk;
        this.idshipper = from.idshipper;
        this.idsender = from.idsender;
        this.contents = from.contents;
        this.idtechnical = from.idtechnical;
        this.idcommissionagent = from.idcommissionagent;
        this.electronicpayment = from.electronicpayment;
        this.date_preliquidation = from.date_preliquidation;
        this.series_number = from.series_number;
        this.type_proration = from.type_proration;
        this.nombre = from.nombre;
        this.dni = from.dni;
        this.ruc = from.ruc;
        this.departamento = from.departamento;
        this.provincia = from.provincia;
        this.distrito = from.distrito;
        this.direccion = from.direccion;
        this.cod_customs = from.cod_customs;
        this.customs= from.customs;
        return this;
    }
}