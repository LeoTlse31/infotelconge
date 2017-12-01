import { Component, OnInit } from '@angular/core';
import { User }    from '../user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

	currentUser: any = {};
	
  constructor() { 
 
  
  }

   

  submitted = false;

  onSubmit(form: any): void { 

  }
  
  ngOnInit() {
	  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  console.log('My user :', this.currentUser);
  }

}
