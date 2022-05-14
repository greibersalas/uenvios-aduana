import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProvinceModel } from '../models/province.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<ProvinceModel[]>{
    return this.http.get<ProvinceModel[]>(`${this.baseUrl}/provinces`);
  }

  getByDeparment(iddeparment: number): Observable<ProvinceModel[]>{
    return this.http.get<ProvinceModel[]>(`${this.baseUrl}/provinces/by-deparment/${iddeparment}`);
  }

  insert(campus: ProvinceModel): Observable<ProvinceModel>{
    return this.http.post<ProvinceModel>(`${this.baseUrl}/provinces`,campus);
  }

  update(campus: ProvinceModel, id: number): Observable<ProvinceModel>{
    return this.http.put<ProvinceModel>(`${this.baseUrl}/provinces/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/provinces/${id}`)
  }

}

