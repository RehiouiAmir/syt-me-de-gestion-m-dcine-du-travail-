import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

// Services Employe

  getAllEmployes() {
    return this.http.get<any[]>(`${environment.baseUrl}/employes`);
  }

  getEmployeById(id: number) {
      return this.http.get<any>(`${environment.baseUrl}/employes/`+id);
  }

  createEmploye(employe) {
    return this.http.post(`${environment.baseUrl}/employe`, employe);
  }

  // Service Poste de travail
  
  getAllPosteTravails() {
    return this.http.get<any[]>(`${environment.baseUrl}/posteTravails`);
  }

  getAllDepartements() {
    return this.http.get<any[]>(`${environment.baseUrl}/departements`);
  }

  getAllSocietes() {
    return this.http.get<any[]>(`${environment.baseUrl}/societes`);
  }

  getAllSites() {
    return this.http.get<any[]>(`${environment.baseUrl}/siteAffectations`);
  }

  getSitesBySocieteId(id : number) {
    return this.http.get<any[]>(`${environment.baseUrl}/societes/`+id+`/siteAffectations`);
  }

  getSitesByDepartementId(id : number) {
    return this.http.get<any[]>(`${environment.baseUrl}/siteAffectations/`+id+`/departements`);
  }

  // Service Antécédents

  
  getAllAntecedentsByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/antecedents`);
  }

  getAllAntecedentsAccidentsTravailByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/antecedentAccidents`);
  }

  getAllAntecedentsMaladiesByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/antecedentMaladies`);
  }

  creatAntecedentAutre(id_employe,antecedents) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/antecedent`, antecedents);
  }

  creatAntecedentMaladie(id_employe,id_maladie,antecedentMaladie) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/maladies/`+id_maladie+`/antecedentMaladie`, antecedentMaladie);
  }

  creatAntecedentAccidentTravail(id_employe,id_accident,antecedentAccident) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/accidents/`+id_accident+`/antecedentAccident`, antecedentAccident);
  }


  // Service Consultation medicales

    getAllConsultationsByEmployeId(id_employe: number) {
      return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/consultations`);
    }

    getConsultationByConsultationId(id_consultation: number) {
      return this.http.get<any>(`${environment.baseUrl}/consultations/`+id_consultation);
    }

    getAllNatureConsultations() {
      return this.http.get<any[]>(`${environment.baseUrl}/natureConsultations`);
    }

    getAllMedicaments() {
      return this.http.get<any[]>(`${environment.baseUrl}/medicaments`);
    }

    getAllActes() {
      return this.http.get<any[]>(`${environment.baseUrl}/actes`);
    }

    creatConsultation(id_employe,consultation) {
      return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/consultation`, consultation);
    }

    creatActeSoins(id_consultation,id_acte,soin) {
      return this.http.put(`${environment.baseUrl}/consultations/`+id_consultation+`/actes/`+id_acte, soin);
    }

    creatExamenComplementaire(id_consultation,examenComplementaire) {
      return this.http.post(`${environment.baseUrl}/consultations/`+id_consultation+`/examenComplementaire`, examenComplementaire);
    }

  //Service Arret de travail

  getAllArretTravailsByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/arretTravails`);
  }

  creatArretTrvail(id_employe,arretTravail) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/arretTravail`, arretTravail);
  }

  creatArretTravailMaladie(id_employe,id_maladie,arretTravail) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/arretTravail/maladies/`+id_maladie, arretTravail);
  }

  creatArretTravailAccidentTravail(id_employe,id_accident,arretTravail) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/arretTravail/accidents/`+id_accident, arretTravail);
  }

  //Service changelent de poste

  getAllchangementPostesEmploye(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}//`+id_employe);
  }

  // Réorientation médicale
  getAllReorientationByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/reorientationProfessionnelles`);
  }

  // Service Soins 

  getAllSoinsByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/soins`);
  }

  getAllSoinsInfirmierByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/soinsInfirmiers`);
  }

  // Service vaccination

  getAllVaccinByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/calendrierVaccinals`);
  }

  ajouterCalendrierVaccinal(id_employe,id_vaccin,calendrier) {
    return this.http.put(`${environment.baseUrl}/employes/`+id_employe+`/vaccins/`+id_vaccin, calendrier);
  }
  
}
