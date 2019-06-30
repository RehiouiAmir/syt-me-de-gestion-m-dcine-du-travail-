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

    getAllNatureConsultations() {
      return this.http.get<any[]>(`${environment.baseUrl}/natureConsultations`);
    }

    getAllMedicaments() {
      return this.http.get<any[]>(`${environment.baseUrl}/medicaments`);
    }

    getAllActes() {
      return this.http.get<any[]>(`${environment.baseUrl}/actes`);
    }

  //Service Arret de travail

  getAllArretTravailsByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/arretTravails`);
  }


  //Service changelent de poste

  getAllchangementPostesEmploye(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}//`+id_employe);
  }

  // Réorientation médicale
  getAllReorientationByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/reorientations`);
  }

  // Service Soins 

  getAllSoinsByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/soins`);
  }

  getAllSoinsInfirmierByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/soinsInfirmiers`);
  }
  
}
