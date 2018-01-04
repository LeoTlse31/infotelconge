import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../modele/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  form: FormGroup;
  profilComplet = false;
  currentUser: any = {};
  private formSubmitAttempt: boolean;
  model: any = {};
  loading = false;
  submitted = false;
  constructor(private userService: UserService, private cdRef: ChangeDetectorRef, private fb: FormBuilder) {

  }


  update() {
    this.loading = true;
    if (this.userService.update(this.model)) {

      swal({
        type: 'success',
        title: 'Profil mis à jour.',
        showConfirmButton: false,
        timer: 1500
      });
      this.profilComplet = true;
      this.currentUser = this.model;
      this.loading = false;
    } else {
      this.loading = false;
    }

  }


  onSubmit() {
    this.model = this.currentUser;
    this.model.nom = this.form.value.nom;
    this.model.prenom = this.form.value.prenom;
    this.model.emailResp = this.form.value.emailResp;
    this.model.societe = this.form.value.societe;
    this.model.matricule = this.form.value.matricule;
    if (this.form.valid) {
      this.model.profilComplet = true;
    }
    this.update();
    this.formSubmitAttempt = true;

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.profilComplet) {
      this.profilComplet = true;
    }
    this.form = this.fb.group({
      societe: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      matricule: ['', Validators.required],
      emailResp: ['', Validators.required]
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  ngAfterViewChecked() {

    this.cdRef.detectChanges();
  }
}
