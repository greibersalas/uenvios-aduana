import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { CustomsDto } from '../../dtos/customs-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomsDataRequestService {

  private baseUrl = `${environment.apiUrl}customs`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<CustomsDto[]> {
    return this.http.get<CustomsDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<CustomsDto> {
    return this.http.get<CustomsDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: CustomsDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: CustomsDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}