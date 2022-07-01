import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Declaration } from '../../models/declaration.model';

// Services
import { DeclarationDataRequestService } from '../private/declaration-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(
    private dataRequest: DeclarationDataRequestService
  ) { }

  public getAll(): Observable<Declaration[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Declaration().FromDTO(dataDto)))
    );
  }

  public getOneGeneralData(id:number): Observable<Declaration>{
    return this.dataRequest.getDataOneGeneralData(id).pipe(
      map(data =>  new Declaration().FromDTO(data))
    );
  }

  public insert(data: Declaration): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public insertDataGeneral(data: Declaration): Observable<Response>{
    return this.dataRequest.insertDataGeneral(data.ToDTO());
  }

  public update(id:number,data: Declaration): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public updateDataGeneral(id:number,data: Declaration): Observable<Response>{
    return this.dataRequest.updateDataGeneral(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }

  public deleteDataGeneral(id: number): Observable<Response>{
    return this.dataRequest.deleteDataGenereal(id);
  }
}