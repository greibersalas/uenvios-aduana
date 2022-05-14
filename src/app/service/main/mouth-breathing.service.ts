import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MouthModel } from '../../models/main/mouth-breathing.model';

@Injectable({
  providedIn: 'root'
})
export class MouthBreathingService {

  private baseUrl: string = `${environment.apiUrl}/mouth-breathing/`;

  constructor(private http:HttpClient) { }

  get(id: number): Observable<MouthModel>{
    return this.http.get<MouthModel>(`${this.baseUrl}${id}`);
  }

  getByClinicHistory(id: number): Observable<MouthModel>{
    return this.http.get<MouthModel>(`${this.baseUrl}clinic-history/${id}`);
  }

  insert(data: MouthModel): Observable<MouthModel>{
    return this.http.post<MouthModel>(`${this.baseUrl}`,data);
  }

  update(ma: MouthModel, id: number): Observable<MouthModel>{
    return this.http.put<MouthModel>(`${this.baseUrl}${id}`,ma);
  }
}
