import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Arancel } from '../../models/arancel.model';

// Services
import { ArancelDataRequestService } from '../private/arancel-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class ArancelService {

  constructor(
    private dataRequest: ArancelDataRequestService
  ) { }

  public getAll(): Observable<Arancel[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Arancel().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Arancel>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Arancel().FromDTO(data))
    );
  }

  public insert(data: Arancel): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Arancel): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}
