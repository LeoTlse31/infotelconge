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
    currentUser: any;
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    constructor(

        private router: Router, private http: Http
    ) {
        if (JSON.parse(localStorage.getItem('currentUser'))) {

            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    loggedIn2() {

        return localStorage.getItem('currentUser');
    }

    login(email: string, password: string) {
        let filteredUsers = this.users.filter(user => {
            return user.email === email && user.password === password;
        });

        if (filteredUsers.length) {
            console.log("Connexion réussie");
            let userC = filteredUsers[0];
            this.currentUser = userC;
            this.loggedIn.next(true);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } else {

            return false;
        }
    }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
