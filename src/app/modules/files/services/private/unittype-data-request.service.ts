import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { UnittypeDto } from '../../dtos/unittype-dto';

@Injectable({
  providedIn: 'root'
})
export class UnittypeDataRequestService {

  private baseUrl = `${environment.apiUrl}unit-type`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<UnittypeDto[]> {
    return this.http.get<UnittypeDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<UnittypeDto> {
    return this.http.get<UnittypeDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: UnittypeDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: UnittypeDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}