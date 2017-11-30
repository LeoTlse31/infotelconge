import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService
  ) {}

  ngOnInit() {
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

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
	  console.log(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
}
