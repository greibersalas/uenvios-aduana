import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { TransportRouteDto } from '../../dtos/transport-route-dto';

@Injectable({
  providedIn: 'root'
})
export class TransportRouteDataRequestService {

  private baseUrl = `${environment.apiUrl}transport-route`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<TransportRouteDto[]> {
    return this.http.get<TransportRouteDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<TransportRouteDto> {
    return this.http.get<TransportRouteDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: TransportRouteDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: TransportRouteDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}
