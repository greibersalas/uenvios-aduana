import {Component, DoCheck, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import { Store } from '@ngrx/store';
// Load the full build.
import * as _ from 'lodash';

import {GradientConfig} from '../../../../../app-config';
import { SetDataUser } from 'src/app/store/actions/session.action';

import { AuthService } from 'src/app/service/auth.service';
import { UsersService } from 'src/app/service/profile/users.service';

import { CampusModel } from 'src/app/models/campus.model';
import { PermissionsService } from '../../../../../service/permissions.service';


@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public gradientConfig: any;

  session: any = {};
  listCampus: CampusModel[] = [];
  campus = 0;
  strCampus = '';
  constructor(
    private authService: AuthService,
    private store: Store<{session: any}>,
    private userService: UsersService
  ) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.gradientConfig = GradientConfig.config;

  }

  ngOnInit(): void{
    this.setSession();
  }

  onChatToggle(friendID: any): void{
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck(): any{
    if (document.querySelector('body').classList.contains('elite-rtl')) {
      this.gradientConfig['rtl-layout'] = true;
    } else {
      this.gradientConfig['rtl-layout'] = false;
    }
  }

  setSession(): void{
    this.session = {};
    const iduser = Number(sessionStorage.getItem('iduser'));
    this.userService.getOne(iduser).subscribe(
      res => {
        const action = new SetDataUser(res);
        this.session = res;
        this.store.dispatch(action);
      },
      err => {
        console.error('error al obtener los datos del usuario', err);
        this.loguot();
      }
    );
  }

  loguot(): void{
    const action = new SetDataUser({});
    this.store.dispatch(action);
    this.authService.loguot();
  }

}
