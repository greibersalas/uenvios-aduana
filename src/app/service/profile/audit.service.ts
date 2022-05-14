import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrl: string = `${environment.apiUrl}`;
  constructor(private http:HttpClient) { }

  get(id: number, module: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/audit/${id}/${module}`);
  }
}
