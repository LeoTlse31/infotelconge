import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form: FormGroup;
	private formSubmitAttempt: boolean;
    model: any = {};
    loading = false;
	
  constructor(
    private router: Router,
    private fb: FormBuilder, 
	 public nav: NavbarService,
	private userService: UserService
  ) {}

  ngOnInit() {
	 this.nav.hide();
     this.form = this.fb.group({
      nom: ['', Validators.required],
	  prenom: ['', Validators.required],
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
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {        
                    this.router.navigate(['login']);
                },
                error => {
                    this.loading = false;
                });
    }
	
  onSubmit() {
    if (this.form.valid) {
		this.model = this.form.value;
      this.register();
	  console.log(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
}
