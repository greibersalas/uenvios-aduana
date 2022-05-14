import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { MedicalActAttentionModel } from '../../models/main/medical-act.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalActAttentionService {

  private baseUrl: string = `${environment.apiUrl}/medical-act-attention/`;

  constructor(private http:HttpClient) { }

  insert(data: MedicalActAttentionModel): Observable<MedicalActAttentionModel>{
    return this.http.post<MedicalActAttentionModel>(`${this.baseUrl}`,data);
  }

  update(ma: MedicalActAttentionModel, id: number): Observable<MedicalActAttentionModel>{
    return this.http.put<MedicalActAttentionModel>(`${this.baseUrl}${id}`,ma);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}${id}`)
  }

  getByMedicalAct(id: number): Observable<MedicalActAttentionModel[]>{
    return this.http.get<MedicalActAttentionModel[]>(`${this.baseUrl}by-medical-act/${id}`)
  }

  /**
   * Obtener las atenciones por historia clincia
   * @param id <historia clinica>
   * @returns
   */
  getByCH(id: number, iddoctor: number): Observable<MedicalActAttentionModel[]>{
    return this.http.get<MedicalActAttentionModel[]>(`${this.baseUrl}by-clinic-history/${id}/${iddoctor}`)
  }

  getCant(month: number, year: number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}attention-cant/${month}/${year}`);
  }

  //Reports
  getTreatmentRealized(date: string, bl: number, specialty: number, doctor: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}report-treatment-realized/${date}/${specialty}/${bl}/${doctor}`);
  }

  getTo10Tariff(since: string, until: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}report-top-10-tariff/${since}/${until}`);
  }

  getTop5Specialty(since: string, until: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}report-top-5-specialty/${since}/${until}`);
  }

  getTtoByDoctor(date: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}report-tto-by-doctor/${date}`);
  }

  getPayPatientPdf(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}get-report-pdf-pay-patient/`,filters);
  }

  getPayPatientXlsx(filters: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('charset', 'utf8');
    return this.http.post(`${this.baseUrl}get-report-xlsx-pay-patient/`,filters, { headers: headers, responseType: 'blob' }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  getQuantityAttentions(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}get-quantity-attentions/${id}`)
  }

  getPdfDoctorProduction(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}get-report-pdf-doctor-production`,filters);
  }

  getXlsDoctorProduction(filters: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('charset', 'utf8');
    return this.http.post(`${this.baseUrl}get-report-xlsx-doctor-production`,filters, { headers: headers, responseType: 'blob' }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
}
