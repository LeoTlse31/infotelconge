import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';


import { AccueilComponent } from './accueil/accueil.component';
import { ProfilComponent } from './profil/profil.component';
import { SaisieComponent } from './saisie/saisie.component';
import { HistoriqueComponent } from './historique/historique.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import './rxjs-operators';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProfilComponent,
	SaisieComponent,
	HistoriqueComponent,
	LoginComponent,
	RegisterComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
	ReactiveFormsModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
