import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TariffModel } from '../models/tariff.model';

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<TariffModel[]>{
    return this.http.get<TariffModel[]>(`${this.baseUrl}/tariff`);
  }

  getOne(id: number): Observable<TariffModel>{
    return this.http.get<TariffModel>(`${this.baseUrl}/tariff/${id}`);
  }

  insert(tariff: TariffModel): Observable<TariffModel>{
    return this.http.post<TariffModel>(`${this.baseUrl}/tariff`,tariff);
  }

  update(tariff: TariffModel, id: number): Observable<TariffModel>{
    return this.http.put<TariffModel>(`${this.baseUrl}/tariff/${id}`,tariff);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/tariff/${id}`)
  }

  getBySpecialty(id: number): Observable<TariffModel[]>{
    if(id === 0){
      return this.http.get<TariffModel[]>(`${this.baseUrl}/tariff`);
    }else{
      return this.http.get<TariffModel[]>(`${this.baseUrl}/tariff/get-by-specialty/${id}`);
    }
  }

  getByDentalStatus(id: number): Observable<TariffModel[]>{
    return this.http.get<TariffModel[]>(`${this.baseUrl}/tariff/get-by-dental-status/${id}`);
  }

  getLabs(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/tariff/get-labs/all`);
  }

  getByBl(id: any): Observable<TariffModel[]>{
    return this.http.post<TariffModel[]>(`${this.baseUrl}/tariff/get-by-bl`,id);
  }

  getQuotationTermsValues(): Observable<TariffModel[]>{
    return this.http.get<TariffModel[]>(`${this.baseUrl}/tariff/get-quotation/terms-values`);
  }
}
