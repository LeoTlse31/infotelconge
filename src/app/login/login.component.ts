import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  previousUrl: string;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  loading = false;
  loginError = false;
  register: any = { isRegistered: false, successMessage: '' };

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['res']) {
      this.register = { isRegistered: true, successMessage: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' };
    }
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
    if (this.authService.login(this.model.email, this.model.password)) {

      this.router.navigate(['dashboard']);
      this.loading = false;
    }
    else
    {
      this.register = { isRegistered: false, successMessage: '' };
      this.loading = false;
      this.loginError = true;

    }
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
