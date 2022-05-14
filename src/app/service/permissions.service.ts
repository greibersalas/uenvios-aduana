import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PermissionsModel } from '../models/profile/permissions.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<PermissionsModel[]>{
    return this.http.get<PermissionsModel[]>(`${this.baseUrl}/permissions`);
  }

  insert(campus: PermissionsModel): Observable<PermissionsModel>{
    return this.http.post<PermissionsModel>(`${this.baseUrl}/permissions`,campus);
  }

  update(campus: PermissionsModel, id: number): Observable<PermissionsModel>{
    return this.http.put<PermissionsModel>(`${this.baseUrl}/permissions/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/permissions/${id}`)
  }

  getPermissionsByUser(user:number):Observable<PermissionsModel[]>{
    return this.http.get<PermissionsModel[]>(`${this.baseUrl}/permissions/user/${user}`)
  }

}
