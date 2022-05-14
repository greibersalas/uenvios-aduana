import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment';
import { AnamnesisModel } from '../../models/main/clinicHistory.model';

@Injectable({
  providedIn: 'root'
})
export class AnamnesisService {

  private baseUrl: string = `${environment.apiUrl}/anamnesis`;
  constructor(private http:HttpClient) { }

  getAll(): Observable<AnamnesisModel[]>{
    return this.http.get<AnamnesisModel[]>(`${this.baseUrl}`);
  }

  getOne(id: number): Observable<AnamnesisModel>{
    return this.http.get<AnamnesisModel>(`${this.baseUrl}/${id}`);
  }

  insert(data: AnamnesisModel): Observable<AnamnesisModel>{
    return this.http.post<AnamnesisModel>(`${this.baseUrl}`,data);
  }

  update(data: AnamnesisModel, id: number): Observable<AnamnesisModel>{
    return this.http.put<AnamnesisModel>(`${this.baseUrl}/${id}`,data);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  getByClinicHistory(id: number): Observable<AnamnesisModel>{
    return this.http.get<AnamnesisModel>(`${this.baseUrl}/by-clinic-history/${id}`);
  }
}
