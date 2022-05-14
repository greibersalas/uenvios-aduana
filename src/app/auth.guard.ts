import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|boolean{
    return new Observable(observer => {
      if (this.authService.loggedIn()){
        if (next.data.permissions){
          /* this.authService.hasPermissionsView(next.data.permissions).subscribe(perm => {
            observer.next(perm);
          }); */
          observer.next(true);
        }else{
          observer.next(true);
        }
      } else{
        this.router.navigate(['auth/signin']);
        observer.next(false);
      }
    });
  }
}
