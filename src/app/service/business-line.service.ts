import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusinessLineModel } from '../models/business-line.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessLineService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<BusinessLineModel[]>{
    return this.http.get<BusinessLineModel[]>(`${this.baseUrl}/business-line`);
  }

  insert(bl: BusinessLineModel): Observable<BusinessLineModel>{
    return this.http.post<BusinessLineModel>(`${this.baseUrl}/business-line`,bl);
  }

  update(bl: BusinessLineModel, id: number): Observable<BusinessLineModel>{
    return this.http.put<BusinessLineModel>(`${this.baseUrl}/business-line/${id}`,bl);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/business-line/${id}`)
  }
}
