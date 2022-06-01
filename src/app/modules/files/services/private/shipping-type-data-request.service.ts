import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { ShippingTypeDto } from '../../dtos/shipping-type-dto';

@Injectable({
  providedIn: 'root'
})
export class ShippingTypeDataRequestService {

  private baseUrl = `${environment.apiUrl}shipping-type`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<ShippingTypeDto[]> {
    return this.http.get<ShippingTypeDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<ShippingTypeDto> {
    return this.http.get<ShippingTypeDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: ShippingTypeDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: ShippingTypeDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}