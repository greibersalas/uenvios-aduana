import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Country } from '../../models/country.model';

// Services
import { CountryDataRequestService } from '../private/country-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private dataRequest: CountryDataRequestService
  ) { }

  public getAll(): Observable<Country[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Country().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<Country>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new Country().FromDTO(data))
    );
  }

  public insert(data: Country): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: Country): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}