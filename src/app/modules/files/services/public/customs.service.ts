import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Customs } from '../../models/customs.model';

// Services
import { CustomsDataRequestService } from '../private/customs-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class CustomsService {

  constructor(
    private dataRequest: CustomsDataRequestService
  ) { }

  public getAll(): Observable<Customs[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Customs().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Customs>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Customs().FromDTO(data))
    );
  }

  public insert(data: Customs): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Customs): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}