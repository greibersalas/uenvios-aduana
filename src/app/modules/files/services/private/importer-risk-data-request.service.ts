import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { ImporterRiskDto } from '../../dtos/importer-risk-dto';

@Injectable({
  providedIn: 'root'
})
export class ImporterRiskDataRequestService {

  private baseUrl = `${environment.apiUrl}importer-risk`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<ImporterRiskDto[]> {
    return this.http.get<ImporterRiskDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<ImporterRiskDto> {
    return this.http.get<ImporterRiskDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: ImporterRiskDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: ImporterRiskDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}