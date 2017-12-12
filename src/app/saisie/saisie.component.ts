import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CongeService } from '../services/conge.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-saisie',
  templateUrl: './saisie.component.html',
  styleUrls: ['./saisie.component.css']
})
export class SaisieComponent implements OnInit {
  form: FormGroup;
  currentUser: any = {};
  idConge: any;
  update: boolean;
  private formSubmitAttempt: boolean;
  model: any = {};
  loading = false;
  profilComplet = false;
  demiJournee = false;
  error: any = { isError: false, errorMessage: '' };



  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder,
    private congeService: CongeService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.update = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.route.snapshot.params['id']) {
      this.formSubmitAttempt = false;
      this.update = true;
      this.idConge = this.route.snapshot.params['id'];
      this.getCongeByID();

    }

    if (this.currentUser.profilComplet) {
      this.profilComplet = true;
    } else { this.profilComplet = false; }



    this.form = this.fb.group({
      id: [],
      dateDeb: ['', Validators.required],
      dateFin: ['', Validators.required],
      motif: ['', Validators.required],
      precision: [''],
      demiJournee: [''],
      idUser: [this.currentUser.id]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  saisirDemande() {
    this.loading = true;
    if (this.congeService.create(this.model, this.currentUser)) {
      swal({
        type: 'success',
        title: 'Demande envoyée',
        showConfirmButton: false,
        timer: 1500
      });

      this.loading = false;
    } else {
      this.error = { isError: true, errorMessage: 'Vous avez déjà soumis une demande de congé pour cette dâte.' };

      this.loading = false;

    }
  }

  modifierDemande() {
    this.loading = true;

    if (this.congeService.update(this.model)) {
      swal({
        type: 'success',
        title: 'Congé mis à jour.',
        showConfirmButton: false,
        timer: 1500
      });
      this.loading = false;
    } else {
      this.loading = false;
    }
    this.formSubmitAttempt = false;
  }

  compareTwoDates() {
    console.log(new Date(this.form.controls['dateDeb'].value).getDay());
    if (new Date(this.form.controls['dateDeb'].value) > new Date(this.form.controls['dateFin'].value)) {
      this.error = { isError: true, errorMessage: 'Attention ! La date de retour ne peut pas être antérieure à la date de départ' };
    } else if ((this.form.controls['dateDeb'].value) === (this.form.controls['dateFin'].value)) {
      this.demiJournee = true;
      this.error = { isError: false, errorMessage: '' };
    } else {
      this.error = { isError: false, errorMessage: '' };
      this.demiJournee = false;
    }

  }
  checkdateDeb() {
    if ((new Date(this.form.controls['dateDeb'].value).getDay() === 0) || new Date(this.form.controls['dateDeb'].value).getDay() === 6) {
      this.error = { isError: true, errorMessage: 'Attention ! Vous ne pouvez pas poser de weekend' };
    }
  }
  checkdateFin() {
    if ((new Date(this.form.controls['dateFin'].value).getDay() === 0) || new Date(this.form.controls['dateFin'].value).getDay() === 6) {
      this.error = { isError: true, errorMessage: 'Attention ! Vous ne pouvez pas poser de weekend' };
    }
  }

  getCongeByID() {
    this.loading = true;
    console.log('id passé', this.idConge);
    if (this.congeService.getByID(this.idConge)) {
      this.loading = false;
      this.model = this.congeService.getByID(this.idConge);

    } else {
      this.loading = false;
      console.log('fail');

    }
  }


  onSubmit() {

    if (this.form.valid && !this.error.isError) {
      this.model = this.form.value;

      if (this.update) {

        this.model.id = this.idConge;
        this.modifierDemande();
      } else {
        this.saisirDemande();

      }

    }
  }

  ngAfterViewChecked() {

    this.cdRef.detectChanges();
  }
}
