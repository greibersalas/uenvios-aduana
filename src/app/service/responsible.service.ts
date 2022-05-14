import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponsibleModel } from '../models/responsible.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<ResponsibleModel[]>{
    return this.http.get<ResponsibleModel[]>(`${this.baseUrl}/responsible`);
  }

  insert(campus: ResponsibleModel): Observable<ResponsibleModel>{
    return this.http.post<ResponsibleModel>(`${this.baseUrl}/responsible`,campus);
  }

  update(campus: ResponsibleModel, id: number): Observable<ResponsibleModel>{
    return this.http.put<ResponsibleModel>(`${this.baseUrl}/responsible/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/responsible/${id}`)
  }

}
