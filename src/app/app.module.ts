import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
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
         MatCheckboxModule,MatTabsModule,MatSliderModule, MatSnackBarModule} from '@angular/material';
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
import { RendezVousComponent, ConvoquerEmployeComponent } from './rendez-vous/rendez-vous.component';
import { StatistiquesComponent, GenererRapportComponent } from './statistiques/statistiques.component';
import { AdministrationComponent } from './administration/administration.component';
import { VisitesMedicalesComponent } from './visites-medicales/visites-medicales.component';
import { ConsultationsMedicalesComponent } from './consultations-medicales/consultations-medicales.component';
import { VaccinationsComponent } from './vaccinations/vaccinations.component';
import { AccidentsTravailComponent, DeclarerAccidentTravailComponent, DetailsAccidentTravailComponent } from './accidents-travail/accidents-travail.component';
import { ArretsTravailComponent } from './arrets-travail/arrets-travail.component';
import { SoinsComponent } from './soins/soins.component';
import { EmployesComponent, AjouterNvEmployeComponent } from './employes/employes.component';
import { DmInformationsGeneralesComponent } from './dm-informations-generales/dm-informations-generales.component';
import { DmAntecedentsComponent, AjouterAntecedentComponent } from './dm-antecedents/dm-antecedents.component';
import { DmProfilVaccinalComponent, AjouterProfileVaccinalComponent, AjouterInjectionVaccinalComponent, AjouterInjectionComponent } from './dm-profil-vaccinal/dm-profil-vaccinal.component';
import { DmVisiteMedicaleComponent } from './dm-visite-medicale/dm-visite-medicale.component';
import { DmConsultationMedicaleComponent, ModifierConsultationComponent } from './dm-consultation-medicale/dm-consultation-medicale.component';
import { DmArretTravailComponent, AjouterArretTravailComponent, DetailsArretTravailComponent } from './dm-arret-travail/dm-arret-travail.component';
import { DmSoinsComponent, AjouterSoinsComponent, AjouterSoinsInfirmierComponent } from './dm-soins/dm-soins.component';
import { DmExplorationsComponent } from './dm-explorations/dm-explorations.component';
import { DmChangementPosteComponent, AjouterChangementPosteComponent, DetailsChangementPosteComponent } from './dm-changement-poste/dm-changement-poste.component';
import { RisquesProfessionnelsComponent, AjouterTypeRisqueComponent, RisquesTypeRisqueComponent, AjouterRisqueComponent, RisquesPosteComponent, AffecterRisqueComponent } from './risques-professionnels/risques-professionnels.component';
import { ParametresCompteComponent } from './parametres-compte/parametres-compte.component';
import { DmEmployeComponent } from './dm-employe/dm-employe.component';
import { AjouterConsultationComponent } from './ajouter-consultation/ajouter-consultation.component';
import { LoginComponent } from './login/login.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AjouterExamenComplementaireComponent } from './ajouter-examen-complementaire/ajouter-examen-complementaire.component';
import { AjouterOrdonnanceComponent } from './ajouter-ordonnance/ajouter-ordonnance.component';
import { AjouterOrientationMedicaleComponent } from './ajouter-orientation-medicale/ajouter-orientation-medicale.component';
import { AdminSocieteComponent, AjouterSocieteComponent } from './admin/admin-societe/admin-societe.component';
import { AdminSiteComponent, AjouterSiteComponent } from './admin/admin-site/admin-site.component';
import { AdminDepartementComponent, AjouterDepartementComponent } from './admin/admin-departement/admin-departement.component';
import { AdminPosteTravailComponent, AjouterPosteTravailComponent } from './admin/admin-poste-travail/admin-poste-travail.component';
import { AdminNatureConsultationComponent, AjouterNatureConsultationComponent } from './admin/admin-nature-consultation/admin-nature-consultation.component';
import { AdminAppareilComponent, AjouterAppareilComponent, InterrogatoiresComponent, AjouterInterrogatoireComponent } from './admin/admin-appareil/admin-appareil.component';
import { AdminMaladieComponent, AjouterMaladieComponent } from './admin/admin-maladie/admin-maladie.component';
import { AdminMedicamentComponent, AjouterMedicamentComponent } from './admin/admin-medicament/admin-medicament.component';
import { AdminVaccinComponent, AjouterVaccinComponent } from './admin/admin-vaccin/admin-vaccin.component';
import { AdminNatureAccidentComponent, AjouterNatureAccidentComponent } from './admin/admin-nature-accident/admin-nature-accident.component';
import { DmConvocationComponent } from './dm-convocation/dm-convocation.component';
import { UtilisateursComponent, AjouterUtilisateurComponent } from './utilisateurs/utilisateurs.component';
import { RegisterComponent } from './register/register.component';
import { AdminActeComponent, AjouterActeComponent } from './admin/admin-acte/admin-acte.component';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { AjouterVisiteMedicaleComponent } from './ajouter-visite-medicale/ajouter-visite-medicale.component';
import { AjouterReorientationProfessionnelleComponent } from './ajouter-reorientation-professionnelle/ajouter-reorientation-professionnelle.component';
import { AjouterReponseComponent } from './ajouter-reponse/ajouter-reponse.component';

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
    AjouterProfileVaccinalComponent,
    AjouterInjectionVaccinalComponent,
    AjouterInjectionComponent,
    DmVisiteMedicaleComponent,
    DmConsultationMedicaleComponent,
    ModifierConsultationComponent,
    DmArretTravailComponent,
    AjouterArretTravailComponent,   
    DetailsArretTravailComponent, 
    DmSoinsComponent,
    AjouterSoinsComponent,
    AjouterSoinsInfirmierComponent,
    DmExplorationsComponent,
    DmChangementPosteComponent,
    AjouterChangementPosteComponent,
    RisquesProfessionnelsComponent,
    ParametresCompteComponent,
    DmEmployeComponent,
    AjouterNvEmployeComponent,
    AjouterConsultationComponent,
    LoginComponent,
    AjouterExamenComplementaireComponent,
    AjouterOrdonnanceComponent,
    AjouterOrientationMedicaleComponent,
    AdminSocieteComponent,
    AjouterSocieteComponent,
    AdminSiteComponent,
    AjouterSiteComponent,
    AdminDepartementComponent,
    AjouterDepartementComponent,
    AdminPosteTravailComponent,
    AjouterPosteTravailComponent,
    AdminNatureConsultationComponent,
    AjouterNatureConsultationComponent,
    AdminAppareilComponent,
    AjouterAppareilComponent,
    AdminMaladieComponent,
    AjouterMaladieComponent,
    AdminMedicamentComponent,
    AjouterMedicamentComponent,
    AdminVaccinComponent,
    AjouterVaccinComponent,
    AdminNatureAccidentComponent,
    AjouterNatureAccidentComponent,
    AjouterTypeRisqueComponent,
    RisquesTypeRisqueComponent,
    AffecterRisqueComponent,
    RisquesPosteComponent,
    ConvoquerEmployeComponent,
    AjouterRisqueComponent,
    DmConvocationComponent,
    InterrogatoiresComponent,
    AjouterInterrogatoireComponent,
    DetailsUploadComponent,
    FormUploadComponent,
    GenererRapportComponent,
    ListUploadComponent,
    UtilisateursComponent,
    AjouterUtilisateurComponent,
    RegisterComponent,
    AdminActeComponent,
    AjouterActeComponent,
    DetailsChangementPosteComponent,
    DetailsAccidentTravailComponent,
    AjouterVisiteMedicaleComponent,
    AjouterReorientationProfessionnelleComponent,
    AjouterReponseComponent
  ],
  
  imports: [
    BrowserModule,AppRoutingModule,LayoutModule,MatToolbarModule,MatSidenavModule,MatIconModule,DialogsModule,
    MatListModule,MatTreeModule,BrowserAnimationsModule,NgbModule,MatBadgeModule,ScrollDispatchModule,
    MatProgressBarModule,MatGridListModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,
    MatSelectModule,MatButtonModule,MatButtonToggleModule,MatTableModule,MatPaginatorModule,MatSortModule,
    MatDialogModule,MatDatepickerModule,MatNativeDateModule,MatAutocompleteModule, MatChipsModule,
    MatSlideToggleModule,MatStepperModule,MatCheckboxModule,MatTabsModule,MatSliderModule,HttpClientModule,
    MatSnackBarModule
  ],
 
  entryComponents: [EmployesComponent, AjouterNvEmployeComponent,
                    DmChangementPosteComponent,AjouterChangementPosteComponent,
                    DmArretTravailComponent,AjouterArretTravailComponent,DetailsArretTravailComponent, 
                    AccidentsTravailComponent,DeclarerAccidentTravailComponent,
                    DmAntecedentsComponent,AjouterAntecedentComponent,AjouterSoinsInfirmierComponent,
                    DmSoinsComponent, AjouterSoinsComponent, DmProfilVaccinalComponent,
                    AjouterProfileVaccinalComponent,AjouterInjectionVaccinalComponent,AjouterInjectionComponent,AjouterConsultationComponent,
                    AjouterExamenComplementaireComponent,AjouterOrdonnanceComponent,AjouterOrientationMedicaleComponent,
                    AdminSocieteComponent,AjouterSocieteComponent,AdminSiteComponent, AjouterSiteComponent,
                    AdminDepartementComponent,AjouterDepartementComponent,AdminPosteTravailComponent,AjouterPosteTravailComponent,
                    AdminNatureConsultationComponent,AjouterNatureConsultationComponent,AdminAppareilComponent,
                    AjouterAppareilComponent,AdminMaladieComponent,AjouterMaladieComponent,AdminMedicamentComponent,
                    AjouterMedicamentComponent,AdminVaccinComponent,AjouterVaccinComponent,AdminNatureAccidentComponent,
                    AjouterNatureAccidentComponent,AjouterTypeRisqueComponent,RisquesTypeRisqueComponent,AffecterRisqueComponent,RisquesPosteComponent,
                    AjouterRisqueComponent,RegisterComponent,DmConsultationMedicaleComponent,ModifierConsultationComponent,
                    ConvoquerEmployeComponent,AjouterReorientationProfessionnelleComponent,AjouterReponseComponent,InterrogatoiresComponent,AjouterInterrogatoireComponent,DetailsAccidentTravailComponent,DetailsChangementPosteComponent,GenererRapportComponent,AjouterUtilisateurComponent,AjouterActeComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlFr},
              {provide: LOCALE_ID, useValue: "fr-CA" }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
