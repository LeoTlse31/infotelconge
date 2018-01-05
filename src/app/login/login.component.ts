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
  loginError: any = { isError: false, Message: '' };
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
      this.register = { isRegistered: true, successMessage: 'Inscription réussie ! Un email de validation vous a été envoyé.' };
    }
    if (this.route.snapshot.params['accountverify'] && this.route.snapshot.params['tkn']) {
      if (this.authService.activeAccount(this.route.snapshot.params['accountverify'],this.route.snapshot.params['tkn'])) {
        this.register = { isRegistered: true, successMessage: 'Compte validé ! Vous pouvez maintenant vous connecter.' };
      }
      else {
        this.loginError = { isError: true, Message: 'Compte déjà valide / Erreur dans le lien.' };
      }
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
    } else {
      this.register = { isRegistered: false, successMessage: '' };
      this.loading = false;
      this.loginError = { isError: true, Message: 'Identifiant / Mot de passe incorrect.' };


    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.login();
    }
    this.formSubmitAttempt = true;
  }



}
