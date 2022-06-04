import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { ShipperDto } from '../../dtos/shipper-dto';

@Injectable({
  providedIn: 'root'
})
export class ShipperDataRequestService {

  private baseUrl = `${environment.apiUrl}shipper`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<ShipperDto[]> {
    return this.http.get<ShipperDto[]>(`${this.baseUrl}/get-all`);
  }

  public getDataOne(id:number): Observable<ShipperDto> {
    return this.http.get<ShipperDto>(`${this.baseUrl}/get-one/${id}`);
  }

  public insert(data: ShipperDto): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/insert`, data);
  }

  public update(id:number, data: ShipperDto): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/update/${id}`,data);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/delete/${id}`);
  }
}