import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';

declare var $:any;

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit{
    test : Date = new Date();
	isLoggedIn$: Observable<boolean>;  
	
    constructor(private authService: AuthService) {}	
	
	ngOnInit(){
		this.isLoggedIn$ = this.authService.isLoggedIn;
		}	
}
