import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RolesModel } from '../../models/profile/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<RolesModel[]>{
    return this.http.get<RolesModel[]>(`${this.baseUrl}/roles`);
  }

  insert(campus: RolesModel): Observable<RolesModel>{
    return this.http.post<RolesModel>(`${this.baseUrl}/roles`,campus);
  }

  update(campus: RolesModel, id: number): Observable<RolesModel>{
    return this.http.patch<RolesModel>(`${this.baseUrl}/roles/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/roles/${id}`)
  }
}
