import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LabeledStatusModel } from '../../models/mat/labeled-status.model';

@Injectable({
  providedIn: 'root'
})
export class LabeledStatusService {

  private baseUrl: string = `${environment.apiUrl}`;
  constructor(private http:HttpClient) { }

  getAll(): Observable<LabeledStatusModel[]>{
    return this.http.get<LabeledStatusModel[]>(`${this.baseUrl}/labeled-status`);
  }
}
