import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Environtment
import { environment } from '../../../../../environments/environment';

// Models
import { Ubigeo } from '../../models/ubigeo.model';

// Services
import { UbigeoDataRequestService } from '../private/ubigeo-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  baseUrl = `${environment.apiUrl}/ubigeo`;

  constructor(
    private dataRequest: UbigeoDataRequestService
  ) { }

  public getAll(): Observable<Ubigeo[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Ubigeo().FromDTO(dataDto)))
    );
  }

  public delete(): void{
    //
  }
}
