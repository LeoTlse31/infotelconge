import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../modele/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    currentUser: any;
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    constructor(private httpClient: HttpClient, private router: Router, private http: Http) {
        if (JSON.parse(localStorage.getItem('currentUser'))) {

            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    verifyAccount(user: User) {
        let body = { user };
        this.httpClient.post('http://192.168.30.46:8080/api/verifyaccount', body)
            .subscribe(function (data) {
            });
    }

    rand = function() {
        return Math.random().toString(36).substr(2);
    };
    
    token = function() {
        return this.rand() + this.rand();
    };
    
    
    loggedIn2() {

        return localStorage.getItem('currentUser');
    }

    login(email: string, password: string) {
        const filteredUsers = this.users.filter(user => {
            return user.email === email && user.password === password;
        });

        if (filteredUsers.length) {
            const userC = filteredUsers[0];
            if (userC.compteValide) {
                this.currentUser = userC;
                this.loggedIn.next(true);
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                return true;
            }
            else {
                return false;
            }
        } else {

            return false;
        }
    }

    register(user: User) {
        const myUser = new User(user.nom, user.prenom, user.email, user.password);


        const duplicateUser = this.users.filter(userExist => { return userExist.nom === user.nom; }).length;
        if (duplicateUser) {
            return false;
        }
        myUser.id = this.users.length + 1;
        myUser.token = this.token();
        this.users.push(myUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.verifyAccount(myUser);
        return true;
    }

    activeAccount(id: number,tkn: string) {
        let userU: User;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (user.id == id && user.token === tkn) {
                userU = user;
                userU.compteValide = true;
                userU.token = '';
                this.users.splice(i, 1);
                this.users.push(userU);
                localStorage.setItem('users', JSON.stringify(this.users));
                return true;
            }
        }
    }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
