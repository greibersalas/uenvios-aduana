import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environtment
import { environment } from 'src/environments/environment';
// Models
import { UserModel } from '../../models/profile/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`);
  }

  getOne(id: number): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.baseUrl}/user/get-one/${id}`);
  }

  insert(user: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.baseUrl}/auth/signup`, user);
  }

  update(user: UserModel, id: number): Observable<UserModel>{
    return this.http.put<UserModel>(`${this.baseUrl}users/${id}`, user);
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`);
  }

  changePassword(user: UserModel, id: number): Observable<UserModel>{
    return this.http.put<UserModel>(`${this.baseUrl}/auth/change-password/${id}`, user);
  }

  changeState(id: number, state: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/users/change-state/${id}/${state}`);
  }
}
