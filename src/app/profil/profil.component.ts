import { Component, OnInit } from '@angular/core';
import { User }    from '../user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor() { 
 
  
  }

    userModel = new User(1, '', '', '', '', '', '', null);

  submitted = false;

  onSubmit(form: any): void { 
 
	let user = new User(1, form['nom'],form['prenom'],'','',form['emailResp'],form['societe'],form['matricule']);
	this.userModel = user;
	console.log('My user :', user);
  }
  ngOnInit() {
  }

}
