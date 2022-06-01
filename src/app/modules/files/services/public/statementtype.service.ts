import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { StatementType } from '../../models/statementtype.model';

// Services
import { StatementTypeDataRequestService } from '../private/statementtype-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class StatementTypeService {

  constructor(
    private dataRequest: StatementTypeDataRequestService
  ) { }

  public getAll(): Observable<StatementType[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new StatementType().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<StatementType>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new StatementType().FromDTO(data))
    );
  }

  public insert(data: StatementType): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: StatementType): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}