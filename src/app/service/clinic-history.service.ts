import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClinicHistoryModel } from '../models/clinic-history.model';
import { FormInput, OdontograModel } from '../models/main/clinicHistory.model';
import { ClinicHistoryNotesModel } from '../models/main/clinicHistoryNotes.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<ClinicHistoryModel[]>{
    return this.http.get<ClinicHistoryModel[]>(`${this.baseUrl}/clinic-history`);
  }

  getOne(id: number): Observable<FormInput>{
    return this.http.get<FormInput>(`${this.baseUrl}/clinic-history/${id}`);
  }

  insert(ch: ClinicHistoryModel): Observable<ClinicHistoryModel>{
    return this.http.post<ClinicHistoryModel>(`${this.baseUrl}/clinic-history`,ch);
  }

  update(ch: ClinicHistoryModel, id: number): Observable<ClinicHistoryModel>{
    return this.http.put<ClinicHistoryModel>(`${this.baseUrl}/clinic-history/${id}`,ch);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/clinic-history/${id}`)
  }

  getByDocument(document: string): Observable<ClinicHistoryModel>{
    return this.http.get<ClinicHistoryModel>(`${this.baseUrl}/clinic-history/get-patient/${document}`);
  }

  getOdontograma(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/odontograma/get-patient/${id}`);
  }

  getFirstOdontograma(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/odontograma/get-first/${id}`);
  }

  // Notes
  getNote(id: number): Observable<ClinicHistoryNotesModel>{
    return this.http.get<ClinicHistoryNotesModel>(`${this.baseUrl}/clinic-history-notes/${id}`);
  }

  getNotes(id: number): Observable<ClinicHistoryNotesModel[]>{
    return this.http.get<ClinicHistoryNotesModel[]>(`${this.baseUrl}/clinic-history-notes/get-patient-notes/${id}`);
  }

  insertNote(data: ClinicHistoryNotesModel): Observable<ClinicHistoryNotesModel>{
    return this.http.post<ClinicHistoryNotesModel>(`${this.baseUrl}/clinic-history-notes`,data);
  }

  updateNote(id: number, data: ClinicHistoryNotesModel): Observable<ClinicHistoryNotesModel>{
    return this.http.put<ClinicHistoryNotesModel>(`${this.baseUrl}/clinic-history-notes/${id}`,data);
  }

  getLastHistoryNumber(idcampus: number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/clinic-history/get-last-history-number/${idcampus}`);
  }

  addOdontograma(data: OdontograModel): Observable<OdontograModel>{
    return this.http.post<OdontograModel>(`${this.baseUrl}/odontograma`,data);
  }

  getOdontogramaByQuotation(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/odontograma/get-quotation/${id}`);
  }

  getPdf(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/clinic-history/pdf-ficha/${id}`);
  }

  validateNumDoc(doc: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/clinic-history/validate-num-doc/${doc}`);
  }

  getLista(data:any): Observable<ClinicHistoryModel>{
    return this.http.post<ClinicHistoryModel>(`${this.baseUrl}/clinic-history/list-pagination`,data,{});
  }

  getCant(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/clinic-history/patient/cant/`);
  }

  search(search: string) {
    if (search === '') {
      return of([]);
    }
    return this.http
      .post(`${this.baseUrl}/clinic-history/search-autocomplet`, {search}).pipe(
        map(response => response)
      );
  }

  /** REPORTS */
  getPatientNew(year: number, month: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/clinic-history/patient/new/${year}/${month}`);
  }

  /**
   * Obtenemos la cantidad de pacientes regisrados en los ultimos 12 meses
   * @returns Observable<any>
   */
  getDataReportNewPatiens(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/clinic-history/data-report/new-patients/`);
  }

  getDataReportNewPatiensMonth(year: number, month: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/clinic-history/data-report/new-patients-month/${year}/${month}`);
  }
}
