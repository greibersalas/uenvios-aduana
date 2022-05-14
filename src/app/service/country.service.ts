import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { CountryModel } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<CountryModel[]>{
    return this.http.get<CountryModel[]>(`${this.baseUrl}/country`);
  }

  insert(country: CountryModel): Observable<CountryModel>{
    return this.http.post<CountryModel>(`${this.baseUrl}/country`,country);
  }

  update(country: CountryModel, id: number): Observable<CountryModel>{
    return this.http.put<CountryModel>(`${this.baseUrl}/country/${id}`,country);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/country/${id}`)
  }
}
