import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExchangeRateModel } from '../models/exchange-rate.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<ExchangeRateModel[]>{
    return this.http.get<ExchangeRateModel[]>(`${this.baseUrl}/exchange-rate`);
  }

  insert(exchangerate: ExchangeRateModel): Observable<ExchangeRateModel>{
    return this.http.post<ExchangeRateModel>(`${this.baseUrl}/exchange-rate`,exchangerate);
  }

  update(exchangerate: ExchangeRateModel, id: number): Observable<ExchangeRateModel>{
    return this.http.put<ExchangeRateModel>(`${this.baseUrl}/exchange-rate/${id}`,exchangerate);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/exchange-rate/${id}`)
  }
}