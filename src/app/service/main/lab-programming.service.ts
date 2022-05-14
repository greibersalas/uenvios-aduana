import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment';
import { LabProgrammingModel } from '../../models/main/lab-programming.model';

@Injectable({
  providedIn: 'root'
})
export class LabProgrammingService {

  private baseUrl: string = `${environment.apiUrl}`;
  constructor(private http:HttpClient) { }

  getAll(): Observable<LabProgrammingModel[]>{
    return this.http.get<LabProgrammingModel[]>(`${this.baseUrl}/lab-programming`);
  }

  getOne(id: number): Observable<LabProgrammingModel>{
    return this.http.get<LabProgrammingModel>(`${this.baseUrl}/lab-programming/${id}`);
  }

  insert(data: LabProgrammingModel): Observable<LabProgrammingModel>{
    return this.http.post<LabProgrammingModel>(`${this.baseUrl}/lab-programming`,data);
  }

  update(data: LabProgrammingModel, id: number): Observable<LabProgrammingModel>{
    return this.http.put<LabProgrammingModel>(`${this.baseUrl}/lab-programming/${id}`,data);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/lab-programming/${id}`);
  }

  validateDate(date: string, job: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/lab-programming/validate-date/${date}/${job}`);
  }

  getByJob(date: string, job: string): Observable<LabProgrammingModel>{
    return this.http.get<LabProgrammingModel>(`${this.baseUrl}/lab-programming/get-by-job/${date}/${job}`);
  }
}
