import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Deposit } from '../../models/deposit.model';

// Services
import { DepositDataRequestService } from '../private/deposit-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(
    private dataRequest: DepositDataRequestService
  ) { }

  public getAll(): Observable<Deposit[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Deposit().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Deposit>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Deposit().FromDTO(data))
    );
  }

  public insert(data: Deposit): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Deposit): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}
