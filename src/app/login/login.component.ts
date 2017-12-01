import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	model: any = {};
    form: FormGroup;
    private formSubmitAttempt: boolean;
	showNav = true;
    loading = false;
	loginError =false;;
	
  constructor(
    private fb: FormBuilder, 
	 public nav: NavbarService,
	private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
	this.nav.hide();
	this.authService.logout();  
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

    login() {
        this.loading = true;
        this.authService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
					this.nav.show();
                    this.router.navigate(['dashboard']);
                },
                error => {
                    this.loading = false;
					this.loginError = true;
                });
    }  
  
  onSubmit() {
    if (this.form.valid) {
		this.model = this.form.value;
		this.login();
		console.log(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
}
