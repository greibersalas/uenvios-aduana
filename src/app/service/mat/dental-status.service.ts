import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DentalStatus } from '../../models/mat/dental-status.model';

@Injectable({
  providedIn: 'root'
})
export class DentalStatusService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<DentalStatus[]>{
    return this.http.get<DentalStatus[]>(`${this.baseUrl}/dental-status`);
  }
}
