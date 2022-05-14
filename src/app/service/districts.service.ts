import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DistrictsModel } from '../models/districts.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<DistrictsModel[]>{
    return this.http.get<DistrictsModel[]>(`${this.baseUrl}/districts`);
  }

  getByProvince(idprovince: number): Observable<DistrictsModel[]>{
    return this.http.get<DistrictsModel[]>(`${this.baseUrl}/districts/by-province/${idprovince}`);
  }

  insert(campus: DistrictsModel): Observable<DistrictsModel>{
    return this.http.post<DistrictsModel>(`${this.baseUrl}/districts`,campus);
  }

  update(campus: DistrictsModel, id: number): Observable<DistrictsModel>{
    return this.http.put<DistrictsModel>(`${this.baseUrl}/districts/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/districts/${id}`)
  }

}

