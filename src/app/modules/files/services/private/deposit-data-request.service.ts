import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { DepositDto } from '../../dtos/deposit-dto';

@Injectable({
  providedIn: 'root'
})
export class DepositDataRequestService {

  private baseUrl = `${environment.apiUrl}deposit`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<DepositDto[]> {
    return this.http.get<DepositDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<DepositDto> {
    return this.http.get<DepositDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: DepositDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: DepositDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}