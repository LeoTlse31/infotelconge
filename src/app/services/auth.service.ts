import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../modele/user';

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
        const filteredUsers = this.users.filter(user => {
            return user.email === email && user.password === password;
        });

        if (filteredUsers.length) {
            console.log('Connexion réussie');
            const userC = filteredUsers[0];
            this.currentUser = userC;
            this.loggedIn.next(true);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        } else {

            return false;
        }
    }

    register(user: User) {
        console.log('Création de :' + user.nom);
        const myUser = new User(user.nom, user.prenom, user.email, user.password);

        // validation
        const duplicateUser = this.users.filter(userExist => { return userExist.nom === user.nom; }).length;
        if (duplicateUser) {
            return false;
        }
        console.log('Inscription réussie');
        myUser.id = this.users.length + 1;

        this.users.push(myUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        return true;
    }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
