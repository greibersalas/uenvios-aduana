import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PrescriptionModel } from '../../models/main/prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private baseUrl: string = `${environment.apiUrl}/prescription`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<PrescriptionModel[]>{
    return this.http.get<PrescriptionModel[]>(`${this.baseUrl}`);
  }

  insert(prescription: PrescriptionModel): Observable<PrescriptionModel>{
    return this.http.post<PrescriptionModel>(`${this.baseUrl}`,prescription);
  }

  update(prescription: PrescriptionModel, id: number): Observable<PrescriptionModel>{
    return this.http.put<PrescriptionModel>(`${this.baseUrl}/${id}`,prescription);
  }

  getByMedicalAct(id: number): Observable<PrescriptionModel[]>{
    return this.http.get<PrescriptionModel[]>(`${this.baseUrl}/get-by-medical-act/${id}`);
  }
}
