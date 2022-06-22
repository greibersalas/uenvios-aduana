import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { ArancelDto } from '../../dtos/arancel-dto';

@Injectable({
  providedIn: 'root'
})
export class ArancelDataRequestService {

  private baseUrl = `${environment.apiUrl}arancel`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<ArancelDto[]> {
    return this.http.get<ArancelDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<ArancelDto> {
    return this.http.get<ArancelDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: ArancelDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: ArancelDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}