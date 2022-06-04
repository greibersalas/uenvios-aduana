import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Shipper } from '../../models/shipper.model';

// Services
import { ShipperDataRequestService } from '../private/shipper-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(
    private dataRequest: ShipperDataRequestService
  ) { }

  public getAll(): Observable<Shipper[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Shipper().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Shipper>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Shipper().FromDTO(data))
    );
  }

  public insert(data: Shipper): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Shipper): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}
