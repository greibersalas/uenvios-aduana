import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LabOrderLabeledModel, LabOrderModel } from '../../models/main/labOrder.model';
import { LabOrderPendingModel } from '../../models/main/labOrderPending.model';

@Injectable({
  providedIn: 'root'
})
export class LabOrderService {

  private baseUrl: string = `${environment.apiUrl}/`;
  public id: number;

  constructor(private http:HttpClient) { }

  get(): Observable<LabOrderModel[]>{
    return this.http.get<LabOrderModel[]>(`${this.baseUrl}lab-order`);
  }

  getFilters(filters: any): Observable<LabOrderModel[]>{
    return this.http.post<LabOrderModel[]>(`${this.baseUrl}lab-order/get-list/filter`,filters);
  }

  getOne(id: number): Observable<LabOrderModel>{
    return this.http.get<LabOrderModel>(`${this.baseUrl}lab-order/${id}`);
  }

  insert(data: LabOrderModel): Observable<LabOrderModel>{
    return this.http.post<LabOrderModel>(`${this.baseUrl}lab-order`,data);
  }

  update(ma: LabOrderModel, id: number): Observable<LabOrderModel>{
    return this.http.put<LabOrderModel>(`${this.baseUrl}lab-order/${id}`,ma);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}lab-order/${id}`)
  }

  getPendient(): Observable<LabOrderPendingModel[]>{
    return this.http.get<LabOrderPendingModel[]>(`${this.baseUrl}quotation/get-orden-lab-pending/all`);
  }

  getCant(date: string, job: string): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}lab-order/get-cant/${date}/${job}`);
  }

  getProduction(filters: any): Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}lab-order/get-production/filters`,filters);
  }

  confirm(id: number, state: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}lab-order/confirm/${id}/${state}`);
  }

  getPdf(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}lab-order/pdf/${id}`);
  }


  /**Labeled  */
  insertLabeled(data: LabOrderLabeledModel): Observable<LabOrderLabeledModel>{
    return this.http.post<LabOrderLabeledModel>(`${this.baseUrl}lab-order-labeled`,data);
  }

  updateLabeled(lol: LabOrderLabeledModel, id: number): Observable<LabOrderLabeledModel>{
    return this.http.put<LabOrderLabeledModel>(`${this.baseUrl}lab-order-labeled/${id}`,lol);
  }

  getListLabeled(id: number): Observable<LabOrderLabeledModel[]>{
    return this.http.get<LabOrderLabeledModel[]>(`${this.baseUrl}lab-order-labeled/${id}`);
  }

  deleteLabeled(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}lab-order-labeled/${id}`)
  }

  getPdfResume(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lab-order/get-resume-pdf`,filters);
  }

  getCantOrder(month: number, year: number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}lab-order/get-cant-order/${month}/${year}`);
  }

  /* REPORTS */
  getAofElaboNoElaboPdf(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lab-order/get-report-pdf-elaborado-noelaborado/`,filters);
  }

  getAofElaboNoElaboXlsx(filters: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('charset', 'utf8');
    return this.http.post(`${this.baseUrl}lab-order/get-report-xlsx-elaborado-noelaborado/`,filters, { headers: headers, responseType: 'blob' }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  getAofProduction(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lab-order/get-report-elaborado-production/`,filters);
  }

  getAofByState(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lab-order/get-report-by-state/`,filters);
  }

  getAofModelStatePdf(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lab-order/get-report-pdf-model-state/`,filters);
  }

  getAofModelStateXlsx(filters: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('charset', 'utf8');
    return this.http.post(`${this.baseUrl}lab-order/get-report-xlsx-model-state/`,filters, { headers: headers, responseType: 'blob' }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  getAofRecetaDoctorPdf(filters: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lab-order/get-report-pdf-receta-doctor/`,filters);
  }

  getAofRecetaDoctorXlsx(filters: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('charset', 'utf8');
    return this.http.post(`${this.baseUrl}lab-order/get-report-xlsx-receta-doctor/`,filters, { headers: headers, responseType: 'blob' }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
}
