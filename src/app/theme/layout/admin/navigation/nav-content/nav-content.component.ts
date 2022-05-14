import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationItem } from '../navigation';
import { GradientConfig } from '../../../../../app-config';
import { Location } from '@angular/common';
import { PermissionsService } from 'src/app/service/permissions.service';


@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit, AfterViewInit {
  public gradientConfig: any;
  public navigation: any;
  public prevDisabled: string;
  public nextDisabled: string;
  public contentWidth: number;
  public wrapperWidth: any;
  public scrollWidth: any;
  public windowWidth: number;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onNavMobCollapse = new EventEmitter();

  @ViewChild('navbarContent', {static: false}) navbarContent: ElementRef;
  @ViewChild('navbarWrapper', {static: false}) navbarWrapper: ElementRef;

  constructor(
    public nav: NavigationItem,
    private zone: NgZone,
    private location: Location,
    private permissions: PermissionsService
  ) {
    this.gradientConfig = GradientConfig.config;
    this.windowWidth = window.innerWidth;

    this.navigation = this.nav.get();
    this.prevDisabled = 'disabled';
    this.nextDisabled = '';
    this.scrollWidth = 0;
    this.contentWidth = 0;
  }

  ngOnInit(): void{
    if (this.windowWidth < 992) {
      this.gradientConfig.layout = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-gradient-able') as HTMLElement).style.maxHeight = '100%';
      }, 500);
    }

    // this.setMenuByPermissions();
  }

  setMenuByPermissions(): void{
    const nvtCabConfig = { ...this.nav.NavigationItemsConfiCab };
    const nvtCabpro = { ...this.nav.NavigationItemsProCab };
    const nvtCabReport = { ...this.nav.NavigationItemsReportCab };
    const nvtCabUser = { ...this.nav.NavigationItemsUserCab };
    const iduser = Number(sessionStorage.getItem('iduser'));
    this.permissions.getPermissionsByUser(iduser).subscribe(per => {
      per.forEach((peAuth: any) => {
        // configuracion
        this.nav.NavigationItemsConfig.forEach(res => {
          if ( peAuth.mpermissions.page === res.id){
            if (peAuth.view){
              nvtCabConfig.children.push(res);
            }
          }
        });
        // Procesos
        this.nav.NavigationItemsPro.forEach(res => {
          if (peAuth.mpermissions.page === res.id){
            if (peAuth.view){
              nvtCabpro.children.push(res);
            }
          }
        });
        // report
        this.nav.NavigationItemsReport.forEach(res => {
          if (peAuth.mpermissions.page === res.id){
            if (peAuth.view){
              nvtCabReport.children.push(res);
            }
          }
        });
        // user
        this.nav.NavigationItemsUser.forEach(res => {
          if (peAuth.mpermissions.page === res.id){
            if (peAuth.view){
              nvtCabUser.children.push(res);
            }
          }
        });
      });
      // add config item
      if (nvtCabConfig.children.length > 0){
        this.navigation[0].children.push(nvtCabConfig);
      }
      // add proceso item
      if (nvtCabpro.children.length > 0){
        this.navigation[0].children.push(nvtCabpro);
      }
      // add report item
      if (nvtCabReport.children.length > 0){
        this.navigation[0].children.push(nvtCabReport);
      }
      // add user item
      if (nvtCabUser.children.length > 0){
        this.navigation[0].children.push(nvtCabUser);
      }
    });
  }

  ngAfterViewInit(): void{
    if (this.gradientConfig.layout === 'horizontal') {
      this.contentWidth = this.navbarContent.nativeElement.clientWidth;
      this.wrapperWidth = this.navbarWrapper.nativeElement.clientWidth;
    }
  }

  scrollPlus(): void{
    this.scrollWidth = this.scrollWidth + (this.wrapperWidth - 80);
    if (this.scrollWidth > (this.contentWidth - this.wrapperWidth)) {
      this.scrollWidth = this.contentWidth - this.wrapperWidth + 80;
      this.nextDisabled = 'disabled';
    }
    this.prevDisabled = '';
    if (this.gradientConfig.rtlLayout) {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginRight = '-' + this.scrollWidth + 'px';
    } else {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
    }
  }

  scrollMinus(): void{
    this.scrollWidth = this.scrollWidth - this.wrapperWidth;
    if (this.scrollWidth < 0) {
      this.scrollWidth = 0;
      this.prevDisabled = 'disabled';
    }
    this.nextDisabled = '';
    if (this.gradientConfig.rtlLayout) {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginRight = '-' + this.scrollWidth + 'px';
    } else {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
    }
  }

  fireLeave(): void {
    const sections = document.querySelectorAll('.pcoded-hasmenu');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active');
      sections[i].classList.remove('pcoded-trigger');
    }

    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.onNavMobCollapse.emit();
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        if (this.gradientConfig['layout'] === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        if (this.gradientConfig['layout'] === 'vertical') {
          up_parent.classList.add('pcoded-trigger');
        }
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        if (this.gradientConfig['layout'] === 'vertical') {
          last_parent.classList.add('pcoded-trigger');
        }
        last_parent.classList.add('active');
      }
    }
  }

}
