import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Sender } from '../../models/sender.model';

// Services
import { SenderDataRequestService } from '../private/sender-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor(
    private dataRequest: SenderDataRequestService
  ) { }

  public getAll(): Observable<Sender[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Sender().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Sender>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Sender().FromDTO(data))
    );
  }

  public insert(data: Sender): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Sender): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}