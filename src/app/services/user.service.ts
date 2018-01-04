import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../modele/user';

@Injectable()
export class UserService {
    users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    conges: any[] = JSON.parse(localStorage.getItem('conges')) || [];

    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }


    update(userU: User) {

        const id = userU.id;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (user.id === id) {
                userU.password = user.password;
                this.users.splice(i, 1);
                this.users.push(userU);
                localStorage.setItem('users', JSON.stringify(this.users));
                localStorage.setItem('currentUser', JSON.stringify(userU));
                return true;
            }
        }
    }



    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}