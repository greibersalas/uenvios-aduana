import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Carrier } from '../../models/carrier.model';

// Services
import { CarrierDataRequestService } from '../private/carrier-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  constructor(
    private dataRequest: CarrierDataRequestService
  ) { }

  public getAll(): Observable<Carrier[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Carrier().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Carrier>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Carrier().FromDTO(data))
    );
  }

  public insert(data: Carrier): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Carrier): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}