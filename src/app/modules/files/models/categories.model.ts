import { Transferable } from '../../../config/Transferable';
import { CategoriesDto } from '../dtos/categories-dto';

export class Categories implements Transferable<CategoriesDto> {

    idcategories: number;
    code: string;
    description: string;
     

    ToDTO(): CategoriesDto {
        const dto: CategoriesDto = ({
            idcategories: this.idcategories,
            code: this.code,
            description: this.description,
           
        });
        return dto;
    }

    FromDTO(from: CategoriesDto): Categories {
        this.idcategories = from.idcategories;
        this.code = from.code;
        this.description = from.description;
      
        return this;
    }
}