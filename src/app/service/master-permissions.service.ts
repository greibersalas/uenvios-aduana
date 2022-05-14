import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MasterPermissionsModel } from '../models/profile/master-permissions.model';

@Injectable({
  providedIn: 'root'
})
export class MasterPermissionsService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<MasterPermissionsModel[]>{
    return this.http.get<MasterPermissionsModel[]>(`${this.baseUrl}/masterpermissions`);
  }

  insert(campus: MasterPermissionsModel): Observable<MasterPermissionsModel>{
    return this.http.post<MasterPermissionsModel>(`${this.baseUrl}/masterpermissions`,campus);
  }

  update(campus: MasterPermissionsModel, id: number): Observable<MasterPermissionsModel>{
    return this.http.put<MasterPermissionsModel>(`${this.baseUrl}/masterpermissions/${id}`,campus);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/masterpermissions/${id}`)
  }

  

}

