import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { CountryDto } from '../../dtos/country-dto';

@Injectable({
  providedIn: 'root'
})
export class CountryDataRequestService {

  private baseUrl = `${environment.apiUrl}country`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<CountryDto> {
    return this.http.get<CountryDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: CountryDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: CountryDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}

