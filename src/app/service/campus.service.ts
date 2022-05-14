import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { CampusModel } from '../models/campus.model';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<CampusModel[]>{
    return this.http.get<CampusModel[]>(`${this.baseUrl}/campus`);
  }

  insert(campus: CampusModel): Observable<CampusModel>{
    return this.http.post<CampusModel>(`${this.baseUrl}/campus`,campus);
  }

  update(campus: CampusModel, id: number): Observable<CampusModel>{
    return this.http.put<CampusModel>(`${this.baseUrl}/campus/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/campus/${id}`)
  }

}
