import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CoinModel } from '../models/coin.model';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<CoinModel[]>{
    return this.http.get<CoinModel[]>(`${this.baseUrl}/coin`);
  }

  insert(coin: CoinModel): Observable<CoinModel>{
    return this.http.post<CoinModel>(`${this.baseUrl}/coin`,coin);
  }

  update(coin: CoinModel, id: number): Observable<CoinModel>{
    return this.http.put<CoinModel>(`${this.baseUrl}/coin/${id}`,coin);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/coin/${id}`)
  }

}
