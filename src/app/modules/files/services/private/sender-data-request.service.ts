import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { SenderDto } from '../../dtos/sender-dto';

@Injectable({
  providedIn: 'root'
})
export class SenderDataRequestService {

  private baseUrl = `${environment.apiUrl}sender`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<SenderDto[]> {
    return this.http.get<SenderDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<SenderDto> {
    return this.http.get<SenderDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: SenderDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: SenderDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}