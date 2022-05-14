import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public dataAReservation: any;

  private baseUrl = `${environment.apiUrl}/reservation`;

  constructor(private http: HttpClient) { }

  getOne(idreservation: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${idreservation}`);
  }

  getById(idreservation: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/get-by-id/${idreservation}`);
  }
  /**
   * @return list of reservation
   */
  getByDateDoctor(filter: any): Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}/get-date-doctor/`, filter);
  }

  getByClinicHistory(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/get-by-clinic-history/${id}`);
  }

  confirm(id: number, state: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/confirm/${id}/${state}`);
  }

  getListFilter(
    patient: number,
    doctor: number,
    state: number,
    since: string,
    until: string
  ): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/list-filter/${patient}/${doctor}/${state}/${since}/${until}`);
  }

  getCant(month: number, year: number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/reservation/cant/${month}/${year}`);
  }

  getPatientFrequenCant(since: string, until: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/patient-frequen-cant/${since}/${until}`);
  }

  getControlsCant(month: number, year: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/controls-cant/${month}/${year}`);
  }

  getPatientFrequenPdf(since: string, until: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/pdf-report-frequent-patients/${since}/${until}`);
  }

  getCantReservations(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/get-cant-reservation`, filters);
  }

  getCantCanceRepro(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/get-cant-cancelada-reprogramada`, filters);
  }

  getDatesPatientPdf(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/get-report-pdf-dates-patient`, filters);
  }

  getDatesPAtientXlsx(filters: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('charset', 'utf8');
    return this.http.post(`${this.baseUrl}/get-report-xlsx-dates-patient`, filters, { headers, responseType: 'blob' }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
}
