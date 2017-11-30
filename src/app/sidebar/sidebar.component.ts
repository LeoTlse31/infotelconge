import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Accueil',  icon: 'pe-7s-home', class: '' },
    { path: 'profil', title: 'Profil',  icon:'pe-7s-user', class: '' },
	{ path: 'saisie', title: 'Saisie congé',  icon:'pe-7s-note', class: '' },
	{ path: 'historique', title: 'Historique',  icon:'pe-7s-hourglass', class: '' },
    { path: 'logout', title: 'Déconnexion',  icon:'pe-7s-power', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
isLoggedIn$: Observable<boolean>;       
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
	this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  
   onLogout(){
    this.authService.logout();                      
  }
  
  isMobileMenu() {
      if ($(window).width() >= 768) {
          return false;
      }
      return true;
  };
}
