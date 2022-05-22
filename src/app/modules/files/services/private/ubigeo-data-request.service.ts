import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Dtos
import { UbigeoDto } from '../../dtos/ubigeo-dto';

@Injectable({
  providedIn: 'root'
})
export class UbigeoDataRequestService {

  baseUrl = `${environment.apiUrl}/ubigeo`;

  constructor(
    private http: HttpClient,
  ) { }

  public getDataTable(): Observable<UbigeoDto[]> {
    return this.http.get<UbigeoDto[]>(`${this.baseUrl}/get-all`);
  }
}
