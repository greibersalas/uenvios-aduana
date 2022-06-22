import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { DeclarationDto } from '../../dtos/declaration-dto';

@Injectable({
  providedIn: 'root'
})
export class DeclarationDataRequestService {

  private baseUrl = `${environment.apiUrl}declaration`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<DeclarationDto[]> {
    return this.http.get<DeclarationDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<DeclarationDto> {
    return this.http.get<DeclarationDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: DeclarationDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: DeclarationDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}