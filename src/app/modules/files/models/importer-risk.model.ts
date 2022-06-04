import { Transferable } from '../../../config/Transferable';
import { ImporterRiskDto } from '../dtos/importer-risk-dto';

export class ImporterRisk implements Transferable<ImporterRiskDto> {

    id: number;
    code: string;
    description: string;
  
    ToDTO(): ImporterRiskDto {
        const dto: ImporterRiskDto = ({
            id: this.id,
            code: this.code,
            description: this.description,
        });
        return dto;
    }

    FromDTO(from: ImporterRiskDto): ImporterRisk {
        this.id = from.id;
        this.code = from.code;
        this.description= from.description;
        
        return this;
    }
}