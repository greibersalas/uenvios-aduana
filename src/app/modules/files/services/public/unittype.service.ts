import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Unittype } from '../../models/unittype.model';

// Services
import { UnittypeDataRequestService } from '../private/unittype-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class UnittypeService {

  constructor(
    private dataRequest: UnittypeDataRequestService
  ) { }

  public getAll(): Observable<Unittype[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Unittype().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Unittype>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Unittype().FromDTO(data))
    );
  }

  public insert(data: Unittype): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Unittype): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}