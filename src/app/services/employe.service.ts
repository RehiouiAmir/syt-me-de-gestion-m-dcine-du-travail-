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

  updateEmploye(id_employe,employe){
    return this.http.put(`${environment.baseUrl}/employes/`+id_employe,employe);    
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

  updateAntecedentAntecedentAutre(id_employe,id_antecedent,antecedents) {
    return this.http.put(`${environment.baseUrl}/employes/`+id_employe+`/antecedents/`+id_antecedent, antecedents);
  }
  updateAntecedentMaladiee(id_maladie,antecedentMaladie) {
    return this.http.put(`${environment.baseUrl}/antecedentMaladies/`+id_maladie, antecedentMaladie);
  }
  updateAntecedentAccidentTravail(id_accident,antecedentAccident) {
    return this.http.put(`${environment.baseUrl}/antecedentAccidents/`+id_accident, antecedentAccident);
  }

  deleteAntecedentAntecedentAutre(id_employe,id_antecedent) {
    return this.http.delete(`${environment.baseUrl}/employes/`+id_employe+`/antecedents/`+id_antecedent);
  }
  deleteAntecedentMaladiee(id_maladie) {
    return this.http.delete(`${environment.baseUrl}/antecedentMaladies/`+id_maladie);
  }
  deleteAntecedentAccidentTravail(id_accident:number) {
    return this.http.delete(`${environment.baseUrl}/antecedentAccidents/`+id_accident);
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

    updateConsultation(id_employe,id_consultation,consultation) {
      return this.http.put(`${environment.baseUrl}/employes/`+id_employe+`/consultations/`+id_consultation, consultation);
    }

    creatActeSoins(id_consultation,id_acte,soin) {
      return this.http.post(`${environment.baseUrl}/consultations/`+id_consultation+`/actes/`+id_acte, soin);
    }

    creatExamenComplementaire(id_consultation,examenComplementaire) {
      return this.http.post(`${environment.baseUrl}/consultations/`+id_consultation+`/examenComplementaire`, examenComplementaire);
    }

    creatOrientationMedicale(id_consultation,orientationMedicale) {
      return this.http.post(`${environment.baseUrl}/consultations/`+id_consultation+`/orientationMedicale`, orientationMedicale);
    }

    

    creatOrdonnance(id_consultation,ordonnance) {
      return this.http.post(`${environment.baseUrl}/consultations/`+id_consultation+`/ordonnance`, ordonnance);
    }

    creatPrescription(id_ordonnance,id_medicament,prescription) {
      return this.http.put(`${environment.baseUrl}/ordonnances/`+id_ordonnance+`/medicaments/`+id_medicament,prescription);
    }

    deleteConsultation(id_consultation) {
      return this.http.delete(`${environment.baseUrl}/consultations/`+id_consultation);
    }

    deleteActeSoin(id_consultation,id_acte) {
      return this.http.delete(`${environment.baseUrl}/consultations/`+id_consultation+`/actes/`+id_acte);
    }
    deleteExamenComplementaire(id_examen) {
      return this.http.delete(`${environment.baseUrl}/examenComplementaires/`+id_examen);
    }
    deleteOrientationMedicales(id_orientation) {
      return this.http.delete(`${environment.baseUrl}/orientationMedicales/`+id_orientation);
    }

    deletePrescriptionOrdonnance(id_ordonnance,id_medicament) {
      return this.http.delete(`${environment.baseUrl}/ordonnances/`+id_ordonnance+`/medicaments/`+id_medicament);
    }

    deleteOrdonnance(id_ordonnance){
      return this.http.delete(`${environment.baseUrl}/ordonnances/`+id_ordonnance);      
    }

    updateExamen(id_examen,examenComplementaire){
      return this.http.put(`${environment.baseUrl}/examenComplementaires/`+id_examen, examenComplementaire);      
    }

    updateOrientation(id_orientation,orientation){
      return this.http.put(`${environment.baseUrl}/orientationMedicales/`+id_orientation, orientation);      
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

  updateArretTrvail(id_employe,id_arretTravail,arretTravail) {
    return this.http.put(`${environment.baseUrl}/employes/`+id_employe+`/arretTravails/`+id_arretTravail,arretTravail);
  }

  deleteArretTrvail(id_employe,id_arretTravail) {
    return this.http.delete(`${environment.baseUrl}/employes/`+id_employe+`/arretTravails/`+id_arretTravail);
  }

  //Service changelent de poste


  getAllRisques() {
    return this.http.get<any[]>(`${environment.baseUrl}/risques`);
  }
   
  getAllRisquesbyPosteId(id_poste: number) {
    return this.http.get<any>(`${environment.baseUrl}/posteTravails/`+id_poste+`/risques`);
  }

  creatChangementPoste(id_employe,id_poste,changementPoste) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/posteTravails/`+id_poste, changementPoste);
  } 

  updateChangementPoste(id_employe_poste,changementPoste) {
    return this.http.put(`${environment.baseUrl}/employePosteTravails/`+id_employe_poste,changementPoste);
  }

  deleteChangementPoste(id_employe,id_poste) {
    return this.http.delete(`${environment.baseUrl}/employes/`+id_employe+`/posteTravails/`+id_poste);
  }
  // Réorientation médicale
  getAllReorientationByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/reorientationProfessionnelles`);
  }

  creatReorientation(id_visite: number,reorientation) {
    return this.http.post(`${environment.baseUrl}/visiteMedicales/`+id_visite+`/reorientationProfessionnelle`,reorientation);
  }
  // Service Soins 

  getAllSoinsByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/soins`);
  }

  getAllSoinsInfirmierByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/soinsInfirmiers`);
  }

  creatSoinsInfirmier(id_employe,id_acte,soinsInfirmier){
    return this.http.put(`${environment.baseUrl}/employes/`+id_employe+`/actes/`+id_acte, soinsInfirmier);
  }

  deleteSoins(id_soins) {
    return this.http.delete(`${environment.baseUrl}/soins/`+id_soins);
  }

  deleteSoinsInfirmier(id_soinsInfirmier) {
    return this.http.delete(`${environment.baseUrl}/soinsInfirmiers/`+id_soinsInfirmier);
  }

  updateSoins(id_soins,soins){
      return this.http.put(`${environment.baseUrl}/soins/`+id_soins, soins);
  }



  // Service vaccination

  getAllVaccinByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/calendrierVaccinals`);
  }

  getVaccinById(id_vaccin){
    return this.http.get<any>(`${environment.baseUrl}/vaccins/`+id_vaccin);    
  }

  getAllInjectionByCalendrierVaccinalId(id: number) {
    return this.http.get<any>(`${environment.baseUrl}/calendrierVaccinals/`+id+`/injections`);
  }

  getAllInjections() {
    return this.http.get<any>(`${environment.baseUrl}/injections`);
  }

  ajouterCalendrierVaccinal(id_employe,id_vaccin,calendrier) {
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/vaccins/`+id_vaccin, calendrier);
  }

  ajouterInjection(id,calendrier) {
    return this.http.post(`${environment.baseUrl}/calendrierVaccinals/`+id+`/injection`, calendrier);
  }

  updateCalendrierVaccinal(id_calendrier,calendrier){
    return this.http.put(`${environment.baseUrl}/calendrierVaccinals/`+id_calendrier, calendrier);
  }

  
  //explorations 
  getAllExamenComplementaires(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/examenComplementaires`);
  }

  getAllOrientationMedicales(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/orientationMedicales`);
  // Visite programmee
  }

  getAllVisiteProgrammees() {
    return this.http.get<any>(`${environment.baseUrl}/visiteProgrammees`);
  }

  getAllVisiteMedicalesByEmployeId(id_employe) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/visiteMedicales`);
  }

  creatVisite(id_employe,visite){
    return this.http.post(`${environment.baseUrl}/employes/`+id_employe+`/visiteMedicale`, visite);    
  }

  creatReponse(id_visite,id_interrogatoire,reponse){
    return this.http.post(`${environment.baseUrl}/visiteMedicales/`+id_visite+`/interrogatoires/`+id_interrogatoire, reponse);    
  }


  getVisiteByVisiteId(id_visite) {
    return this.http.get<any>(`${environment.baseUrl}/visiteMedicales/`+id_visite);
  }

  updateVisite(id_visite,visite){
    return this.http.put(`${environment.baseUrl}/visiteMedicales/`+id_visite,visite);    
  }

  deleteVisite(id_visite){
    return this.http.delete(`${environment.baseUrl}/visiteMedicales/`+id_visite);    
  }
  creatExamenBiometrique(id_visite,examenBiometrique){
    return this.http.post(`${environment.baseUrl}/visiteMedicales/`+id_visite+`/examenBiometrique`, examenBiometrique);        
  }

  creatExplorationFoctionnelle(id_visite,explorationFonctionnelle){
    return this.http.post(`${environment.baseUrl}/visiteMedicales/`+id_visite+`/explorationFonctionnelle`, explorationFonctionnelle);        
  }
  creatExamenComplementaireVisite(id_visite,examenComplementaire) {
    return this.http.post(`${environment.baseUrl}/visiteMedicales/`+id_visite+`/examenComplementaire`, examenComplementaire);
  }

  creatOrientationMedicaleVisite(id_visite,orientationMedicale) {
    return this.http.post(`${environment.baseUrl}/visiteMedicales/`+id_visite+`/orientationMedicale`, orientationMedicale);
  }


  //calendrier médicale
  
  deleteCalendrierVaccinal(id_calendrierVaccinals) {
    return this.http.delete(`${environment.baseUrl}/calendrierVaccinals/`+id_calendrierVaccinals);
  }
  deleteInjection(id_injection) {
    return this.http.delete(`${environment.baseUrl}/injections/`+id_injection);
  }
  // Convocation

  getAllConvocationsByEmployeId(id_employe: number) {
    return this.http.get<any>(`${environment.baseUrl}/employes/`+id_employe+`/convocations`);
  }

  deleteConvocation(id_convocation) {
    return this.http.delete(`${environment.baseUrl}/convocations/`+id_convocation);
  }

  //Acte de soins
}
