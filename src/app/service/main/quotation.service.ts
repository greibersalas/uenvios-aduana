import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

import { environment } from 'src/environments/environment';

import { QuotationModel } from '../../models/main/quotation.model';

import { QuotationDetailModel } from '../../models/main/quotation-detail.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private baseUrl: string = `${environment.apiUrl}/quotation`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<QuotationModel[]>{
    return this.http.get<QuotationModel[]>(`${this.baseUrl}`);
  }

  getOne(id:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/id/${id}`);
  }

  getDetail(id:number): Observable<QuotationDetailModel[]>{
    return this.http.get<QuotationDetailModel[]>(`${this.baseUrl}/number/${id}`);
  }

  insert(quotation: QuotationModel): Observable<QuotationModel>{
    return this.http.post<QuotationModel>(`${this.baseUrl}`,quotation);
  }

  update(quotation: QuotationModel, id: number): Observable<QuotationModel>{
    return this.http.put<QuotationModel>(`${this.baseUrl}/${id}`,quotation);
  }

  reserveDetail(id: number): Observable<QuotationDetailModel>{
    return this.http.get<QuotationDetailModel>(`${this.baseUrl}/reserve/${id}`);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`)
  }

  getByClinicHistory(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/get-by-clinic-history/${id}`);
  }

  addItem(data: QuotationDetailModel): Observable<QuotationDetailModel>{
    return this.http.post<QuotationDetailModel>(`${this.baseUrl}/add-item/`,data);
  }

  deleteItem(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/remove-item/${id}`)
  }

  updateItem(id: number, item: QuotationDetailModel): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/update-item/${id}`,item);
  }

  getPdf(id: number, format: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/pdf/${id}/${format}`);
  }
}
