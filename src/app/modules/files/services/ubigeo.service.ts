import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Environtment
import { environment } from '../../../../environments/environment';
import { UbigeoDto } from '../dtos/ubigeo-dto';
import { Ubigeo } from '../models/ubigeo.model';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  baseUrl = `${environment.apiUrl}/ubigeo`;

  constructor(
    private http: HttpClient
  ) { }

  /* public getAll(): Observable<Ubigeo[]>{
    const data = this.http.get<UbigeoDto[]>(`${this.baseUrl}/get-all`);
    return data.pipe(
      map( el => new Ubigeo().FromDTO(el))
    );
  } */
}
