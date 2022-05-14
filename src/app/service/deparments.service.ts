import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeparmentsModel } from '../models/deparments.model';

@Injectable({
  providedIn: 'root'
})
export class DeparmentsService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<DeparmentsModel[]>{
    return this.http.get<DeparmentsModel[]>(`${this.baseUrl}/deparments`);
  }

  insert(campus: DeparmentsModel): Observable<DeparmentsModel>{
    return this.http.post<DeparmentsModel>(`${this.baseUrl}/deparments`,campus);
  }

  update(campus: DeparmentsModel, id: number): Observable<DeparmentsModel>{
    return this.http.put<DeparmentsModel>(`${this.baseUrl}/deparments/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/deparments/${id}`)
  }

}

