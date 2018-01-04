import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Conge } from '../modele/conge';
import { User } from '../modele/user';

@Injectable()
export class CongeService {
    conges: Conge[] = JSON.parse(localStorage.getItem('conges')) || [];
    constructor(private http: Http,private httpClient: HttpClient) { }

    getAll(id: number) {
        const matchedConges = this.conges.filter(conge => { return conge.idUser === id; });
        if (matchedConges.length) {

            let mesConges = matchedConges;

            return mesConges;
        } else {
            return null;
        }
    }

    getByID(id: number) {
        for (let i = 0; i < this.conges.length; i++) {
            let conge = this.conges[i];
            if (conge.id == id) {
                let congeC = conge;
                return congeC;
            }
        }

    }

    create(conge: Conge, user : User) {

        let myConge = new Conge(conge.dateDeb, conge.dateFin, conge.motif, conge.precision, conge.idUser,conge.demiJournee);
        const duplicateConge = this.conges.filter(congeExist => { return congeExist.dateDeb === conge.dateDeb; }).length;
        if (duplicateConge) {
            return false;
        }
        console.log('Demande réussie');
        if (this.conges.length > 0) {
            myConge.id = this.conges[this.conges.length-1].id+1;
        }
        else {
        myConge.id = this.conges.length + 1;
        }
        this.conges.push(myConge);
        localStorage.setItem('conges', JSON.stringify(this.conges));
        this.send(myConge,user);

        return true;

    }

    send(conge: Conge,user : User) {
        let body = {conge,user};
         this.httpClient.post('http://localhost:8080/api/sendconge', body)
        .subscribe(function(data) {
                console.log(data);
        });
    }

    update(congeU: Conge) {
        console.log('tentative update', congeU.id);
        let id = congeU.id;
        let myConge = new Conge(congeU.dateDeb, congeU.dateFin, congeU.motif, congeU.precision, congeU.idUser,congeU.demiJournee);
        
        for (let i = 0; i < this.conges.length; i++) {
            let conge  =this.conges[i];
            if (conge.id === id) {
                myConge.id = conge.id;
                myConge.idUser = conge.idUser;

                myConge.calculateDuration();

                this.conges.splice(i, 1);
                this.conges.push(myConge);
                localStorage.setItem('conges', JSON.stringify(this.conges));
                console.log('update success');
                return true;
            }
        }
    }

    delete(id: number) {
        for (let i = 0; i < this.conges.length; i++) {
            let conge = this.conges[i];
            if (conge.id == id) {
                this.conges.splice(i, 1);
                localStorage.setItem('conges', JSON.stringify(this.conges));
                return true;
            }
        }
    }


    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}