import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { CarrierDto } from '../../dtos/carrier-dto';

@Injectable({
  providedIn: 'root'
})
export class CarrierDataRequestService {

  private baseUrl = `${environment.apiUrl}carrier`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<CarrierDto[]> {
    return this.http.get<CarrierDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<CarrierDto> {
    return this.http.get<CarrierDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: CarrierDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: CarrierDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}