import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpecialtyModel } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<SpecialtyModel[]>{
    return this.http.get<SpecialtyModel[]>(`${this.baseUrl}/specialty`);
  }

  insert(specialty: SpecialtyModel): Observable<SpecialtyModel>{
    return this.http.post<SpecialtyModel>(`${this.baseUrl}/specialty`,specialty);
  }

  update(specialty: SpecialtyModel, id: number): Observable<SpecialtyModel>{
    return this.http.put<SpecialtyModel>(`${this.baseUrl}/specialty/${id}`,specialty);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/specialty/${id}`)
  }

  getByBusinessLine(id: number): Observable<SpecialtyModel[]>{
    if(id === 0){
      return this.http.get<SpecialtyModel[]>(`${this.baseUrl}/specialty`);
    }else{
      return this.http.get<SpecialtyModel[]>(`${this.baseUrl}/specialty/get-specialty/${id}`);
    }
  }

  getByBusinessLineArr(data: any): Observable<SpecialtyModel[]>{
    return this.http.post<SpecialtyModel[]>(`${this.baseUrl}/specialty/get-by/bls`,data);
  }
}
