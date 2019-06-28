import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, 
         MatIconModule,MatListModule,MatTreeModule,MatBadgeModule, 
         MatProgressBarModule, MatGridListModule, MatFormFieldModule,
         MatInputModule,MatSelectModule,MatButtonToggleModule,
         MatTableModule,MatPaginatorModule,MatSortModule,
         MatPaginatorIntl,MatDialogModule,MatDatepickerModule,
         MatNativeDateModule,MatAutocompleteModule,
         MatChipsModule,MatSlideToggleModule,MatStepperModule,
         MatCheckboxModule,MatTabsModule,MatSliderModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes,RouterModule } from '@angular/router';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatPaginatorIntlFr  } from '../assets/custom-paginator-fr';
import {LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(localeFr);

import { MainNavComponent } from './main-nav/main-nav.component';
import { DossierMedicalComponent } from './dossier-medical/dossier-medical.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { AdministrationComponent } from './administration/administration.component';
import { VisitesMedicalesComponent } from './visites-medicales/visites-medicales.component';
import { ConsultationsMedicalesComponent } from './consultations-medicales/consultations-medicales.component';
import { VaccinationsComponent } from './vaccinations/vaccinations.component';
import { AccidentsTravailComponent, DeclarerAccidentTravailComponent } from './accidents-travail/accidents-travail.component';
import { ArretsTravailComponent } from './arrets-travail/arrets-travail.component';
import { SoinsComponent } from './soins/soins.component';
import { EmployesComponent, AjouterNvEmployeComponent } from './employes/employes.component';
import { DmInformationsGeneralesComponent } from './dm-informations-generales/dm-informations-generales.component';
import { DmAntecedentsComponent, AjouterAntecedentComponent } from './dm-antecedents/dm-antecedents.component';
import { DmProfilVaccinalComponent } from './dm-profil-vaccinal/dm-profil-vaccinal.component';
import { DmAccidentTravailComponent} from './dm-accident-travail/dm-accident-travail.component';
import { DmVisiteMedicaleComponent } from './dm-visite-medicale/dm-visite-medicale.component';
import { DmConsultationMedicaleComponent } from './dm-consultation-medicale/dm-consultation-medicale.component';
import { DmArretTravailComponent, AjouterArretTravailComponent } from './dm-arret-travail/dm-arret-travail.component';
import { DmSoinsComponent, AjouterSoinsComponent } from './dm-soins/dm-soins.component';
import { DmExplorationsComponent } from './dm-explorations/dm-explorations.component';
import { DmChangementPosteComponent, AjouterChangementPosteComponent } from './dm-changement-poste/dm-changement-poste.component';
import { RisquesProfessionnelsComponent } from './risques-professionnels/risques-professionnels.component';
import { ParametresCompteComponent } from './parametres-compte/parametres-compte.component';
import { DmEmployeComponent } from './dm-employe/dm-employe.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AjouterConsultationComponent } from './ajouter-consultation/ajouter-consultation.component';
import { AjouterExamenComplementaireComponent } from './ajouter-examen-complementaire/ajouter-examen-complementaire.component';
import { AjouterOrdonnanceComponent } from './ajouter-ordonnance/ajouter-ordonnance.component';
import { AjouterOrientationMedicaleComponent } from './ajouter-orientation-medicale/ajouter-orientation-medicale.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DossierMedicalComponent,
    RendezVousComponent,
    StatistiquesComponent,
    AdministrationComponent,
    VisitesMedicalesComponent,
    ConsultationsMedicalesComponent,
    VaccinationsComponent,
    ArretsTravailComponent,
    SoinsComponent,
    AccidentsTravailComponent,
    DeclarerAccidentTravailComponent, 
    EmployesComponent,
    DmInformationsGeneralesComponent,
    DmAntecedentsComponent,
    AjouterAntecedentComponent,
    DmProfilVaccinalComponent,
    DmAccidentTravailComponent,
    DmVisiteMedicaleComponent,
    DmConsultationMedicaleComponent,
    DmArretTravailComponent,
    AjouterArretTravailComponent,    
    DmSoinsComponent,
    AjouterSoinsComponent,
    DmExplorationsComponent,
    DmChangementPosteComponent,
    AjouterChangementPosteComponent,
    RisquesProfessionnelsComponent,
    ParametresCompteComponent,
    DmEmployeComponent,
    AjouterNvEmployeComponent,
    ConnexionComponent,
    AjouterConsultationComponent,
    AjouterExamenComplementaireComponent,
    AjouterOrdonnanceComponent,
    AjouterOrientationMedicaleComponent,
  ],
  
  imports: [
    BrowserModule,AppRoutingModule,LayoutModule,MatToolbarModule,MatSidenavModule,MatIconModule,
    MatListModule,MatTreeModule,BrowserAnimationsModule,NgbModule,MatBadgeModule,ScrollDispatchModule,
    MatProgressBarModule,MatGridListModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,
    MatSelectModule,MatButtonModule,MatButtonToggleModule,MatTableModule,MatPaginatorModule,MatSortModule,
    MatDialogModule,MatDatepickerModule,MatNativeDateModule,MatAutocompleteModule, MatChipsModule,
    MatSlideToggleModule,MatStepperModule,MatCheckboxModule,MatTabsModule,MatSliderModule,HttpClientModule
  ],
 
  entryComponents: [EmployesComponent, AjouterNvEmployeComponent,
                    DmChangementPosteComponent,AjouterChangementPosteComponent,
                    DmArretTravailComponent,AjouterArretTravailComponent,
                    AccidentsTravailComponent,DeclarerAccidentTravailComponent,
                    DmAntecedentsComponent,AjouterAntecedentComponent,
                    DmSoinsComponent, AjouterSoinsComponent,AjouterConsultationComponent,
                    AjouterExamenComplementaireComponent,AjouterOrdonnanceComponent,AjouterOrientationMedicaleComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlFr},
              {provide: LOCALE_ID, useValue: "fr-CA" } ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
