import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }
  
  // Services Employe
  
    ajouterSociete(societe) {
      return this.http.post<any[]>(`${environment.baseUrl}/societe`, societe);
    }

    ajouterAppareil(appareil) {
      return this.http.post<any[]>(`${environment.baseUrl}/appareil`, appareil);
    }

    ajouterInterrogatoire(id: number,interrogatoire) {
      return this.http.post<any[]>(`${environment.baseUrl}/appareils/`+id+`/interrogatoire`, interrogatoire);
    }

    affecterRisque(id: number,idR: number,risque) {
      return this.http.put<any[]>(`${environment.baseUrl}/posteTravails/`+id+`/risques/`+idR, risque);
    }

    getInterrogatoiresByAppareilId(id: number) {
      return this.http.get<any>(`${environment.baseUrl}/appareils/`+id+`/interrogatoires`);
    }

    ajouterTypeRisque(typeRisque) {
      return this.http.post<any[]>(`${environment.baseUrl}/typeRisque`, typeRisque);
    }

    ajouterRisque(id: number,typeRisque) {
      return this.http.post<any[]>(`${environment.baseUrl}/typeRisques/`+id+`/risque`, typeRisque);
    }

    ajouterNatureAccident(natureAccident) {
      return this.http.post<any[]>(`${environment.baseUrl}/natureAccident`, natureAccident);
    }

    ajouterNatureConsultation(natureConsultation) {
      return this.http.post<any[]>(`${environment.baseUrl}/natureConsultation`, natureConsultation);
    }

    ajouterMedicament(medicament) {
      return this.http.post<any[]>(`${environment.baseUrl}/medicament`, medicament);
    }

    ajouterMaladie(maladie) {
      return this.http.post<any[]>(`${environment.baseUrl}/maladie`, maladie);
    }

    ajouterSite(id: number,vaccin) {
      return this.http.post<any[]>(`${environment.baseUrl}/societes/`+id+`/siteAffectation`, vaccin);
    }

    ajouterDepartement(id: number,vaccin) {
      return this.http.post<any[]>(`${environment.baseUrl}/siteAffectations/`+id+`/departement`, vaccin);
    }

    ajouterVaccin(vaccin) {
      return this.http.post<any[]>(`${environment.baseUrl}/vaccin`, vaccin);
    }

    ajouterPosteTravail(id: number,posteTravail) {
      return this.http.post<any[]>(`${environment.baseUrl}/departements/`+id+`/posteTravail`, posteTravail);
    }

    getTypeRisques() {
         return this.http.get<any>(`${environment.baseUrl}/typeRisques/`);
    }

    getRisques() {
      return this.http.get<any>(`${environment.baseUrl}/risques/`);
    }

    getRisquesByPosteId(id :number) {
      return this.http.get<any>(`${environment.baseUrl}/posteTravails/`+id+`/risques`);
    }

    getTypeRisqueById(id :number) {
      return this.http.get<any>(`${environment.baseUrl}/typeRisques/`+id);
    }

    getRisquesByTypeRisque(id: number) {
      return this.http.get<any>(`${environment.baseUrl}/typeRisques/`+id+`/risques`);
    }

    getCalendrierVaccinalById(id: number) {
      return this.http.get<any>(`${environment.baseUrl}/calendrierVaccinals/`+id);
    }
  
    convoquerEmploye(id: number,convocation) {
      return this.http.post(`${environment.baseUrl}/employes/`+id+`/convocation`, convocation);
    }

    convoquerEmployeInjection(id: number,convocation) {
      return this.http.post(`${environment.baseUrl}/injections/`+id+`/convocation`, convocation);
    }

    convoquerEmployeVisiteProgrammee(id: number,convocation) {
      return this.http.post(`${environment.baseUrl}/visiteProgrammees/`+id+`/convocation`, convocation);
    }

    genererRapport(value) {
      return this.http.post(`${environment.baseUrl}/generatePDF.htm`,value);
    }

    // utilisateurs

    getAllUtilisateurs() {
      return this.http.get<any>(`${environment.baseUrl}/utilisateurs`);
    }

    ajouterUtilisateur(utilisateur) {
      return this.http.post<any[]>(`${environment.baseUrl}/utilisateur`, utilisateur);
    }

    getRoles(){
      return this.http.get<any>(`${environment.baseUrl}/roles`);      
    }

}
