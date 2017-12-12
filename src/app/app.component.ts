import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any = {};
  constructor(private authService: AuthService, public location: Location, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  isMap(path) {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path === titlee) {
      return false;
    } else {
      return true;
    }
  }
  get userLogged() { return this.authService.loggedIn2(); };

  ngAfterViewChecked() {

    this.cdRef.detectChanges();
  }
}
