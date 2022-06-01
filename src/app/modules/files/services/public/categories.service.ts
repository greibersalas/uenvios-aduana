import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Categories } from '../../models/categories.model';

// Services
import { CategoriesDataRequestService } from '../private/categories-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private dataRequest: CategoriesDataRequestService
  ) { }

  public getAll(): Observable<Categories[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Categories().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Categories>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Categories().FromDTO(data))
    );
  }

  public insert(data: Categories): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Categories): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}
