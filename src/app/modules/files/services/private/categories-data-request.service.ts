import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { CategoriesDto } from '../../dtos/categories-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataRequestService {

  private baseUrl = `${environment.apiUrl}categories`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<CategoriesDto[]> {
    return this.http.get<CategoriesDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<CategoriesDto> {
    return this.http.get<CategoriesDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: CategoriesDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: CategoriesDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}