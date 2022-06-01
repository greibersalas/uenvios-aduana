import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { StatementTypeDto } from '../../dtos/statementtype-dto';

@Injectable({
  providedIn: 'root'
})
export class StatementTypeDataRequestService {

  private baseUrl = `${environment.apiUrl}type-declaration`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<StatementTypeDto[]> {
    return this.http.get<StatementTypeDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<StatementTypeDto> {
    return this.http.get<StatementTypeDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: StatementTypeDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number,data: StatementTypeDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`, data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}