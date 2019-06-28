import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DossierMedicalComponent } from 'src/app/dossier-medical/dossier-medical.component';
import { VisitesMedicalesComponent } from 'src/app/visites-medicales/visites-medicales.component';
import { ConsultationsMedicalesComponent } from 'src/app/consultations-medicales/consultations-medicales.component';
import { VaccinationsComponent } from 'src/app/vaccinations/vaccinations.component';
import { AccidentsTravailComponent } from 'src/app/accidents-travail/accidents-travail.component';
import { ArretsTravailComponent } from 'src/app/arrets-travail/arrets-travail.component';
import { SoinsComponent } from 'src/app/soins/soins.component';
import { RendezVousComponent } from 'src/app/rendez-vous/rendez-vous.component';
import { StatistiquesComponent } from 'src/app/statistiques/statistiques.component';
import { AdministrationComponent } from 'src/app/administration/administration.component';
import { EmployesComponent } from 'src/app/employes/employes.component';
import { DmInformationsGeneralesComponent } from 'src/app/dm-informations-generales/dm-informations-generales.component';
import { DmAntecedentsComponent } from 'src/app/dm-antecedents/dm-antecedents.component';
import { DmVisiteMedicaleComponent } from 'src/app/dm-visite-medicale/dm-visite-medicale.component';
import { DmConsultationMedicaleComponent } from 'src/app/dm-consultation-medicale/dm-consultation-medicale.component';
import { DmSoinsComponent } from 'src/app/dm-soins/dm-soins.component';
import { DmExplorationsComponent } from 'src/app/dm-explorations/dm-explorations.component';
import { DmProfilVaccinalComponent } from 'src/app/dm-profil-vaccinal/dm-profil-vaccinal.component';
import { DmArretTravailComponent } from 'src/app/dm-arret-travail/dm-arret-travail.component';
import { DmChangementPosteComponent } from 'src/app/dm-changement-poste/dm-changement-poste.component';
import { ParametresCompteComponent } from 'src/app/parametres-compte/parametres-compte.component';
import { RisquesProfessionnelsComponent } from 'src/app/risques-professionnels/risques-professionnels.component';
import { DmEmployeComponent } from 'src/app/dm-employe/dm-employe.component';
import { MainNavComponent } from 'src/app/main-nav/main-nav.component';
import { AjouterConsultationComponent } from 'src/app/ajouter-consultation/ajouter-consultation.component';




const routes: Routes = [
  { path: 'sysmt', component: MainNavComponent, children:[

    { path: 'visites-medicales', component: VisitesMedicalesComponent},
    { path: 'consultations-medicales', component: ConsultationsMedicalesComponent},
    { path: 'vaccinations', component: VaccinationsComponent},
    { path: 'accidents-travail', component: AccidentsTravailComponent},
    { path: 'arrets-travail', component: ArretsTravailComponent},
    { path: 'soins', component: SoinsComponent},
    { path: 'rendez-vous', component: RendezVousComponent},
    { path: 'statistiques', component: StatistiquesComponent},
    { path: 'administration', component: AdministrationComponent},
    { path: 'parametre-compte', component: ParametresCompteComponent},
    { path: 'risques-professionnels', component: RisquesProfessionnelsComponent},

    { path: 'dossier-medical', component: DossierMedicalComponent,children:[
      { path: 'employes', component: EmployesComponent },
      { path: '', redirectTo: 'employes' ,pathMatch: 'full'},
      { path: 'dm-employe/:id', component: DmEmployeComponent,children:[
        { path: 'dm-informations-generales/:id', component: DmInformationsGeneralesComponent },
        { path: 'dm-antecedents/:id', component: DmAntecedentsComponent},
        { path: 'dm-visite-medicale/:id', component: DmVisiteMedicaleComponent},
        { path: 'dm-consultation-medicale/:id', component: DmConsultationMedicaleComponent},
        {path: 'dm-consultation-medicale/:id/ajouter-consultation/:id' , component: AjouterConsultationComponent},
        { path: 'dm-soins/:id', component: DmSoinsComponent},
        { path: 'dm-explorations/:id', component: DmExplorationsComponent},
        { path: 'dm-profil-vaccinal/:id', component: DmProfilVaccinalComponent},
        { path: 'dm-arret-travail/:id', component: DmArretTravailComponent},
        { path: 'dm-changement-poste/:id', component: DmChangementPosteComponent},
      ]}
    ]},
    { path: '', redirectTo: 'dossier-medical' ,pathMatch: 'full'},
  ]}, 
  
  { path: '',
    component: LoginComponent
  },    
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
