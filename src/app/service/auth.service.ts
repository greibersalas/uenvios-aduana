import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Environtment
import { environment } from '../../environments/environment';
// Store
import { Store } from '@ngrx/store';
// Services
import { PermissionsService } from './permissions.service';
// Models
import { UserI } from '../models/user';
import { JwtResponseI} from '../models/jwt-response';
import { PermissionsModel } from '../models/profile/permissions.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject(false);
  private token: string;
  public permissions: PermissionsModel[];

  private baseUrl = `${environment.apiUrlAuth}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _permissions: PermissionsService,
    private store: Store<{session: any}>
  ) { }

  login(user: UserI): Observable<JwtResponseI>{
    return this.http.post<JwtResponseI>(`${this.baseUrl}/signin`, user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          // guardar token
          this.saveToken(res.token);
        }
      })
    );
  }

  loguot(): void{
    this.token = '';
    sessionStorage.clear();
    this.router.navigateByUrl('/auth/signin');
  }

  loggedIn(): boolean{
     const token = this.getToken();
     return !!token;
  }

  private saveToken(token: string): void{
    sessionStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }


  public getToken(): string{
    if (!this.token){
      this.token = sessionStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  hasPermissionsView(permission: string): Observable<boolean>{
    return new Observable<boolean>(observer => {
      const iduser = Number(sessionStorage.getItem('iduser'));
      this._permissions.getPermissionsByUser(iduser).subscribe((per: any[]) => {
        let res = false;
        per.forEach(p => {
          if (p.mpermissions.page === permission){
            if (p.view) {
              res = true;
            }
          }
        });
        observer.next(res);
      });
    });
  }

  hasPermissionsDelete(permission: string): Observable<boolean>{
    return new Observable<boolean>(observer => {
      const iduser = Number(sessionStorage.getItem('iduser'));
      this._permissions.getPermissionsByUser(iduser).subscribe((per: any[]) => {
        let res = false;
        per.forEach(p => {
          if (p.mpermissions.page === permission){
            if (p.delete){
              res = true;
            }
          }
        });
        observer.next(res);
    });
   });
  }

  hasPermissionsUpdate(permission: string): Observable<boolean>{
    return new Observable<boolean>(observer => {
      const iduser = Number(sessionStorage.getItem('iduser'));
      this._permissions.getPermissionsByUser(iduser).subscribe((per: any[]) => {
        let res = false;
        per.forEach(p => {
          if (p.mpermissions.page === permission){
            if (p.update){
              res = true;
            }
          }
        });
        observer.next(res);
    });
   });
  }

  hasPermissionsInsert(permission: string): Observable<boolean>{
    return new Observable<boolean>(observer => {
      const iduser = Number(sessionStorage.getItem('iduser'));
      this._permissions.getPermissionsByUser(iduser).subscribe((per: any[]) => {
        let res = false;
        per.forEach(p => {
          if (p.mpermissions.page === permission){
            if (p.insert){
              res = true;
            }
          }
        });
        observer.next(res);
    });
   });
  }

}
