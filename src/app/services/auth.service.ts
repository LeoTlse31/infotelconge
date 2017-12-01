import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(
    private router: Router,private http: Http
  ) {}

      login(email: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                
                let user = response.json();
                if (user && user.token) {
                    this.loggedIn.next(true);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
