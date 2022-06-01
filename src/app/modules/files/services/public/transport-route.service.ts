import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { TransportRoute } from '../../models/transport-route';

// Services
import { TransportRouteDataRequestService } from '../private/transport-route-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class TransportRouteService {

  constructor(
    private dataRequest: TransportRouteDataRequestService
  ) { }

  public getAll(): Observable<TransportRoute[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new TransportRoute().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<TransportRoute>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new TransportRoute().FromDTO(data))
    );
  }

  public insert(data: TransportRoute): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: TransportRoute): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}