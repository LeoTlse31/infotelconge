import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { AccueilComponent } from './accueil/accueil.component';
import { ProfilComponent } from './profil/profil.component';
import { SaisieComponent } from './saisie/saisie.component';
import { HistoriqueComponent } from './historique/historique.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes =[
    { path: 'dashboard',      component: AccueilComponent, canActivate: [AuthGuard] },
    { path: 'profil',           component: ProfilComponent, canActivate: [AuthGuard] },
	{ path: 'saisie',          component: SaisieComponent, canActivate: [AuthGuard] },
	{ path: 'historique',     component: HistoriqueComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
