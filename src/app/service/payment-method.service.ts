import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethodModel } from '../models/payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<PaymentMethodModel[]>{
    return this.http.get<PaymentMethodModel[]>(`${this.baseUrl}/payment-method`);
  }

  insert(pm: PaymentMethodModel): Observable<PaymentMethodModel>{
    return this.http.post<PaymentMethodModel>(`${this.baseUrl}/payment-method`,pm);
  }

  update(pm: PaymentMethodModel, id: number): Observable<PaymentMethodModel>{
    return this.http.put<PaymentMethodModel>(`${this.baseUrl}/payment-method/${id}`,pm);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/payment-method/${id}`)
  }
}
