import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

import { environment } from '../../../environments/environment';

import { QuotationTermsModel } from '../../models/main/quotation-terms.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationTermsService {

  private baseUrl: string = `${environment.apiUrl}/quotation-terms`;
  constructor(private http:HttpClient) { }

  get(idquotation: number): Observable<QuotationTermsModel[]>{
    return this.http.get<QuotationTermsModel[]>(`${this.baseUrl}/quotation/${idquotation}`);
  }

  insert(data: any): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/add/many`,data);
  }

  add(data: QuotationTermsModel): Observable<QuotationTermsModel>{
    return this.http.post<QuotationTermsModel>(`${this.baseUrl}/add/many`,data);
  }

  removeItem(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
