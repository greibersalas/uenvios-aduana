import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Ubigeo } from '../../models/ubigeo.model';

// Services
import { UbigeoDataRequestService } from '../private/ubigeo-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(
    private dataRequest: UbigeoDataRequestService
  ) { }

  public getAll(): Observable<Ubigeo[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Ubigeo().FromDTO(dataDto)))
    );
  }

  public insert(data: Ubigeo): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}
