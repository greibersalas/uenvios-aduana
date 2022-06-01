import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { ShippingType } from '../../models/shipping-type.model';

// Services
import { ShippingTypeDataRequestService } from '../private/shipping-type-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingTypeService {

  constructor(
    private dataRequest: ShippingTypeDataRequestService
  ) { }

  public getAll(): Observable<ShippingType[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new ShippingType().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<ShippingType>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new ShippingType().FromDTO(data))
    );
  }

  public insert(data: ShippingType): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: ShippingType): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}
